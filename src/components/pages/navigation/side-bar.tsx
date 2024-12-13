import * as React from "react";
import style from "./side-bar.module.styl";
import slide from "./slide.module.styl";
import { 
    Calculator, Sword, ChartBar, ChartLine, IconContext, GithubLogo, ArrowSquareOut,
    Database
} from "@phosphor-icons/react"
import { styles } from "@app/util/style";
import { Link } from "react-router-dom";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { CSSTransition } from "react-transition-group";

type Props = {
    hidden: boolean
    toggle?: () => void
}

const navigation: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();

    const leftBarStyle = React.useMemo(() => {
        switch (uiType) {
            case "full":
                return undefined;
            case "menu-collapse":
                return style.small;
            case "mobile":
                return props.hidden ? style.hidden : undefined;
        }
    }, [uiType, props.hidden])

    const slideNodeRef = React.useRef(null);

    return (
        <IconContext.Provider value={{width: 40}}>
        <CSSTransition in={!props.hidden} mountOnEnter classNames={slide} nodeRef={slideNodeRef} timeout={250}>
            <nav className={styles(style.nav, leftBarStyle)} ref={slideNodeRef}>
                <h1>ルミア計算機(α)</h1>
                <hr />
                <Link to="/simple" className={style.button} onClick={props.toggle}>
                    <Calculator />
                    <h2>シンプル</h2>
                </Link>
                <Link to="/combat" className={style.button} onClick={props.toggle}>
                    <Sword />
                    <h2>対戦</h2>
                </Link>
                <div className={style.button}>
                    <ChartBar />
                    <h2>成長(作成中)</h2>
                </div>
                <div className={style.button}>
                    <ChartLine />
                    <h2>成長対戦(作成中)</h2>
                </div>
                {/*
                <Link to="/database" className={style.button}>
                    <Database />
                    <h2>データベース</h2>
                </Link>
                */}
                <hr />
                <a className={styles(style.button, style.link)} href="https://playeternalreturn.com" target="_blank">
                    <ArrowSquareOut />
                    <h2>エターナルリターン公式</h2>
                </a>
                <a className={styles(style.button, style.link)} href="https://github.com/zonaryFUND/LumiaCalculator" target="_blank">
                    <GithubLogo />
                    <h2>GitHub</h2>
                </a>
                <hr />
                <a className={styles(style.link, style.report)} href="https://docs.google.com/forms/d/e/1FAIpQLSf0HSztPWL6t4CzM0Iufqx6bGwY7qRJo9Gel9Nfih9-G2xyMw/viewform">バグ報告</a>
                <div className={style.warning}>
                    対応バージョン：1.36.1b
                </div>
            </nav>
        </CSSTransition>
        </IconContext.Provider>
    )
};

export default navigation;