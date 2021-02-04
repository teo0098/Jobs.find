import styled, { StyledComponent } from 'styled-components'
import { motion } from 'framer-motion'

export const StyledProfile : StyledComponent<"div", any> = styled.div`
    text-transform: capitalize;
    font-size: 18px;
    cursor: pointer;
    padding: 20px 10px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.light};

    ${({ theme }) => theme.media.tablet} {
        height: 100%;
        display: flex;
        align-items: center;
        border-left: ${({ theme }) => `0.5px solid ${theme.colors.gray}`};
        border-bottom: ${({ theme }) => `4px solid ${theme.colors.dark}`};

        :hover {
            border-bottom: ${({ theme }) => `4px solid ${theme.colors.lightBlue}`}
        }
    }
`

export const StyledSubmenu = styled(motion.nav)`
    display: flex;
    flex-direction: column;
    padding: 0 5px 5px 5px;
    background-color: ${({ theme }) => theme.colors.dark};

    ${({ theme }) => theme.media.tablet} {
        position: absolute;
        right: 0;
        top: 100%;
        width: 200px;
    }
`

export const StyledUserMenu : StyledComponent<"div", any> = styled.div`
    position: relative;
`