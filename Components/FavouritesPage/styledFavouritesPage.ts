import styled, { StyledComponent } from 'styled-components'

export const StyledDiv : StyledComponent<"div", any> = styled.div`
    padding: 5px;

    ${({ theme }) => theme.media.desktop} {
        padding: 20px;
    }
`

interface StyledLinkProps {
    active : boolean;
}

export const StyledLink : StyledComponent<"a", any, StyledLinkProps> = styled.a<StyledLinkProps>`
    color: ${({ theme }) => theme.colors.lightGray};
    background-color: ${({ theme }) => theme.colors.dark};
    padding: 10px;
    display: block;
    text-align: center;
    border: ${({ active, theme }) => active ? `3px solid ${theme.colors.lightBlue}` : 'none'};
    border-bottom: ${({ active, theme }) => active ? `unset` : `3px solid ${theme.colors.lightBlue}`};
    width: 100%;
`

export const StyledLinks : StyledComponent<"div", any> = styled.div`
    display: flex;
`

export const StyledData : StyledComponent<"div", any> = styled.div`
    border: ${({ theme }) => `3px solid ${theme.colors.lightBlue}`};
    border-top: unset;
    padding: 5px;
`

export const StyledJob : StyledComponent<"div", any> = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`

interface StyledButtonsProps { buttons ?: number }

export const StyledButtons : StyledComponent<"div", any, StyledButtonsProps> = styled.div<StyledButtonsProps>`
    ${({ theme }) => theme.media.tablet} {
        display: grid;
        grid-template-columns: ${({ buttons }) => buttons && buttons === 1 ? 'min-content' : 'min-content min-content'};
        justify-content: center;
        column-gap: ${({ buttons }) => buttons && buttons === 1 ? '0px' : '10px'};
    }
`

export const StyledWrapper : StyledComponent<"div", any> = styled.div`
    text-align: center;
    grid-column: 1 / span 2;

    & > * {
        margin-top: 5px;
    }
`