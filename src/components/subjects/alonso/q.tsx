import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        前方に磁力の手を突き出して<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与え、的中した敵と<span className={style.emphasis}>磁力線</span>でつなげます。<br />
        <br />
        アロンソが<span className={style.emphasis}>磁力線</span>
        でつながった対象に向かって移動する場合、移動速度が{Constants.Q.movement_speed}
        %増加し、距離が近いほど最大{Constants.Q.near_movement_speed[props.skillLevel]}%まで増加します。<br />
        <br />
        <span className={style.emphasis}>磁力線</span>
        でつながった敵を基本攻撃で攻撃すると磁力線が解除され、
        <Value skill="Q" ratio={Constants.Q.basic_attack_damage} overrideExpression={{level: {format: "(アロンソのレベル比例{ratio})", className: style.emphasis}}} />
        のスキルダメージを与えて{Constants.Q.stun}秒間気絶させます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "距離比例移動速度増加量", values: Constants.Q.near_movement_speed},
        {title: "磁力線でつながった敵の最大体力ダメージ(%)", values: Constants.Q.basic_attack_damage.targetMaxHP},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}