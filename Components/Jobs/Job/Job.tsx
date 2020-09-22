import Link from 'next/link'

import JobProps from './jobProps'
import { StyledImg, StyledMainSection, StyledP, StyledLink, StyledSection, StyledDiv, StyledH4 } from './styledJob'

const Job : React.FC<JobProps> = ({ title, id, company_logo, company, location, created_at, index }) => (
    <Link href={`/jobs/${encodeURIComponent(id)}`} passHref>
        <StyledLink index={index}>
            <StyledMainSection>
                <StyledImg src={`${company_logo}`} alt="Company logo" />
                <StyledSection>
                    <StyledH4> {title} </StyledH4>
                    <StyledDiv>
                        <StyledP company> {company} </StyledP>
                        <StyledP location> {location} </StyledP>
                        <StyledP> {created_at} </StyledP>
                    </StyledDiv>
                </StyledSection>
            </StyledMainSection>
        </StyledLink>
    </Link>
)

export default Job