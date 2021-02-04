import { verify } from "jsonwebtoken"
import { ObjectID } from "mongodb"

import VerifyToken from "../interfaces/token"
import { connectToDatabase } from "../mongodb"

const authUser = async (cookies : null | { [key : string] : string }) => {
    try {
        if (cookies === null) throw new Error()
        const decodedToken = verify(cookies.accessToken, `${process.env.ACCESS_TOKEN_SECRET}`)
        const _id : ObjectID = new ObjectID((decodedToken as VerifyToken).user)
        const { db } = await connectToDatabase()
        const collection = db.collection('users')
        const userNumbers : number = await collection.countDocuments({ _id })
        if (userNumbers === 0) throw new Error()
        const user = await collection.findOne({ _id })
        if (!user) throw new Error()
        return user
    }
    catch {
        return false
    }
}

export default authUser