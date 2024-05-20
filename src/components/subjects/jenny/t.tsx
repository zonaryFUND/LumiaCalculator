import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>演技力</span>：ペルソナスキルで配役を切り替えるたびに追加効果を獲得します。<br />
        <br />
        <span className={style.strong}>赤ワイン</span>：{Constants.T.buff_duration}秒間攻撃速度が{Constants.T.attack_speed[props.skillLevel]}%増加します。<br />
        <span className={style.strong}>ブラックティー</span>：{Constants.T.buff_duration}秒間移動速度が{Constants.T.movement_speed}%増加します。<br />
        <br />
        <span className={style.emphasis}>死の演技</span>：ジェニーの体力が0になると{Constants.T.act_duration}
        秒間、死の演技状態になり、隠密、無敵、ターゲット指定不可の状態になりますが、移動速度が大きく減少します。以降体力を
        <Value skill="T" ratio={Constants.T.hp} />回復して復活します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>死の演技を使用している途中には食べ物以外のアイテムやスキルは使用できません。</>,
    parameters: [
        {title: "最大体力回復量", values: Constants.T.hp.maxHP, percent: true},
        {title: "攻撃速度増加量(%)", values: Constants.T.attack_speed, percent: true},
    ]
}