import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";

const Value: React.FC<ItemSkillProps> = props => {
    if (props.config && props.status && props.showEquation != true) {
        return (
            <>
                {props.values.dmg.base}
                {props.values.dmg.attack ? <span className={style.attack}>(+{props.status.attackPower.percent(props.values.dmg.attack).toString()})</span> : null}
                {props.values.dmg.amp ? <span className={style.amp}>(+{props.status.skillAmp.percent(props.values.dmg.amp).toString()})</span> : null}
                {props.values.dmg.level ? <span className={style.level}>(+{props.config.level * props.values.dmg.level})</span> : null}
            </>
        )
    } else {
        return (
            <>
                {props.values.dmg.base}
                {props.values.dmg.attack ? <span className={style.attack}>(+攻撃力の{props.values.dmg.attack}％)</span> : null}
                {props.values.dmg.amp ? <span className={style.amp}>(+スキル増幅の{props.values.dmg.amp}％)</span> : null}
                {props.values.dmg.level ? <span className={style.level}>(+キャラクターレベル*{props.values.dmg.level})</span> : null}
            </>
        );
    }
}

const description: React.FC<ItemSkillProps> = props => (
    <p>
        敵に基本攻撃を的中させるたびにスタックを獲得します。{Constants.max_stack}スタックの時に相手に基本攻撃を命中させると、
        スタックをすべて消耗して<Value {...props} />の追加スキルダメージを与えて追加ダメージの{Constants.lifesteal}％を回復します。
    </p> 
);

export default description;