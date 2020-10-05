import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'

import Job from '../../types/Job'
import JobPage from '../../Components/JobPage/JobPage'

interface JobProps { job : Job | null }

const JobId : React.FC<JobProps> = ({ job }) => {

    const { isFallback } : NextRouter = useRouter()

    return (
        <>
            <Head>
                <title>
                    {isFallback ? 'Loading...' : ''}
                    {job ? job.title : ''}
                    {!job && !isFallback ? 'Ups...' : ''}
                </title>
            </Head>
            <JobPage isFallback={isFallback} job={job} />
        </>
    )
}

export const getStaticPaths : GetStaticPaths = async () => {

    const { data: jobs } : AxiosResponse<Array<Job>> = await axios.get(`${process.env.GET_JOBS_API}`)
    const paths = jobs.map((job : Job) => ({
        params: { id: job.id }
    }))

    return { paths, fallback: true }
}

export const getStaticProps : GetStaticProps = async ({ params }) => {
    
    let job : Job | null
    try {
        if (!params) throw new Error()
        const { data, status } : AxiosResponse<Job> = await axios.get(`${process.env.GET_JOB_API}/${params.id}.json`)
        if (Object.keys(data).length < 11 || !data || status !== 200) throw new Error()        
        job = data
    }
    catch {
        job = null;
    }
    
    return { props: { job } }
}

export default JobId;