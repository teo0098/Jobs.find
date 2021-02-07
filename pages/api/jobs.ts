import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import JobsActions from '../../useReducers/jobsReducer/actionTypes'

const getMoreJobs = async (req : NextApiRequest, res : NextApiResponse) => {
  const { method } = req

  if (method === 'GET') {
    try {
      const page = req.query.page ? req.query.page : 1
      const search = req.query.search ? req.query.search : ''
      const { data: newJobs } = await axios.get(`${process.env.GET_JOBS_API}?page=${page}&search=${search}`)
      res.status(200).json(newJobs)
    }
    catch {
      res.status(500).json(JobsActions.ERROR)
    }
  }
  else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default getMoreJobs