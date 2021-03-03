import { NextApiResponse } from "next";
import { serialize } from 'cookie'

const generateCookies = (res : NextApiResponse, name : string, id : string, accessToken : string, refreshToken : string) => {
    res.setHeader('Set-Cookie', [
        serialize('name', name, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 400 * 100 // 100 years
        }),
        serialize('_id', id, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 400 * 100 // 100 years
        }),
        serialize('accessToken', accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 10 // 10 mins
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