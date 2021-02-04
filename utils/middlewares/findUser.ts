import { ObjectID } from "mongodb"

const findUser = async (collection : any, _id : ObjectID, accessToken : string) => {
    const userNumbers : number = await collection.countDocuments({ _id })
    if (userNumbers === 0) return 403
    const user = await collection.findOne({ _id })
    if (user.accessToken !== accessToken) return 403
    return user
}

export default findUser