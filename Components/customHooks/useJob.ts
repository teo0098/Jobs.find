import { Job } from "../../types/Job"

type Function = (jobs : Array<Job>, job : Job) => boolean
type useJob = () => { isJobInFavourite : Function }

const useJob : useJob = () => {

    const isJobInFavourite : Function = (jobs : Array<Job>, job : Job) => {
        const jobExists = jobs.find(j => j.id === job.id)
        if (jobExists === undefined) return false
        return true
    }

    return { isJobInFavourite }
}

export default useJob