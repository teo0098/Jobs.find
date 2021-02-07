import styled, { StyledComponent } from 'styled-components'

interface StyledDivProps { marginBottom ?: string }

export const StyledDiv : StyledComponent<"div", any, StyledDivProps> = styled.div<StyledDivProps>`
    margin-top: 20px;
    margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : 'none'};
`