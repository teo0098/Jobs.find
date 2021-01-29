import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'

import { connectToDatabase } from '../../../../utils/mongodb'

const favJobs = async (req : NextApiRequest, res : NextApiResponse) => {
    const { query, body, method, cookies } = req

    switch (method) {
        case 'POST': {
            const { db } = await connectToDatabase()
            const collection = db.collection('users')
            res.status(201).json('Job added successfully')
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