import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        地面に設置した<span className={style.emphasis}>プラズマ爆弾</span>や
        <span className={style.emphasis}>磁力融合爆弾</span>を爆発させ、敵に的中した場合には接続または融合された爆弾1つごとに
        <span className={style.emphasis}>プラズマ爆弾</span>のスキルクールダウンが{Constants.W.q_cooldown_reduction[props.skillLevel]}%減少します。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン減少量", values: Constants.W.q_cooldown_reduction, percent: true}
    ]
}