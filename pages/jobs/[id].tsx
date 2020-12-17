import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'

import { Job, Job_v2 } from '../../types/Job'
import JobPage from '../../Components/JobPage/JobPage'

interface JobProps { job : Job_v2 | null }

const JobId : React.FC<JobProps> = ({ job }) => {

    const { isFallback } : NextRouter = useRouter()

    return (
        <>
            <Head>
                <title>
                    {isFallback ? 'Loading...' : ''}
                    {job ? job.jobData.title : ''}
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
    
    let job : Job_v2 | null
    try {
        if (!params) throw new Error()
        const { data: jobData } : AxiosResponse<Job> = await axios.get(`${process.env.GET_JOB_API}/${params.id}.json`)
        if (Object.keys(jobData).length < 11 || !jobData) throw new Error()   
        const { data: similarJobs } : AxiosResponse<Array<Job>> = await axios.get(`${process.env.GET_JOBS_API}?location=${jobData.location}`);  
        if (similarJobs.length === 0 || !similarJobs) throw new Error();   
        job = {
            jobData,
            similarJobs
        }
    }
    catch {
        job = null;
    }
    
    return { props: { job } }
}

export default JobId