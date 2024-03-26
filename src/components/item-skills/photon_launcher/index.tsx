import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => (
    <>
        {props.values.dmg.base}
        {props.values.dmg.ad ? <span className={style.attack}>(+攻撃力の{props.values.dmg.ad}％)</span> : null}
        {props.values.dmg.amp ? <span className={style.amp}>(+スキル増幅の{props.values.dmg.amp}％)</span> : null}
        {props.values.dmg.perLevel ? <span className={style.level}>(+キャラクターレベル*{props.values.dmg.perLevel})</span> : null}
    </>
)

const description: React.FC<Props> = props => (
    <p>
        敵に基本攻撃を的中させるたびにスタックを獲得します。{Constants.max_stack}スタックの時に相手に基本攻撃を命中させると、
        スタックをすべて消耗して<Value {...props} />の追加スキルダメージを与えて追加ダメージの{Constants.lifesteal}％を回復します。
    </p> 
);

export default description;