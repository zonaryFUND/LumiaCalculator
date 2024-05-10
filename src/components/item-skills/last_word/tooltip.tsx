import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Damage from "../damage";
import skillDamage from "components/subjects/skill-damage";

const description: React.FC<ItemSkillProps> = props => {
    const value = (() => {
        if (props.config && props.status && props.showEquation != true) {
            const ampValue = skillDamage(props.status, props.config, "item", {amp: Constants.ad.amp});
            return <><span className={style.amp}>({ampValue.toString()})</span>+<span className={style.maxhp}>敵最大体力の{Constants.ad.targetMaxHP}％</span></>;
        } else {
            return <Damage {...props} values={Constants.ad} className={style.amp} />;
        }
    })();

    return (
        <p>
            最後の弾丸で加える基本攻撃が攻撃力が{value}に値する追加スキルダメージを与え、与えたダメージの
            <span className={style.emphasis}>{Constants.lifesteal_ratio}％</span>を体力に回復します。
        </p> 
    );
};

export default description;