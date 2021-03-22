import { sign } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import InfoTypes from '../../../../utils/info/InfoTypes'
import authUser from '../../../../utils/middlewares/authUser'

const token = async (req : NextApiRequest, res : NextApiResponse) => {
    const { method, cookies, query } = req

    if (method === 'GET') {
        try {
            const user = await authUser(cookies, { refreshTokens: 1 }, cookies['refreshToken'], `${process.env.REFRESH_TOKEN_SECRET}`, query)
            if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            if (!user.refreshTokens.includes(cookies['refreshToken'])) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            const accessToken = sign({ user: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '5m' })
            res.setHeader('Authorization', `Bearer ${accessToken}`)
            res.status(200).json('Access token has been refreshed successfully')
        }
        catch {
            res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
        }
    }
    else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}
  
export default token