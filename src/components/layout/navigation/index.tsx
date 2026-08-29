import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import * as React from "react";
import TopBar from "./top-bar";
import SideBar from "./side-bar";
import style from "./index.module.styl";
import { List } from "@phosphor-icons/react";
import { useToggle } from "react-use";
import { CSSTransition } from "react-transition-group";
import opacity from "@app/opacity.module.styl";
import { StateProps } from "@app/util/state";

type Props = {
    title?: string
    left?: React.ReactElement[]
    right?: React.ReactElement[] | React.ReactElement
}

export const useNavigationButtonState = () => React.useState<Props>({})
export const NavigationButtonContext = React.createContext<StateProps<Props> | undefined>(undefined);

const navigation: React.FC = props => {
    const uiType = useResponsiveUIType();
    const [showSideBar, toggleShowSideBar] = useToggle(false);

    return (
        <>
            {uiType == "mobile" ? <TopBar /> : null}
            {
                uiType == "mobile" ? 
                <button className={style.menu} onClick={toggleShowSideBar}>
                    <List weight="bold" fontSize={30} color="white" />
                    <p>Menu</p>
                </button>
                : null
            }
            <CSSTransition in={uiType == "mobile" && showSideBar} mountOnEnter classNames={opacity} timeout={250}>
                <div className={style.bg} onClick={toggleShowSideBar} />
            </CSSTransition>
            <SideBar hidden={uiType == "mobile" && !showSideBar} toggle={uiType == "mobile" ? toggleShowSideBar : undefined} />
        </>
    )
}

export default navigation;