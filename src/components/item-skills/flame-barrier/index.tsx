import * as React from "react";
import style from "../item-skills.styl";
import Constants from "./constants.json";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => (
    <>(
    <span className={style.maxhp}>
        近距離：最大体力の{props.values.dmg.melee.enemyMaxHP}％ | 遠距離：最大体力の{props.values.dmg.ranged.enemyMaxHP}％
    </span>
    )</>
)

const description: React.FC<Props> = props => (
    <p>
        戦闘に突入すると秒ごとに周り{Constants.area}mの敵に<Value {...props} />のスキルダメージを与えます。<br />
    </p> 
);

export default description;