import { StyledSearchEngineContainer, StyledSearchEngine, StyledButton } from './styledSearchEngine'

const SearchEngine : React.FC = () => {
    
    return (
        <StyledSearchEngineContainer>
            <StyledSearchEngine spellCheck='false' placeholder='JavaScript' />
            <StyledButton fontSize='14px' width='30%'>Search for jobs</StyledButton>
        </StyledSearchEngineContainer>
    )
}

export default SearchEngine