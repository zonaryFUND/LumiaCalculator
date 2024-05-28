import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：バニスは狩り罠にかかった敵に{Constants.E.mark_duration}
        秒間持続される狩り刻印を付与し、対象の視界を獲得し、対象に向かう時、移動速度が{Constants.E.movement_speed[props.skillLevel]}%増加します。<br />
        狩り刻印対象者に基本攻撃を的中させると、レグショットのクールダウンを{Constants.E.q_cooldown_reduction}秒、投げ縄弾のクールダウンが
        {Constants.E.r_cooldown_reduction}秒減少します。<br />
        <br />
        使用効果：バニスの鷹が上空を飛びながら{Constants.E.duration}秒間バニスの視界を2増加させ、{Constants.E.marking_period}
        秒ごとに周りの敵に{Constants.E.mark_duration}秒間持続する狩り刻印を付与します。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "視界増加量", values: Constants.E.vision},
        {title: "追撃時移動速度(%)", values: Constants.E.movement_speed},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}