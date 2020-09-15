import styled, { StyledComponent, css, FlattenSimpleInterpolation } from 'styled-components'

export const StyledSearchEngineContainer : StyledComponent<"div", any> = styled.div`
    background-color: ${({ theme }) => theme.colors.dark};
    display: flex;
    justify-content: center;
    padding: 30px 10px;

    ${({ theme }) => theme.media.tablet} {
        padding: 50px 10px;
    }
`

const sharedStyles : FlattenSimpleInterpolation = css`
    outline: none;
    border: none;
    letter-spacing: 1px;
`

export const StyledSearchEngine : StyledComponent<"input", any> = styled.input`
    ${sharedStyles}
    width: 60%;
    padding: 15px 10px;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 16px;

    ${({ theme }) => theme.media.tablet} {
        width: 500px;
    }
`

export const StyledButton : StyledComponent<"button", any> = styled.button`
    ${sharedStyles}
    background-color: ${({ theme }) => theme.colors.lightBlue};
    width: 30%;
    padding: 10px 5px;
    color: ${({ theme }) => theme.colors.light};
    font-size: 15px;
    cursor: pointer;

    ${({ theme }) => theme.media.tablet} {
        width: 150px;
    }
`