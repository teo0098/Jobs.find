import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { ObjectID } from 'mongodb'

import InfoTypes from '../../utils/info/InfoTypes'
import authUser from '../../utils/middlewares/authUser'
import updateUser from '../../utils/middlewares/updateUser'

const logout = async (req : NextApiRequest, res : NextApiResponse) => {
    const { method, cookies } = req

    if (method === 'GET') {
        try {
            const user = await authUser(cookies, { refreshTokens: 1 }, 'refreshToken', `${process.env.REFRESH_TOKEN_SECRET}`)
            if (!user) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            if (!user.refreshTokens.includes(cookies['refreshToken'])) return res.status(403).json(InfoTypes.WRONG_CREDENTIALS)
            const updateResult = await updateUser(new ObjectID(user._id), { refreshTokens: [...user.refreshTokens.filter((token : string) => token !== cookies['refreshToken'])] })
            if (!updateResult) throw new Error()
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
                serialize('refreshToken', '', {
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 0
                })
            ])
            res.status(200).end()
        }
        catch {
            res.status(500).json(InfoTypes.SERVER_CRASH)
        } 
    }
    else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}
  
export default logout