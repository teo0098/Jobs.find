import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { verify } from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/mongodb'
import VerifyToken from '../../utils/interfaces/token'

const login = async (req : NextApiRequest, res : NextApiResponse) => {
    const { accessToken } = req.cookies
    try {
        const { db } = await connectToDatabase()
        const collection = db.collection('users')
        const decodedToken = verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`)
        const _id : ObjectID = new ObjectID((decodedToken as VerifyToken).user)
        const userNumbers : number = await collection.countDocuments({ _id })
        if (userNumbers === 0) return res.status(403).json(decodedToken)
        const result = await collection.updateOne({ _id }, { $set: { accessToken: '' } })
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
            })
        ])
        res.status(200).json('Logged out successfully')
    }
    catch {
        res.status(500).json('Server crashed')
    }  
}
  
export default login