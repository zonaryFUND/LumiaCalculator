import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";
import skillDamage from "components/subjects/skill-damage";

const description: React.FC<ItemSkillProps> = props => {
    const damage = (() => {
        /*
        if (props.config && props.status && props.showEquation != true) {
            return skillDamage(props.status, props.config, "item", props.values.dmg).toString();
        } else {
            return null;
        }
        */
       return null;
    })();
    return (
        <p>
            <span className={style["vf-overflow"]}>VF暴走</span>状態の時、
            戦闘に突入すると秒ごとに周り{Constants.area}mの敵に
            {damage ? <><span className={style.maxhp}>{damage}</span>の</> : null}
            スキルダメージを与えます。<br />
            {damage ? null :  <>敵に<span className={style.maxhp}>最大体力の{props.values.dmg.maxHP}％</span>のスキルダメージを与えます。<br /></>}
            <br />
            <span className={style["vf-overflow"]}>VF暴走</span>状態の場合はブラックマンバキングの<span className={style.strong}>炎の結界</span>のみ発動します。
        </p> 
    )
};

export default description;