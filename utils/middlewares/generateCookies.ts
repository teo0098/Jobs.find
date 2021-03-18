import { NextApiResponse } from "next";
import { serialize } from 'cookie'

const generateCookies = (res : NextApiResponse, name : string, id : string, accessToken : string, refreshToken : string) => {
    res.setHeader('Set-Cookie', [
        serialize('name', name, {
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? '.jobsfind.vercel.app' : 'localhost',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 400 * 100 // 100 years
        }),
        serialize('_id', id, {
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? '.jobsfind.vercel.app' : 'localhost',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 400 * 100 // 100 years
        }),
        serialize('accessToken', accessToken, {
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? '.jobsfind.vercel.app' : 'localhost',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 10 // 10 mins
        }),
        serialize('refreshToken', refreshToken, {
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? '.jobsfind.vercel.app' : 'localhost',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 400 * 100 // 100 years
        })
    ])
}

export default generateCookies