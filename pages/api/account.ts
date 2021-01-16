import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import validator from 'validator'
import { hash } from 'bcryptjs'

import RegisterActions from '../../useReducers/registerReducer/actionTypes'

type PassedBody = {name : string, surname : string, email : string, password : string, rpassword : string, adult : boolean}

const registerUser = async (req : NextApiRequest, res : NextApiResponse) => {
    const { name, surname, email, password, rpassword } : PassedBody = req.body
    try {
        if (!/^[A-Za-z\s]{2,20}$/.test(name) || name.trim().length === 0) throw new Error()
        if (!/^[A-Za-z\s]{2,30}$/.test(surname) || surname.trim().length === 0) throw new Error()
        if (!email || !validator.isEmail(email)) throw new Error()
        if (!/^[A-Za-z0-9!@#$_-]{8,30}$/.test(password)) throw new Error()
        if (rpassword !== password) throw new Error()
        const { db } = await connectToDatabase()
        const collection = db.collection('users')
        const userNumbers = await collection.countDocuments({ email })
        if (userNumbers > 0) return res.status(409).json(RegisterActions.EMAIL_EXISTS)
        const hashedPassword = await hash(password, 10)
        const user = {
            name: name.trim().toLowerCase(),
            surname: surname.trim().toLowerCase(),
            email: email.trim(),
            password: hashedPassword,
            favJobs: []
        }
        const result = await collection.insertOne(user);
        if (result.insertedCount !== 1) throw new Error()
        res.status(201).json('Created successfully')
    }
    catch {
        res.status(500).json('Server crashed')
    }
}

export default registerUser