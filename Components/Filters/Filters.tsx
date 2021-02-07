import CloseIcon from '@material-ui/icons/Close'
import { AnimatePresence } from 'framer-motion'

import * as SC from './styledFilters';
import variants from './animationVariants'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import useFilters from '../customHooks/useFilters'

const Filters : React.FC = () => {

    const { filters, setFilters, changeFilter, isChecked, search, reset, technologies, getQueryValues, urlQuery, 
        isQueryNotPopular, returnNotPopularQueries } = useFilters()

    return (
        <SC.StyledFiltersTab>
            {urlQuery.search ?
                <>
                    <SC.StyledFilter checked id='filters' onClick={() => setFilters(true)}>{getQueryValues()}</SC.StyledFilter>
                    <SC.StyledReset isGap onClick={reset}>Reset</SC.StyledReset>
                </>
                 :
                 <SC.StyledFilter id='filters' onClick={() => setFilters(true)}>{getQueryValues()}</SC.StyledFilter>
            }
            <AnimatePresence>
                {filters && (
                    <>
                        <SC.StyledShade id='shade' onClick={() => setFilters(false)} variants={variants} initial="hidden" animate="visible" exit="hidden" />
                        <SC.StyledFiltersContainer id='categories' variants={variants} initial="hidden" animate="visible" exit="hidden">
                            <SC.StyledOptionsWrapper>
                                <SC.StyledReset onClick={reset}>Reset</SC.StyledReset>
                                <CloseIcon id='x-icon' style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => setFilters(false)} />
                            </SC.StyledOptionsWrapper>
                            <SC.StyledHeading>Popular Technologies</SC.StyledHeading>
                            <SC.StyledCategoriesWrapper id='filterCategories'>
                                {technologies.map(name => (
                                    isChecked(name) ?
                                    <SC.StyledFilter checked onClick={() => changeFilter(name)} margin key={name}> {name} </SC.StyledFilter>
                                    :
                                    <SC.StyledFilter onClick={() => changeFilter(name)} margin key={name}> {name} </SC.StyledFilter>
                                ))}
                            </SC.StyledCategoriesWrapper>
                            {isQueryNotPopular() ?
                                <>
                                    <SC.StyledHeading>Custom Technologies</SC.StyledHeading>
                                    <SC.StyledCategoriesWrapper>
                                        {returnNotPopularQueries()!.map(name => (
                                            <SC.StyledFilter checked margin key={name}> {name} </SC.StyledFilter>
                                        ))}
                                    </SC.StyledCategoriesWrapper>
                                </>
                                :
                                null
                            }
                            <StyledButton id='approveFilter' onClick={search} fontSize='15px' offsetTop='40px' width='100%'>Approve</StyledButton>
                        </SC.StyledFiltersContainer>
                    </>
                    )
                }
            </AnimatePresence>
        </SC.StyledFiltersTab>
    )
}

export default Filters