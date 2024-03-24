import * as React from "react";
import Constants from "./constants.json";
import style from "../item-skills.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => (
    props.values.dmg.enemyMaxHP ? <span className={style.maxhp}>敵の最大体力の{props.values.dmg.enemyMaxHP}％</span> :
    props.values.dmg.amp ? <span className={style.amp}>スキル増幅の{props.values.dmg.amp}％</span> :
    props.values.dmg.perLevel ? <>{props.values.dmg.base}<span className={style.level}>(+キャラクターレベル * {props.values.dmg.perLevel})</span></> :
    null
)

const description: React.FC<Props> = props => (
    <p>
        スキルを使用すると意念をチャージします。チャージした状態で次の{Constants.time_bound}秒以内に行われる基本攻撃は
        <Value {...props} />の追加スキルダメージを与えます。(クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;