import styled, { StyledComponent } from 'styled-components'

export const StyledNav : StyledComponent<"nav", any> = styled.nav`
    display: grid;
    grid-template-columns: 1fr;

    ${({ theme }) => theme.media.tablet} {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: stretch;
        height: ${({ theme }) => theme.heights.navigation.tablet};
    }
`

interface StyledLinkProps {
    isFirst ?: boolean;
    noBorder ?: boolean;
}

export const StyledLink : StyledComponent<"a", any, StyledLinkProps> = styled('a')<StyledLinkProps>`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.light};
    border-bottom: ${({ theme, noBorder }) => noBorder ? 'none' : `0.5px dotted ${theme.colors.gray}`};
    padding: 20px 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 15px;

    ${({ theme }) => theme.media.tablet} {
        margin: ${({ isFirst }) => isFirst ? '0 auto 0 10px' : 'none'};
        border-right: ${({ isFirst, theme }) => isFirst ? `0.5px solid ${theme.colors.gray}` : 'none'};
        border-left: ${({ theme }) => `0.5px solid ${theme.colors.gray}`};
        border-bottom: ${({ theme }) => `4px solid ${theme.colors.dark}`};
        height: 100%;
        display: flex;
        align-items: center;

        :hover {
            border-bottom: ${({ theme }) => `4px solid ${theme.colors.lightBlue}`}
        }
    }
`