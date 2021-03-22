import { NextApiResponse } from "next";
import { serialize } from 'cookie'

const generateCookies = (res : NextApiResponse, id : string, refreshToken : string) => {
    res.setHeader('Set-Cookie', [
        serialize('_id', id, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 400 * 100 // 100 years
        }),
        serialize('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 400 * 100 // 100 years
        })
    ])
}

export default generateCookies