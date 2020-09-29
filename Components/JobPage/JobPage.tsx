import htmlParser from 'html-react-parser'
import FavouriteIcon from '@material-ui/icons/FavoriteBorderOutlined'

import JobPageProps from './jobPageProps'
import { StyledInfo, StyledImg, StyledDesc, StyledP, StyledSpan, StyledA, StyledApplyContainer, StyledFavBtn, 
    StyledDiv, StyledStickyApply, StyledError } from './styledJobPage';
import Error from '../Error/Error'
import Loader from '../Loader/Loader'

const JobPage : React.FC<JobPageProps> = ({ job, isFallback }) => {

    if (isFallback) return (
        <div style={{ margin: '20px' }}>
            <Loader />
        </div>
    )

    return (
        job ?
            <StyledDiv id='jobPage'>
                <div>
                    <StyledInfo resp>
                        <StyledImg src={`${job.company_logo ? job.company_logo : ''}`} alt='Company logo' />
                        <section>
                            <h2 id='jobTitle'> {job.title} </h2>
                            <StyledP> Company: <StyledA rel="noopener nofollow" target="_blank" href={`${job.company_url}`}> {job.company} </StyledA></StyledP>
                            <StyledP> Type: <StyledSpan>{job.type}</StyledSpan></StyledP>
                            <StyledP> Location: <StyledSpan>{job.location}</StyledSpan></StyledP>
                            <StyledP> Posted: <StyledSpan>{job.created_at}</StyledSpan></StyledP>
                        </section>
                    </StyledInfo>
                    <StyledInfo borderLeft>
                        <StyledP desc>Description</StyledP>
                        <StyledDesc> {htmlParser(job.description)} </StyledDesc>
                    </StyledInfo>
                </div>
                <StyledStickyApply>
                    <StyledInfo>
                        <StyledP desc>How to apply?</StyledP>
                        <StyledApplyContainer>
                            {htmlParser(job.how_to_apply)}
                        </StyledApplyContainer>
                    </StyledInfo>
                    <StyledInfo>
                        <StyledP desc>Has that job suited you?</StyledP>
                        <StyledFavBtn width="100%" fontSize="16px">Add to <FavouriteIcon style={{ marginLeft: '5px' }} /></StyledFavBtn>
                    </StyledInfo>
                </StyledStickyApply>
            </StyledDiv>
        :
            <StyledError>
                <Error> Unable to present job for you... Please attempt again soon. </Error>
            </StyledError>
    )
}

export default JobPage