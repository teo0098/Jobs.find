import { verify } from "jsonwebtoken"
import { ObjectID } from "mongodb"

import VerifyToken from "../interfaces/token"

const getUserID = (query : {[key: string]: string | string[]}, accessToken : string) => {
    const decodedToken = verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`)
    if ((decodedToken as VerifyToken).user !== query.id) return 403
    const _id : ObjectID = new ObjectID((decodedToken as VerifyToken).user)
    return _id
}

export default getUserID