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
    textColor ?: string;
    backgroundColor ?: string;
    paddingLeft ?: string;
}

export const StyledLink : StyledComponent<"a", any, StyledLinkProps> = styled('a')<StyledLinkProps>`
    text-decoration: none;
    border-bottom: ${({ theme, noBorder }) => noBorder ? 'none' : `0.5px dotted ${theme.colors.gray}`};
    text-transform: uppercase;
    font-size: 15px;
    padding: 20px 10px;
    letter-spacing: 1px;
    background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : 'transparent'};
    color: ${({ theme, textColor }) => textColor ? textColor : theme.colors.light};
    padding-left: ${({ paddingLeft }) => paddingLeft ? paddingLeft : 'none'};

    ${({ theme }) => theme.media.tablet} {
        height: 100%;
        display: flex;
        align-items: center;
        border-left: ${({ theme }) => `0.5px solid ${theme.colors.gray}`};
        border-bottom: ${({ theme }) => `4px solid ${theme.colors.dark}`};
        margin: ${({ isFirst }) => isFirst ? '0 auto 0 10px' : 'none'};
        border-right: ${({ isFirst, theme }) => isFirst ? `0.5px solid ${theme.colors.gray}` : 'none'};
        padding-left: 10px;

        :hover {
            border-bottom: ${({ theme }) => `4px solid ${theme.colors.lightBlue}`}
        }
    }
`