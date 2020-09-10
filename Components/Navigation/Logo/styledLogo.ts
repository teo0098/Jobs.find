import styled from 'styled-components'

const StyledLogo = styled.img`
    width: 120px;

    ${({ theme }) => theme.media.tablet} {
        width: 150px;
    }
`

export default StyledLogo