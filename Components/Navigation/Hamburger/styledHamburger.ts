import styled, { StyledComponent } from 'styled-components'

export const StyledHamburgerWrapper : StyledComponent<"div", any> = styled.div`
    min-width: 25px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
`

interface StyledHamburgerDashesProps { isHamburgerLaunched : boolean };

export const StyledHamburgerDashes : StyledComponent<"div", any, StyledHamburgerDashesProps> = styled('div')<StyledHamburgerDashesProps>`
    width: 20px;
    height: 3px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.light};
    margin-right: ${({ isHamburgerLaunched }) => isHamburgerLaunched ? '100%' : '0'};
    position: relative;
    transition: all 150ms linear;
    transition-delay: ${({ isHamburgerLaunched }) => isHamburgerLaunched ? '0' : '150ms'};

    ::before,
    ::after {
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        background-color: ${({ theme }) => theme.colors.light};
        content: '';
        transition: all 150ms linear;
        transition-delay: ${({ isHamburgerLaunched }) => isHamburgerLaunched ? '150ms' : '0'};
    }

    ::before {
        top: ${({ isHamburgerLaunched }) => isHamburgerLaunched ? '0px' : '5px'};
        transform: ${({ isHamburgerLaunched }) => isHamburgerLaunched ? 'rotate(45deg)' : 'none'};
    }

    ::after {
        bottom: ${({ isHamburgerLaunched }) => isHamburgerLaunched ? '0px' : '5px'};
        transform: ${({ isHamburgerLaunched }) => isHamburgerLaunched ? 'rotate(-45deg)' : 'none'};
    }
`