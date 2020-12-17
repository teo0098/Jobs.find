import styled, { StyledComponent } from 'styled-components'

import { StyledButton } from '../SearchEngine/styledSearchEngine'

interface StyledInfoProps { resp ?: boolean, borderLeft ?: boolean }

export const StyledInfo : StyledComponent<"section", any, StyledInfoProps> = styled('section')<StyledInfoProps>`
    padding: 20px;
    border-bottom: ${({ theme }) => `0.5px solid ${theme.colors.lightGray}`};
    border-left: ${({ theme, borderLeft }) => borderLeft ? `6px solid ${theme.colors.dark}` : 'none'};
    color: ${({ theme }) => theme.colors.dark};

    ${({ theme }) => theme.media.tablet} {
        ${({ resp }) => resp && `
            display: flex;
        `}
    }
`

export const StyledImg : StyledComponent<"img", any> = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    border: ${({ theme }) => `0.5px solid ${theme.colors.lightGray}`};
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 20px;

    ${({ theme }) => theme.media.tablet} {
        margin-right: 20px;
    }
`

export const StyledDesc : StyledComponent<"article", any> = styled.article`
    & * {
        line-height: 1.5;
        letter-spacing: 0.5px;
        margin-top: 20px;
        color: ${({ theme }) => theme.colors.gray};
    }

    & ul, ol {
        padding: 0 20px;
    }
`

interface StyledPProps { desc ?: boolean, margin ?: string }

export const StyledP : StyledComponent<"p", any, StyledPProps> = styled('p')<StyledPProps>`
    color: ${({ theme, desc }) => desc ? theme.colors.dark : theme.colors.lightGray};
    margin-top: ${({ desc }) => desc ? 'none' : '10px'};
    font-weight: ${({ desc }) => desc ? 'bold' : 'auto'};
    font-size: ${({ desc }) => desc ? '18px' : 'auto'};
    margin: ${({ margin }) => margin ? margin : 'none'};

    ${({ theme }) => theme.media.desktop} {
        margin: ${({ margin }) => margin ? '0 0 10px 0' : 'none'};
    }
`

export const StyledSpan : StyledComponent<"span", any> = styled.span`
    color: ${({ theme }) => theme.colors.dark};
`

export const StyledA : StyledComponent<"a", any> = styled.a`
    color: ${({ theme }) => theme.colors.lightBlue};
`

export const StyledApplyContainer : StyledComponent<"div", any> = styled.div`
    color: ${({ theme }) => theme.colors.dark};
    margin-top: 10px;

    & a {
        color: ${({ theme }) => theme.colors.lightBlue};
        text-decoration: underline;
        display: flex;
        word-break: break-all;
    }
`

export const StyledFavBtn = styled(StyledButton)`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface StyledDivProps {
    grid ?: boolean;
}

export const StyledDiv : StyledComponent<"div", any, StyledDivProps> = styled.div<StyledDivProps>`
    ${({ theme }) => theme.media.desktop} {
        display: grid;
        grid-template-columns: ${({ grid }) => grid ? `68% 28%` : null};
        justify-content: ${({ grid }) => grid ? 'space-between' : null};
        align-items: ${({ grid }) => grid ? 'flex-start' : null};
        width: 90%;
        margin: 0 auto;
        padding-top: 50px;

        & > * {
            border: ${({ theme, grid }) => grid ? `0.5px solid ${theme.colors.lightGray}` : null};
            border-bottom: none;
            border-radius: 3px;
            padding-top: ${({ grid }) => !grid ? 'unset' : null};
        }

        & > * > * {
            width: ${({ grid }) => !grid ? '100%' : null};
        }
    }

    ${({ theme }) => theme.media.laptop} {
        width: 75%;
    }
`

export const StyledStickyApply : StyledComponent<"div", any> = styled.div`
    ${({ theme }) => theme.media.desktop} {
        position: sticky;
        top: ${({ theme }) => `calc(${theme.heights.navigation.tablet} + 20px)`};
    }
`

export const StyledError : StyledComponent<"div", any> = styled.div`
    padding: 20px;
    
    ${({ theme }) => theme.media.desktop} {
        display: flex;
        justify-content: center;
        padding: 50px 20px;
    }
`