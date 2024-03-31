import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        エキオンがスキルで敵にダメージを与えると{Constants.T3_2.attack_speed_duration}秒間
        {Constants.R3.attack_speed[props.config.skillLevels.R]}％の攻撃速度が増加する「戦闘狂」スタックを1獲得します。VF暴走状態の基本攻撃は
        <Damage skill="T" constants={Constants.T3_2.damage} {...props} />の基本攻撃ダメージを連続で与え、エンベノミゼーション(R)を使用しながら移動できます。<br />
        <br />
        デスアダー系の武器はVF暴走状態で<span className={style.strong}>意念</span>効果が発動します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>強化したそれぞれの武器の効果はVF暴走(R)スキルのレベルに応じて増加します。</>,
    parameters: []
}