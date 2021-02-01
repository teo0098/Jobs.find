import { NextApiRequest, NextApiResponse } from 'next'
import { verify, sign } from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../../../utils/mongodb'
import VerifyToken from '../../../../utils/interfaces/token'
import generateCookies from '../../../../utils/middlewares/generateCookies'
import { Job } from '../../../../types/Job'

const getUserID = (query : {[key: string]: string | string[]}, accessToken : string) => {
    const decodedToken = verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`)
    if ((decodedToken as VerifyToken).user !== query.id) return 403
    const _id : ObjectID = new ObjectID((decodedToken as VerifyToken).user)
    return _id
}

const findUser = async (collection : any, _id : ObjectID, accessToken : string) => {
    const userNumbers : number = await collection.countDocuments({ _id })
    if (userNumbers === 0) return 403
    const user = await collection.findOne({ _id })
    if (user.accessToken !== accessToken) return 403
    return user
}

const getCollection = async () => {
    const { db } = await connectToDatabase()
    const collection = db.collection('users')
    return collection
}

const favJobs = async (req : NextApiRequest, res : NextApiResponse) => {
    const { query, body, method, cookies } = req

    switch (method) {
        case 'POST': {
            try {
                const _id : number | ObjectID = getUserID(query, cookies['accessToken'])
                if (_id === 403) res.status(403).json('Wrong credentials')
                const collection = await getCollection()
                let user : any = await findUser(collection, (_id as ObjectID), cookies['accessToken'])
                if (user === 403) res.status(403).json('Wrong credentials')
                const jobExists = user.favJobs.find((j : Job) => j.id === body.id)
                if (jobExists !== undefined) return res.status(409).json('Job already exists')
                const favJobs : Array<Job> = [...user.favJobs, body]
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id }, { $set: { favJobs, accessToken } })
                if (result.modifiedCount !== 1) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(201).json('Job added successfully')
            }
            catch {
                res.status(500).json('Server crashed')
            }
        }
        break
        case 'DELETE': {
            try {
                const _id : number | ObjectID = getUserID(query, cookies['accessToken'])
                if (_id === 403) res.status(403).json('Wrong credentials')
                const collection = await getCollection()
                let user : any = await findUser(collection, (_id as ObjectID), cookies['accessToken'])
                if (user === 403) res.status(403).json('Wrong credentials')
                const favJobs : Array<Job> = (user.favJobs as Array<Job>).filter(j => j.id !== query.job)
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id }, { $set: { favJobs, accessToken } })
                if (result.modifiedCount !== 1) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(200).json('Job deleted successfully')
            }
            catch {
                res.status(500).json('Server crashed')
            }
        }
        break
        default: {
            res.setHeader('Allow', ['POST', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    }
}

export default favJobs