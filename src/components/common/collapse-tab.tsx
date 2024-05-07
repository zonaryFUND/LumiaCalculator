import * as React from "react";
import style from "./collapse-tab.module.styl";
import TabSelector from "components/pages/simple/tab-selector";

type Props = {
    collapse: boolean
    children: React.ReactElement[]
}

const collapseTab: React.FC<Props> = props => {
    const [tab, setTab] = React.useState(0);

    return (
        props.collapse ?
        <div className={style.collapsebase}>
            <TabSelector tabs={["実験体", "バフ・デバフ", "ダメージ"]} tab={[tab, setTab]} />
            <div className={style.base} style={{transform: `translateX(-${tab * 400}px)`}}>
                {props.children}
            </div>
        </div> :
        <div className={style.base}>
            {props.children}
        </div>
    );
};

export default collapseTab;