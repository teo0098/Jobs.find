import { NextApiRequest, NextApiResponse } from 'next'

const getMoreJobs = async (req : NextApiRequest, res : NextApiResponse) => {
  try {
    res.status(201).json("WORKS")
  }
  catch {
    res.status(500).json('ERROR')
  }
}

export default getMoreJobs