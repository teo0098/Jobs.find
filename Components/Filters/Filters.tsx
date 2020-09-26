import { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { AnimatePresence } from 'framer-motion'

import { StyledFiltersTab, 
    StyledFilter, 
    StyledFiltersContainer, 
    StyledReset, 
    StyledOptionsWrapper,
    StyledHeading,
    StyledCategoriesWrapper, StyledShade } from './styledFilters';
import variants from './animationVariants'
import { StyledButton } from '../SearchEngine/styledSearchEngine'

const technologies : Array<string> = [
    'JavaScript', 'Angular', 'React', '.NET', 'Vue', 'SQL', 'Python', 'Spring', 'Node', 'AWS', 'Android', 'Symfony', 'Ruby',
    'Django', 'TypeScript', 'RESTful', 'GraphQL', 'Golang', 'MongoDB', 'Cypress'
]

const Filters : React.FC = () => {

    const [filters, setFilters] = useState<boolean>(false);

    return (
        <StyledFiltersTab>
            <StyledFilter id='filters' onClick={() => setFilters(true)}>Filters</StyledFilter>
            <AnimatePresence>
                {filters && (
                    <>
                        <StyledShade id='shade' onClick={() => setFilters(false)} variants={variants} initial="hidden" animate="visible" exit="hidden" />
                        <StyledFiltersContainer id='categories' variants={variants} initial="hidden" animate="visible" exit="hidden">
                            <StyledOptionsWrapper>
                                <StyledReset>Reset</StyledReset>
                                <CloseIcon id='x-icon' style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => setFilters(false)} />
                            </StyledOptionsWrapper>
                            <StyledHeading>Popular Technologies</StyledHeading>
                            <StyledCategoriesWrapper>
                                {technologies.map(name => (
                                    <StyledFilter margin key={name}> {name} </StyledFilter>
                                ))}
                            </StyledCategoriesWrapper>
                            <StyledButton fontSize='15px' offsetTop='40px' width='100%'>Approve</StyledButton>
                        </StyledFiltersContainer>
                    </>
                    )
                }
            </AnimatePresence>
        </StyledFiltersTab>
    )
}

export default Filters