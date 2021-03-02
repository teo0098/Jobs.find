import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcryptjs'
import { serialize } from 'cookie'
import { ObjectID } from 'mongodb'

import getCollection from '../../../../utils/middlewares/getCollection'
import generateCookies from '../../../../utils/middlewares/generateCookies'
import validateData from '../../../../utils/middlewares/validateData'
import validatePassword from '../../../../utils/middlewares/validatePassword'
import InfoTypes from '../../../../utils/info/InfoTypes'
import RegisterActions from '../../../../useReducers/registerReducer/actionTypes'
import authUser from '../../../../utils/middlewares/authUser'
import updateUser from '../../../../utils/middlewares/updateUser'

type PassedBody = {name : string, surname : string, email : string}
type PassedBodyPassword = {password : string, rpassword : string}

const login = async (req : NextApiRequest, res : NextApiResponse) => {
    const { query, body, method, cookies } = req

    switch (method) {
        case 'GET': {
            try {
                const user : any = await authUser(cookies, { password: 0, favJobs: 0 })
                if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const updateResult = await updateUser(new ObjectID(user._id), { accessToken })
                if (!updateResult) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(200).json(user)
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        case 'PUT': {
            try {
                const { name, surname, email } : PassedBody = body
                if (!validateData(name, surname, email)) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const user : any = await authUser(cookies, { _id: 1, name: 1, accessToken: 1 }, query)
                if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const collection = await getCollection()
                const user2 = await collection.findOne({
                    '$and': [
                        {
                            'email': email
                        },
                        {
                            '_id': { '$ne': new ObjectID(user._id) }
                        }
                    ]
                })
                if (user2 != null) return res.status(409).json(RegisterActions.EMAIL_EXISTS)
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id: new ObjectID(user._id) }, { $set: 
                    { 
                        name: name.trim().toLowerCase(), 
                        surname: surname.trim().toLowerCase(), 
                        email: email.trim(), 
                        accessToken } 
                    })
                if (result.modifiedCount !== 1) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(200).json('Data edited successfully')
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        case 'PATCH': {
            try {
                const { password, rpassword } : PassedBodyPassword = body
                if (!validatePassword(password, rpassword)) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const user : any = await authUser(cookies, { _id: 1, name: 1, accessToken: 1 }, query)
                if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const hashedPassword = await hash(password, 10)
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const updateResult = await updateUser(new ObjectID(user._id), { password: hashedPassword, accessToken })
                if (!updateResult) throw new Error()
                generateCookies(res, user.name, user._id, accessToken)
                res.status(200).json('Password edited successfully')
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        case 'DELETE': {
            try {
                const user : any = await authUser(cookies, { _id: 1, accessToken: 1 }, query)
                if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const collection = await getCollection()
                const result = await collection.deleteOne({ _id: new ObjectID(user._id) })
                if (result.deletedCount !== 1) throw new Error()
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
                    serialize('accountDeleted', 'yes', {
                        path: '/',
                        sameSite: 'strict',
                        maxAge: 5
                    })
                ])
                res.status(200).json('Account deleted successfully')
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        default: {
            res.setHeader('Allow', ['PUT', 'PATCH', 'DELETE', 'GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    }
}
  
export default login