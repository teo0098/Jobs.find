import styled, { StyledComponent } from 'styled-components'
import InfoProps from './infoProps'
import InfoTypes from './InfoTypes'

export const StyledDiv : StyledComponent<"div", any, InfoProps> = styled.div<InfoProps>`
    background-color: ${({ theme, state }) => state === InfoTypes.ERROR ? theme.colors.lightError : theme.colors.lightSuccess};
    padding: 10px;
`

export const StyledP : StyledComponent<"p", any, InfoProps> = styled.p<InfoProps>`
    color: ${({ theme, state }) => state === InfoTypes.ERROR ? theme.colors.error : theme.colors.success};
`