import { Job } from "../../types/Job";

export default interface FavouritesPageProps {
    jobs : Array<Job>;
    amount : number;
    removeJob : (jobs: Array<Job>, job: Job) => void;
}