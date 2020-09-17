import { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { AnimatePresence } from 'framer-motion'

import { StyledFiltersTab, 
    StyledFilter, 
    StyledFiltersContainer, 
    StyledReset, 
    StyledOptionsWrapper,
    StyledHeading,
    StyledCategoriesWrapper } from './styledFilters'
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
            <StyledFilter onClick={() => setFilters(true)}>Filters</StyledFilter>
            <AnimatePresence>
                {filters && (
                    <StyledFiltersContainer variants={variants} initial="hidden" animate="visible" exit="hidden">
                        <StyledOptionsWrapper>
                            <StyledReset>Reset</StyledReset>
                            <CloseIcon style={{ fontSize: '30px' }} onClick={() => setFilters(false)} />
                        </StyledOptionsWrapper>
                        <StyledHeading>Popular Technologies</StyledHeading>
                        <StyledCategoriesWrapper>
                            {technologies.map(name => (
                                <StyledFilter margin key={name}> {name} </StyledFilter>
                            ))}
                        </StyledCategoriesWrapper>
                        <StyledButton fontSize='16px' offsetTop='40px' width='100%'>Approve</StyledButton>
                    </StyledFiltersContainer>
                    )
                }
            </AnimatePresence>
        </StyledFiltersTab>
    )
}

export default Filters