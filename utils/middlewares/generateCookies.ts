import { NextApiResponse } from "next";
import { serialize } from 'cookie'

const generateCookies = (res : NextApiResponse, name : string, id : string, accessToken : string) => {
    res.setHeader('Set-Cookie', [
        serialize('name', name, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 1 day
        }),
        serialize('_id', id, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 1 day
        }),
        serialize('accessToken', accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 1 day
        })
    ])
}

export default generateCookies