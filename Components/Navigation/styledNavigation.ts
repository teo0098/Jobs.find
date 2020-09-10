import styled, { StyledComponent } from 'styled-components'

const StyledNavigation : StyledComponent<"header", any> = styled.header`
    background-color: ${({ theme }) => theme.colors.dark};
    padding: 0 20px 0 10px;
    height: ${({ theme }) => theme.heights.navigation.mobile};
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${({ theme }) => theme.media.tablet} {
        padding: 0 10px;
        height: ${({ theme }) => theme.heights.navigation.tablet};
    }
`

export default StyledNavigation