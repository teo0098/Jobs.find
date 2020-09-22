import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import axios, { AxiosResponse } from 'axios'

import Job from '../../types/Job'

interface JobProps { job : Job | null }

const JobId : React.FC<JobProps> = ({ job }) => {

    return (
        <>
            <Head>
                <title> {job ? job.title : 'Ups...'} </title>
            </Head>
            <div>
                {job.title}
            </div>
        </>
    )
}

export const getStaticPaths : GetStaticPaths = async () => {

    const { data: jobs } : AxiosResponse<Array<Job>> = await axios.get(process.env.GET_JOBS_API)
    const paths = jobs.map((job : Job) => ({
        params: { id: job.id }
    }))

    return { paths, fallback: true }
}

export const getStaticProps : GetStaticProps = async ({ params: { id } }) => {
    
    let job : Job | null
    try {
        const { data } : AxiosResponse<Job> = await axios.get(`${process.env.GET_JOB_API}/${id}.json`)
        if (Object.keys(data).length < 11 || !data) throw new Error()        
        job = data
    }
    catch {
        job = null;
    }
    
    return { props: { job } }
}

export default JobId;