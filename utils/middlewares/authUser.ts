import { verify } from "jsonwebtoken"
import { ObjectID } from "mongodb"

import VerifyToken from "../interfaces/token"
import getCollection from "./getCollection"

const authUser = async (cookies : null | { [key : string] : string }, projection : {}, query ?: {[key: string]: string | string[]}) => {
    try {
        if (cookies === null) throw new Error()
        const decodedToken = verify(cookies['accessToken'], `${process.env.ACCESS_TOKEN_SECRET}`)
        if (query !== undefined && (decodedToken as VerifyToken).user !== query.id) throw new Error()
        if ((decodedToken as VerifyToken).user !== cookies['_id']) throw new Error()
        const _id : ObjectID = new ObjectID((decodedToken as VerifyToken).user)
        const collection = await getCollection()
        const userNumbers : number = await collection.countDocuments({ _id })
        if (userNumbers === 0) throw new Error()
        const user = await collection.findOne({ _id }, { projection })
        if (!user) throw new Error()
        if (user.accessToken !== cookies['accessToken']) throw new Error()
        return user
    }
    catch {
        return false
    }
}

export default authUser