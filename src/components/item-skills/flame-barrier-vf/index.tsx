import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => (
    <span className={style.maxhp}>最大体力の{props.values.dmg.enemyMaxHP}％</span>
)

const description: React.FC<Props> = props => (
    <p>
        <span className={style["vf-overflow"]}>VF暴走</span>状態の時、
        戦闘に突入すると秒ごとに周り{Constants.area}mの敵にスキルダメージを与えます。<br />
        敵に<Value {...props} />のスキルダメージを与えます。<br />
        <br />
        <span className={style["vf-overflow"]}>VF暴走</span>状態の場合はブラックマンバキングの<span className={style.strong}>炎の結界</span>のみ発動します。
    </p> 
);

export default description;