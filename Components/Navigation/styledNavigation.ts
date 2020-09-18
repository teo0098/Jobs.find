import styled, { StyledComponent } from 'styled-components'
import { motion } from 'framer-motion'

export const StyledNavigation : StyledComponent<"header", any> = styled.header`
    background-color: ${({ theme }) => theme.colors.dark};
    padding: 0 20px 0 10px;
    height: ${({ theme }) => theme.heights.navigation.mobile};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    z-index: ${({ theme }) => theme.zIndexes.zi3};
    border-bottom: ${({ theme }) => `0.5px solid ${theme.colors.gray}`};
    
    ${({ theme }) => theme.media.tablet} {
        padding: 0 0 0 10px;
        height: ${({ theme }) => theme.heights.navigation.tablet};
    }
`

export const StyledMenuContainer = styled(motion.div)`
    position: fixed;
    left: 0;
    width: 100%;
    top: ${({ theme }) => theme.heights.navigation.mobile};
    height: ${({ theme }) => `calc(100vh - ${theme.heights.navigation.mobile})`};
    background-color: ${({ theme }) => theme.colors.dark}; 
    z-index: ${({ theme }) => theme.zIndexes.zi2};
    overflow: hidden;
`

export const StyledTabletMenu : StyledComponent<"div", any> = styled.div`
    display: none;

    ${({ theme }) => theme.media.tablet} {
        display: flex;
        width: 100%;
        height: ${({ theme }) => theme.heights.navigation.tablet};
    }
`

export const StyledMobileOptions : StyledComponent<"div", any> = styled.div`
    display: flex;
    align-items: center;

    ${({ theme }) => theme.media.tablet} {
        display: none;
    }
`