import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            敵の現在体力が<span className={style.maxhp}>敵の最大体力の{Constants.threshold}%</span>以下の場合、自分が対象に与える
            <span className={style.attack}>スキルのダメージ量が{Constants.effect}%</span>増加します。
        </p> 
    );
}

export default description;