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
import useFilters from '../customHooks/useFilters'

const Filters : React.FC = () => {

    const { filters, setFilters, changeFilter, isChecked, search, reset, technologies, getQueryValues, urlQuery, 
        isQueryNotPopular, returnNotPopularQueries } = useFilters()

    return (
        <StyledFiltersTab>
            {urlQuery.search ?
                 <StyledFilter checked id='filters' onClick={() => setFilters(true)}>{getQueryValues()}</StyledFilter>
                 :
                 <StyledFilter id='filters' onClick={() => setFilters(true)}>{getQueryValues()}</StyledFilter>
            }
            <AnimatePresence>
                {filters && (
                    <>
                        <StyledShade id='shade' onClick={() => setFilters(false)} variants={variants} initial="hidden" animate="visible" exit="hidden" />
                        <StyledFiltersContainer id='categories' variants={variants} initial="hidden" animate="visible" exit="hidden">
                            <StyledOptionsWrapper>
                                <StyledReset onClick={reset}>Reset</StyledReset>
                                <CloseIcon id='x-icon' style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => setFilters(false)} />
                            </StyledOptionsWrapper>
                            <StyledHeading>Popular Technologies</StyledHeading>
                            <StyledCategoriesWrapper id='filterCategories'>
                                {technologies.map(name => (
                                    isChecked(name) ?
                                    <StyledFilter checked onClick={() => changeFilter(name)} margin key={name}> {name} </StyledFilter>
                                    :
                                    <StyledFilter onClick={() => changeFilter(name)} margin key={name}> {name} </StyledFilter>
                                ))}
                            </StyledCategoriesWrapper>
                            {isQueryNotPopular() ?
                                <>
                                    <StyledHeading>Custom Technologies</StyledHeading>
                                    <StyledCategoriesWrapper>
                                        {returnNotPopularQueries()!.map(name => (
                                            <StyledFilter checked margin key={name}> {name} </StyledFilter>
                                        ))}
                                    </StyledCategoriesWrapper>
                                </>
                                :
                                null
                            }
                            <StyledButton id='approveFilter' onClick={search} fontSize='15px' offsetTop='40px' width='100%'>Approve</StyledButton>
                        </StyledFiltersContainer>
                    </>
                    )
                }
            </AnimatePresence>
        </StyledFiltersTab>
    )
}

export default Filters