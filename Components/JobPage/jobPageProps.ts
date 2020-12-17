import { Job_v2 } from '../../types/Job'

export default interface JobPageProps {
    job : Job_v2 | null;
    isFallback : boolean;
}