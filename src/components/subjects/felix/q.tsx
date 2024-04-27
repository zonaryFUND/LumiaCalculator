import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            フェリックスが突進して槍を振り回し、<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。3回目の連携で使用する時には他の効果が適用されます。<br />
            <br />
            <span className={style.emphasis}>3回目の連携</span>：<Damage skill="Q" constants={Constants.Q.enhanced_damage} {...props} />のスキルダメージを与え、
            {Constants.Q.airborne}秒間空中に浮かせます。また、消耗した<span className={style.emphasis}>連携攻撃</span>の1スタックあたり{Constants.Q.stack_damage_conversion[props.config.skillLevels.Q]}
            の固定ダメージを追加で与え、空中に浮かせる時間が{Constants.Q.stack_airborne_extend}秒ずつ増加します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは最後に使用する時のみ壁を超えることができます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "3回目の連携ダメージ量", values: Constants.Q.enhanced_damage.base},
        {title: "連携攻撃比例固定ダメージ量", values: Constants.Q.stack_damage_conversion},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
