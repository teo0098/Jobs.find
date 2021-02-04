import styled, { StyledComponent, css, FlattenSimpleInterpolation } from 'styled-components'

export const StyledSearchEngineContainer : StyledComponent<"div", any> = styled.div`
    background-color: ${({ theme }) => theme.colors.dark};
    display: flex;
    justify-content: center;
    padding: 30px 20px;

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
    width: 70%;
    padding: 15px 10px;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 15px;

    ${({ theme }) => theme.media.tablet} {
        width: 500px;
    }
`

interface StyledButtonProps { width : string, offsetTop ?: string, fontSize : string, color ?: string, expand ?: string }

export const StyledButton : StyledComponent<"button", any, StyledButtonProps> = styled('button')<StyledButtonProps>`
    ${sharedStyles}
    background-color: ${({ theme, color }) => color ? color : theme.colors.lightBlue};
    width: ${({ width }) => width};
    padding: 10px 5px;
    color: ${({ theme }) => theme.colors.light};
    font-size: ${({ fontSize }) => fontSize};
    cursor: pointer;
    margin-top: ${({ offsetTop }) => offsetTop};

    ${({ theme }) => theme.media.tablet} {
        width: ${({ expand }) => expand ? expand : '150px'};
    }
`