import { Job } from '../../types/Job'

export default interface JobsProps {
    jobs : Array<Job> | null;
    jobWidth ?: string;
    paddingTop ?: string;
}