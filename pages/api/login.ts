import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import generateCookies from '../../utils/middlewares/generateCookies'
import InfoTypes from '../../utils/info/InfoTypes'
import getCollection from '../../utils/middlewares/getCollection'

type PassedBody = {email : string, password : string}

const login = async (req : NextApiRequest, res : NextApiResponse) => {
    const { method, body } = req

    res.setHeader('Content-Type', 'application/json');
    
    if (method === 'POST') {
        try {
            const { email, password } : PassedBody = body
            if (!email || !validator.isEmail(email)) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            if (!/^[A-Za-z0-9!@#$_-]{8,30}$/.test(password)) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            const collection = await getCollection()
            const userNumbers : number = await collection.countDocuments({ email })
            if (userNumbers === 0) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            const user = await collection.findOne({ email })
            const match = await compare(password, user.password)
            if (!match) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '10m' })
            const refreshToken = sign({ user: user._id }, `${process.env.REFRESH_TOKEN_SECRET}`)
            const result = await collection.updateOne({ email }, { $set: { refreshTokens: [...user.refreshTokens, refreshToken] } })
            if (result.modifiedCount !== 1) throw new Error()
            generateCookies(res, user.name, user._id, accessToken, refreshToken)
            res.status(200).end()
        }
        catch {
            res.status(500).json(InfoTypes.SERVER_CRASH)
        }
    }  
    else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}
  
export default login