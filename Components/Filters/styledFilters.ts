import styled, { StyledComponent, css } from 'styled-components'
import { motion } from 'framer-motion'

export const StyledFiltersTab : StyledComponent<"div", any> = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: ${({ theme }) => `0.5px solid ${theme.colors.lightGray}`};
    color: ${({ theme }) => theme.colors.dark};
    position: relative;
`

export const StyledShade = styled(motion.div)`
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background-color: transparent;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.zIndexes.zi1};
    
    ${({ theme }) => theme.media.tablet} {
        background-color: ${({ theme }) => theme.colors.lightDark};
    }
`

export const StyledFiltersContainer = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.light};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndexes.zi4};
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    ${({ theme }) => theme.media.tablet} {
        min-height: auto;
        width: 600px;
        position: absolute;
        top: 0;
        left: 100px;
        z-index: ${({ theme }) => theme.zIndexes.zi2};
        bottom: auto;
        overflow-y: hidden;
    }
`

const sharedStyles = css`
    letter-spacing: 1px;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
`

interface StyledFilterProps { margin ?: boolean, checked ?: boolean }

export const StyledFilter : StyledComponent<"section", any, StyledFilterProps> = styled('section')<StyledFilterProps>`
    border: ${({ theme, checked }) => checked ? `2px solid ${theme.colors.dark}` : `2px solid ${theme.colors.lightGray}`};
    padding: 5px 10px;
    margin: ${({ margin }) => margin ? `10px 10px 0 0` : 'none'};
    color: ${({ theme, checked }) => checked ? theme.colors.dark : theme.colors.lightGray};
    ${sharedStyles}

    :hover {
        border: ${({ theme }) => `2px solid ${theme.colors.dark}`};
        color: ${({ theme }) => theme.colors.dark};
    }
`

interface StyledResetProps { isGap ?: boolean }

export const StyledReset : StyledComponent<"span", any, StyledResetProps> = styled.span<StyledResetProps>`
    color: ${({ theme }) => theme.colors.lightGray};
    ${sharedStyles}
    margin-left: ${({ isGap }) => isGap ? '10px' : 'none'};

    :hover {
        color: ${({ theme }) => theme.colors.dark};
    }
`

export const StyledOptionsWrapper : StyledComponent<"div", any> = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const StyledHeading : StyledComponent<"h3", any> = styled.h3`
    letter-spacing: 1px;
    margin-top: 30px;
`

export const StyledCategoriesWrapper : StyledComponent<"div", any> = styled.div`
    display: flex;
    flex-wrap: wrap;
`