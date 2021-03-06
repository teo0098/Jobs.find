import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs'

import RegisterActions from '../../useReducers/registerReducer/actionTypes'
import validateData from '../../utils/middlewares/validateData'
import validatePassword from '../../utils/middlewares/validatePassword'
import InfoTypes from '../../utils/info/InfoTypes'
import getCollection from '../../utils/middlewares/getCollection'

type PassedBody = {name : string, surname : string, email : string, password : string, rpassword : string, adult : boolean}

const registerUser = async (req : NextApiRequest, res : NextApiResponse) => {
    const { method, body } = req

    res.setHeader('Content-Type', 'application/json');

    if (method === 'POST') {
        const { name, surname, email, password, rpassword } : PassedBody = body
        try {
            if (!validateData(name, surname, email)) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            if (!validatePassword(password, rpassword)) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            const collection = await getCollection()
            const userNumbers : number = await collection.countDocuments({ email })
            if (userNumbers > 0) return res.status(409).json(RegisterActions.EMAIL_EXISTS)
            const hashedPassword = await hash(password, 10)
            const user = {
                name: name.trim().toLowerCase(),
                surname: surname.trim().toLowerCase(),
                email: email.trim(),
                password: hashedPassword,
                favJobs: [],
                refreshTokens: []
            }
            const result = await collection.insertOne(user);
            if (result.insertedCount !== 1) throw new Error()
            res.status(201).json('Account created successfully')
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

export default registerUser