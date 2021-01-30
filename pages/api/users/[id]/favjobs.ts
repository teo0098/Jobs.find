import { NextApiRequest, NextApiResponse } from 'next'
import { verify, sign } from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../../../utils/mongodb'
import VerifyToken from '../../../../utils/interfaces/token'
import generateCookies from '../../../../utils/middlewares/generateCookies'
import { Job } from '../../../../types/Job'

const favJobs = async (req : NextApiRequest, res : NextApiResponse) => {
    const { query, body, method, cookies } = req

    switch (method) {
        case 'POST': {
            try {
                const decodedToken = verify(cookies['accessToken'], `${process.env.ACCESS_TOKEN_SECRET}`)
                if ((decodedToken as VerifyToken).user !== query.id) return res.status(403).json('Wrong credentials')
                const _id : ObjectID = new ObjectID((decodedToken as VerifyToken).user)
                const { db } = await connectToDatabase()
                const collection = db.collection('users')
                const userNumbers : number = await collection.countDocuments({ _id })
                if (userNumbers === 0) return res.status(403).json('Wrong credentials')
                const user = await collection.findOne({ _id })
                if (user.accessToken !== cookies['accessToken']) return res.status(403).json("Wrong credentials")
                const jobExists = user.favJobs.find((j : Job) => j.id === body.id)
                if (jobExists !== undefined) return res.status(409).json('Job already exists')
                const favJobs : Array<Job> = [...user.favJobs, body]
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id }, { $set: { favJobs, accessToken } })
                if (result.modifiedCount !== 1) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(201).json(body)
            }
            catch {
                res.status(500).json('Server crashed')
            }
        }
        break
        case 'DELETE': {
            res.status(200).json('Job deleted successfully')
        }
        break
        default: {
            res.setHeader('Allow', ['POST', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    }
}

export default favJobs