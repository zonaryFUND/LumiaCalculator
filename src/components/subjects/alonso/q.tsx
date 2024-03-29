import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import skillDamage from "../skill-damage";
import style from "components/tooltip/tooltip.module.styl";
import { ValuesProps } from "../values";

const BasicAttackDamage: React.FC<SubjectSkillProps> = props => {
    const base = (() => {
        if (props.showEquation) {
            return <span className={style.emphasis}>(アロンソのレベル比例{Constants.Q.basic_attack_damage.perLevel})</span>
        } else {
            const damage = skillDamage(props.status, props.config.level, props.config.skillLevels.Q, Constants.Q.basic_attack_damage);
            return <span className={style.emphasis}>{damage.toString()}</span>
        }
    })();

    return (
        <>
            {base}
            <span>(+対象の最大体力の{Constants.Q.basic_attack_damage.targetMaxHP}％)</span>
        </>
    )
}

const q: React.FC<SubjectSkillProps> = props => (
    <>
        前方に磁力の手を突き出して<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        のスキルダメージを与え、的中した敵と<span className={style.emphasis}>磁力線</span>でつなげます。<br />
        <br />
        アロンソが<span className={style.emphasis}>磁力線</span>
        でつながった対象に向かって移動する場合、移動速度が{Constants.Q.movement_speed}
        ％増加し、距離が近いほど最大{Constants.Q.near_movement_speed[props.config.skillLevels.Q]}％まで増加します。<br />
        <br />
        <span className={style.emphasis}>磁力線</span>
        でつながった敵を基本攻撃で攻撃すると磁力線が解除され、<BasicAttackDamage {...props} />
        のスキルダメージを与えて{Constants.Q.stun}秒間気絶させます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "距離比例移動速度増加量", values: Constants.Q.near_movement_speed},
        {title: "磁力線でつながった敵の最大体力ダメージ(％)", values: Constants.Q.basic_attack_damage.targetMaxHP},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}