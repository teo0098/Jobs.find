import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { ObjectID } from 'mongodb'

import generateCookies from '../../../../utils/middlewares/generateCookies'
import { Job } from '../../../../types/Job'
import getUserID from '../../../../utils/middlewares/getUserID'
import findUser from '../../../../utils/middlewares/findUser'
import getCollection from '../../../../utils/middlewares/getCollection'
import RegisterActions from '../../../../useReducers/registerReducer/actionTypes'
import InfoTypes from '../../../../utils/info/InfoTypes'

const favJobs = async (req : NextApiRequest, res : NextApiResponse) => {
    const { query, body, method, cookies } = req

    switch (method) {
        case 'POST': {
            try {
                const _id : number | ObjectID = getUserID(query, cookies['accessToken'])
                if (_id === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const collection = await getCollection()
                let user : any = await findUser(collection, (_id as ObjectID), cookies['accessToken'])
                if (user === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const jobExists = user.favJobs.find((j : Job) => j.id === body.id)
                if (jobExists !== undefined) return res.status(409).json(RegisterActions.JOB_EXISTS)
                const favJobs : Array<Job> = [...user.favJobs, body]
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id }, { $set: { favJobs, accessToken } })
                if (result.modifiedCount !== 1) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(201).json('Job added successfully')
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        case 'DELETE': {
            try {
                const _id : number | ObjectID = getUserID(query, cookies['accessToken'])
                if (_id === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const collection = await getCollection()
                let user : any = await findUser(collection, (_id as ObjectID), cookies['accessToken'])
                if (user === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const favJobs : Array<Job> = (user.favJobs as Array<Job>).filter(j => j.id !== query.job)
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id }, { $set: { favJobs, accessToken } })
                if (result.modifiedCount !== 1) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(200).json('Job deleted successfully')
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
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