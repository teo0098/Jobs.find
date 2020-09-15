import { StyledSearchEngineContainer, StyledSearchEngine, StyledButton } from './styledSearchEngine'

const SearchEngine : React.FC = () => {
    
    return (
        <StyledSearchEngineContainer>
            <StyledSearchEngine spellCheck='false' placeholder='JavaScript' />
            <StyledButton>Search for jobs</StyledButton>
        </StyledSearchEngineContainer>
    )
}

export default SearchEngine