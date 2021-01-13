import { Job_v2, Job } from '../../types/Job'

export default interface JobPageProps {
    job : Job_v2 | null;
    isFallback : boolean;
    addJob : (job: Job) => void;
    removeJob : (jobs: Array<Job>, job: Job) => void;
    jobs : Array<Job>;
}