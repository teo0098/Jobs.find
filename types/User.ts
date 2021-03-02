import { Job } from "./Job";

export type User = { name: string, surname: string, email: string, favJobs: Array<Job> } | null