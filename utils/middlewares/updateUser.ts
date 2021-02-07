import { ObjectID } from "mongodb"

import getCollection from "./getCollection"

const updateUser = async (_id : ObjectID, data : {}) => {
    try {
        const collection = await getCollection()
        const result = await collection.updateOne({ _id }, { $set: data })
        if (result.modifiedCount !== 1) throw new Error()
        return true
    }
    catch {
        return false
    }
}

export default updateUser