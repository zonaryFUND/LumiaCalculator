import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ビアンカがキャストをしながら、最大{Constants.W.max_duration}秒間しばらく棺の中に身を隠します。<br />
        棺の中にいる間、ビアンカの受けるダメージが{Constants.W.damage_reduction[props.skillLevel]}%減少して
        {Constants.W.heal_tick}秒ごとに最大体力{Constants.W.heal.maxHP}%だけの体力を回復します。<br />
        <span className={style.emphasis}>血液</span>を最大保存量の{Constants.W.enhance_threshold}%以上蓄積すると、<span className={style.emphasis}>短い安息</span>のクールダウンがすぐに初期化されます。<br />
        <br />
        <span className={style.emphasis}>短い安息</span>を使用する時、<span className={style.emphasis}>血液</span>保存量が{Constants.W.enhance_threshold}%以上の場合にはすべての
        <span className={style.emphasis}>血液</span>を消耗して体力回復量が<span className={style.emphasis}>血液</span>消耗量に比例して増加し、
        {Constants.W.cooldown_reduction.per}秒ごとに<span className={style.emphasis}>短い安息</span>と武器スキル以外のスキルクールダウンが
        {Constants.W.cooldown_reduction.value}秒ずつ減少します。
    </>
)

export default w;

export const values: ValuesProps = {
    additionalInfo: <>短い安息使用中には真祖の君臨と循環が使用でき、準備動作が敵に見えません。</>,
    parameters: [
        {title: "ダメージ量減少(%)", values: Constants.W.damage_reduction},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}