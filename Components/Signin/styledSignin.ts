import styled, { StyledComponent } from 'styled-components'

export const StyledInputsContainer : StyledComponent<'div', any> = styled.div`
    display: grid;
    grid-template-columns: 100%;
    row-gap: 20px;

    & > * {
        background-color: ${({ theme }) => theme.colors.light};
    }
`

export const StyledForm : StyledComponent<'form', any> = styled.form`
    text-align: center;
`