import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectID } from 'mongodb'

import { Job } from '../../../../types/Job'
import RegisterActions from '../../../../useReducers/registerReducer/actionTypes'
import InfoTypes from '../../../../utils/info/InfoTypes'
import authUser from '../../../../utils/middlewares/authUser'
import updateUser from '../../../../utils/middlewares/updateUser'
import parseAuthHeader from '../../../../utils/middlewares/parseAuthHeader'

const favJobs = async (req : NextApiRequest, res : NextApiResponse) => {
    const { query, body, method, cookies } = req

    res.setHeader('Content-Type', 'application/json');

    switch (method) {
        case 'GET': {
            try {
                const user = await authUser(cookies, { favJobs: 1 }, parseAuthHeader(req), `${process.env.ACCESS_TOKEN_SECRET}`, query)
                if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                res.status(200).json(user.favJobs)
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        case 'POST': {
            try {
                const user : any = await authUser(cookies, { _id: 1, favJobs: 1 }, parseAuthHeader(req), `${process.env.ACCESS_TOKEN_SECRET}`, query)
                if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const jobExists = user.favJobs.find((j : Job) => j.id === body.id)
                if (jobExists !== undefined) return res.status(409).json(RegisterActions.JOB_EXISTS)
                const favJobs : Array<Job> = [...user.favJobs, body]
                const updateResult = await updateUser(new ObjectID(user._id), { favJobs })
                if (!updateResult) throw new Error()
                res.status(201).json('Job added successfully')
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        case 'DELETE': {
            try {
                const user : any = await authUser(cookies, { _id: 1, favJobs: 1 }, parseAuthHeader(req), `${process.env.ACCESS_TOKEN_SECRET}`, query)
                if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const favJobs : Array<Job> = (user.favJobs as Array<Job>).filter(j => j.id !== query.job)
                const updateResult = await updateUser(new ObjectID(user._id), { favJobs })
                if (!updateResult) throw new Error()
                res.status(200).json('Job deleted successfully')
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        default: {
            res.setHeader('Allow', ['POST', 'DELETE', 'GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    }
}

export default favJobs