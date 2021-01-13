import styled, { StyledComponent } from 'styled-components'

export const StyledImg : StyledComponent<"img", any> = styled.img`
    object-fit: contain;
    width: 70px;
    height: 70px;
    margin-right: 10px;

    ${({ theme }) => theme.media.desktop} {
        margin-right: 30px;
    }
`
export const StyledMainSection : StyledComponent<"section", any> = styled.section`
    display: flex;
    align-items: center;
`

interface StyledPProps { company ?: boolean, location ?: boolean }

export const StyledP : StyledComponent<"p", any, StyledPProps> = styled('p')<StyledPProps>`
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: 12px;
    font-weight: bold;
    margin-top: 3px;

    ::before {
        ${({ company }) => company && `content: 'at'`};
        ${({ location }) => location && `content: 'in'`};
    }

    ${({ theme }) => theme.media.tablet} {
        font-size: 13px;
    }

    ${({ theme }) => theme.media.desktop} {
        font-size: 14px;
    }
`

interface StyledLinkProps { index : number, border ?: boolean }

export const StyledLink : StyledComponent<"a", any, StyledLinkProps> = styled('a')<StyledLinkProps>`
    border-left: ${({ theme }) => `6px solid ${theme.colors.dark}`};
    border-bottom: ${({ theme }) => `0.5px solid ${theme.colors.lightGray}`};
    display: block;
    padding: 5px;
    border-top: ${({ theme, index, border }) => index === 0 || border ? `0.5px solid ${theme.colors.lightGray}` : 'none'};
    
    ${({ theme }) => theme.media.desktop} {
        width: 90%;
    }

    ${({ theme }) => theme.media.laptop} {
        width: 75%;
    }
`

export const StyledSection : StyledComponent<"section", any> = styled.section`
    ${({ theme }) => theme.media.tablet} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
`

export const StyledDiv : StyledComponent<"div", any> = styled.div`
    ${({ theme }) => theme.media.tablet} {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
    }
`

export const StyledH4 : StyledComponent<"h4", any> = styled.h4`
    color: ${({ theme }) => theme.colors.dark};

    ${({ theme }) => theme.media.tablet} {
        width: 300px;
        margin-right: 10px;
    }

    ${({ theme }) => theme.media.desktop} {
        width: 400px;
    }
`