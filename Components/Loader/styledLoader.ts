import styled, { StyledComponent } from 'styled-components'
import StyledLoaderProps from './loaderProps'

export const StyledLoader : StyledComponent<"div", any, StyledLoaderProps> = styled.div<StyledLoaderProps>`
    display: flex;
    justify-content: center;
    
    & * {
        color: ${({ theme, light }) => light ? theme.colors.light : theme.colors.dark};
    }
`