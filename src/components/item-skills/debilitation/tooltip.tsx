import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import skillDamage from "components/subjects/skill-damage";

const Value: React.FC<ItemSkillProps> = props => {
    /*
    if (props.status && props.config && props.showEquation != true) {
        const value = skillDamage(props.status, props.config, "item", {amp: Constants.dmg.targetMaxHP.base});
        return (
            <span className={style.maxhp}>
                対象の最大体力の{Constants.dmg.targetMaxHP.base}<span className={style.amp}>(+{value.toString()})</span>%
            </span>
        );
    } else {
        */
        return (
            <span className={style.maxhp}>
                対象の最大体力の{Constants.dmg.targetMaxHP.base}<span className={style.amp}>(+スキル増幅の{Constants.dmg.targetMaxHP.amp}%)</span>%
            </span>
        );
    //}
}

const description: React.FC<ItemSkillProps> = props => (
    <p>
        スキル攻撃を的中した場合、敵に毎秒<Value {...props} />のスキルダメージを与えるデバフ効果を{Constants.duration}秒間付与します。
        (最大{Constants.max_stack}スタック)
    </p> 
);

export default description;