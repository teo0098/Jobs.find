import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const getJobs = async (req : NextApiRequest, res : NextApiResponse) => {
  const jobs = await axios.get('https://jobs.github.com/positions.json')
  res.status(200).json(jobs.data)
}

export default getJobs