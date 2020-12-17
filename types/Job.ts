export type Job = {
    id : string,
    type : string,
    url : string,
    created_at : string,
    company : string,
    company_url : string,
    location : string,
    title : string,
    description : string,
    how_to_apply : string,
    company_logo : string
}

export type Job_v2 = {
    jobData : Job,
    similarJobs : Array<Job>
}