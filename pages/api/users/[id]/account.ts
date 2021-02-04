import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { ObjectID } from 'mongodb'
import { hash } from 'bcryptjs'

import getUserID from '../../../../utils/middlewares/getUserID'
import getCollection from '../../../../utils/middlewares/getCollection'
import findUser from '../../../../utils/middlewares/findUser'
import generateCookies from '../../../../utils/middlewares/generateCookies'
import validateData from '../../../../utils/middlewares/validateData'
import validatePassword from '../../../../utils/middlewares/validatePassword'
import InfoTypes from '../../../../utils/info/InfoTypes'
import RegisterActions from '../../../../useReducers/registerReducer/actionTypes'

type PassedBody = {name : string, surname : string, email : string}
type PassedBodyPassword = {password : string, rpassword : string}

const login = async (req : NextApiRequest, res : NextApiResponse) => {
    const { query, body, method, cookies } = req

    switch (method) {
        case 'PUT': {
            try {
                const { name, surname, email } : PassedBody = body
                if (!validateData(name, surname, email)) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const _id : number | ObjectID = getUserID(query, cookies['accessToken'])
                if (_id === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const collection = await getCollection()
                let user : any = await findUser(collection, (_id as ObjectID), cookies['accessToken'])
                if (user === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const user2 = await collection.findOne({
                    '$and': [
                        {
                            'email': email
                        },
                        {
                            '_id': { '$ne': _id }
                        }
                    ]
                })
                if (user2 != null) return res.status(409).json(RegisterActions.EMAIL_EXISTS)
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id: user._id }, { $set: { name, surname, email, accessToken } })
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
                const _id : number | ObjectID = getUserID(query, cookies['accessToken'])
                if (_id === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const collection = await getCollection()
                let user : any = await findUser(collection, (_id as ObjectID), cookies['accessToken'])
                if (user === 403) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
                const hashedPassword = await hash(password, 10)
                const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
                const result = await collection.updateOne({ _id }, { $set: { password: hashedPassword, accessToken } })
                if (result.modifiedCount !== 1) throw new Error()
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
               
            }
            catch {
                res.status(500).json(InfoTypes.SERVER_CRASH)
            }
        }
        break
        default: {
            res.setHeader('Allow', ['PUT', 'PATCH', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    }
}
  
export default login