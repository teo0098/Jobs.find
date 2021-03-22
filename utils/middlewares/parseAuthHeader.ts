import { NextApiRequest } from "next";

const parseAuthHeader = (req : NextApiRequest) => req.headers['authorization'] !== undefined ? req.headers['authorization'].replace('Bearer ', '') : ''

export default parseAuthHeader