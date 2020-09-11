import { Dispatch, SetStateAction } from "react"

export default interface HamburgerProps {
    launchMenu : boolean;
    setLaunchMenu : Dispatch<SetStateAction<boolean>>;
}