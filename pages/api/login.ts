import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import validator from 'validator'
import { compare } from 'bcryptjs'

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
        res.status(200).json('Logged user in')
    }
    catch {
        res.status(500).json('Server crashed')
    }  
}
  
export default login