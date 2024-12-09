import * as React from "react";
import style from "./top-bar.module.styl";
import { NavigationButtonContext } from ".";

const topBar: React.FC = props => {
    const context = React.useContext(NavigationButtonContext)
    return (
        <div className={style.topbar}>
            <div />
            <h1>{context?.[0].title}</h1>
            {context?.[0].right ?? <div />}
        </div>
    )
}

export default topBar;