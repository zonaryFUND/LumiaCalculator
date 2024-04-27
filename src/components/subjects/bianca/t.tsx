import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>血流減速</span><br />
        ビアンカは一定時間ごとに基本攻撃で<Damage skill="T" constants={Constants.T.damage} {...props} />のスキルダメージを与えます。ビアンカにスキルダメージを受けた対象は
        {Constants.T.slow.duration}秒間移動速度が{Constants.T.slow.effect[props.config.skillLevels.T]}％減少します。<br />
        <br />
        <span className={style.emphasis}>携帯用血液パック</span><br />
        ビアンカはスキルで与えるダメージの{Constants.T.blood_conversion.skill_damage}％、体力消耗量の{Constants.T.blood_conversion.lost_hp}％の血液を蓄積します。
        <span className={style.emphasis}>血液</span>は自分の最大体力の{Constants.T.max_blood}％まで蓄積できます。ビアンカが非戦闘状態になると
        {Constants.T.blood_heal_tick}秒ごとに最大血液の{Constants.T.blood_consumption}％を消耗して消耗量の
        {Constants.T.blood_heal_ratio}％の体力を回復します。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度減少量(％)", values: Constants.T.slow.effect},
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}