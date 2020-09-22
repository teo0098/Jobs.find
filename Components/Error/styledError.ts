import styled, { StyledComponent } from 'styled-components'

export const StyledError : StyledComponent<"div", any> = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.colors.error};
    background-color: ${({ theme }) => theme.colors.lightError};
    padding: 10px;
    border-radius: 3px;
`

export const StyledErrorMsg : StyledComponent<"p", any> = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.dark};
    letter-spacing: 0.5px;
`