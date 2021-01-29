import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { verify, VerifyOptions } from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/mongodb'

interface VerifyToken extends VerifyOptions {
    user : string;
}

const login = async (req : NextApiRequest, res : NextApiResponse) => {
    const { refreshToken } = req.cookies
    try {
        const { db } = await connectToDatabase()
        const collection = db.collection('users')
        const decodedToken = verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`)
        const _id = ObjectID((decodedToken as VerifyToken).user)
        const userNumbers = await collection.countDocuments({ _id })
        if (userNumbers === 0) return res.status(403).json(decodedToken)
        const result = await collection.updateOne({ _id }, { $set: { accessToken: '', refreshToken: '' } })
        if (result.modifiedCount !== 1) throw new Error()
        res.setHeader('Set-Cookie', [
            serialize('name', '', {
                path: '/',
                sameSite: 'strict',
                maxAge: 0
            }),
            serialize('_id', '', {
                path: '/',
                sameSite: 'strict',
                maxAge: 0
            }),
            serialize('accessToken', '', {
                path: '/',
                sameSite: 'strict',
                maxAge: 0
            }),
            serialize('refreshToken', '', {
                path: '/',
                sameSite: 'strict',
                maxAge: 0
            })
        ])
        res.status(200).json('Logged out successfully')
    }
    catch {
        res.status(500).json('Server crashed')
    }  
}
  
export default login