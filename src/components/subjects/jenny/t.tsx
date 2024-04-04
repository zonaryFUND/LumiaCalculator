import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>演技力</span>：ペルソナスキルで配役を切り替えるたびに追加効果を獲得します。<br />
        <br />
        <span className={style.strong}>赤ワイン</span>：{Constants.T.buff_duration}秒間攻撃速度が{Constants.T.attack_speed[props.config.skillLevels.T]}％増加します。<br />
        <span className={style.strong}>ブラックティー</span>：{Constants.T.buff_duration}秒間移動速度が{Constants.T.movement_speed}％増加します。<br />
        <br />
        <span className={style.emphasis}>死の演技</span>：ジェニーの体力が0になると{Constants.T.act_duration}
        秒間、死の演技状態になり、隠密、無敵、ターゲット指定不可の状態になりますが、移動速度が大きく減少します。以降体力を
        <Damage skill="T" constants={Constants.T.hp} {...props} />回復して復活します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>死の演技を使用している途中には食べ物以外のアイテムやスキルは使用できません。</>,
    parameters: [
        {title: "最大体力回復量", values: Constants.T.hp.maxHP, percent: true},
        {title: "攻撃速度増加量(％)", values: Constants.T.attack_speed, percent: true},
    ]
}