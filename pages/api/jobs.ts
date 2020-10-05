import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const getMoreJobs = async (req : NextApiRequest, res : NextApiResponse) => {
  try {
    const page = req.query.page ? req.query.page : 1
    const search = req.query.search ? req.query.search : ''
    const { data: newJobs } = await axios.get(`${process.env.GET_JOBS_API}?page=${page}&search=${search}`)
    res.status(200).json(newJobs)
  }
  catch {
    res.status(404).json('ERROR')
  }
}

export default getMoreJobs