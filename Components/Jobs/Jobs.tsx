import JobsProps from './jobsProps'

const Jobs : React.FC<JobsProps> = ({ jobs }) => {

    return (
        <div>
            {jobs ?
                jobs.map(({ title, id }) => (
                    <p key={id}> {title} </p>
                ))
                : null
            }
        </div>
    )
}

export default Jobs