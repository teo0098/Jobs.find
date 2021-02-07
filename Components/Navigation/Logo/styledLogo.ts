import styled, { StyledComponent } from 'styled-components'

const StyledLogo : StyledComponent<"img", any> = styled.img`
    width: 120px;

    ${({ theme }) => theme.media.tablet} {
        width: 150px;
    }
`

export default StyledLogo