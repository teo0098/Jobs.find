import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { connectToDatabase } from '../../utils/mongodb'
import generateCookies from '../../utils/middlewares/generateCookies'

type PassedBody = {email : string, password : string}

const login = async (req : NextApiRequest, res : NextApiResponse) => {
    const { email, password } : PassedBody = req.body
    try {
        if (!email || !validator.isEmail(email)) throw new Error()
        if (!/^[A-Za-z0-9!@#$_-]{8,30}$/.test(password)) throw new Error()
        const { db } = await connectToDatabase()
        const collection = db.collection('users')
        const userNumbers = await collection.countDocuments({ email })
        if (userNumbers === 0) return res.status(403).json('Wrong credentials')
        const user = await collection.findOne({ email })
        const match = await compare(password, user.password)
        if (!match) return res.status(403).json('Wrong credentials')
        const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '5m' })
        const refreshToken = sign({ user: user._id }, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '1d' })
        const result = await collection.updateOne({ email }, { $set: { accessToken, refreshToken } })
        if (result.modifiedCount !== 1) throw new Error()
        generateCookies(res, user.name, user._id, accessToken, refreshToken)
        res.status(200).end()
    }
    catch {
        res.status(500).json('Server crashed')
    }  
}
  
export default login