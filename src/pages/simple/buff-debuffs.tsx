import * as React from "react";
import Pane from "components/layout/pane/pane";
import style from "./buff-debuff.module.styl";

const buffDebuffs: React.FC = props => {
    return (
        <Pane title="バフ・デバフ" className={style.buffdebuff}>
            <p>作成中</p>
        </Pane>
    )
};

export default buffDebuffs;