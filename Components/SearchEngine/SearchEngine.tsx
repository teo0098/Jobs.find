import { StyledSearchEngineContainer, StyledSearchEngine, StyledButton } from './styledSearchEngine'
import useSearchEngine from '../customHooks/useSearchEngine'

const SearchEngine : React.FC = () => {

    const { search, handleOnEnter, setQuery } = useSearchEngine()
    
    return (
        <StyledSearchEngineContainer>
            <StyledSearchEngine onKeyPress={e => handleOnEnter(e.key)} onChange={e => setQuery(e.target.value)} id='searchInput' type='text' spellCheck='false' placeholder='JavaScript' />
            <StyledButton onClick={search} id='searchInputBtn' fontSize='14px' width='30%'>Search for jobs</StyledButton>
        </StyledSearchEngineContainer>
    )
}

export default SearchEngine