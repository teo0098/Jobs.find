import { connectToDatabase } from "../mongodb"

const getCollection = async () => {
    const { db } = await connectToDatabase()
    const collection = db.collection('users')
    return collection
}

export default getCollection