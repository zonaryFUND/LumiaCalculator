import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { skillLevel } from "../skill-damage";

const vfProsthetic: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            エキオンが{Constants.vf_prosthetic.cast}秒間スキルをキャストします。VFゲージの状態に応じて効果が適用されます。<br />
            <br />
            <span className={style.emphasis}>VFゲージ50未満</span>：{Constants.vf_prosthetic.charge_gauge}のゲージをチャージします。<br />
            <br />
            <span className={style.emphasis}>VFゲージ50以上</span>：ゲージ{Constants.vf_prosthetic.gauge_consumption}
            を消耗して、武器スキルを除いたスキルクールダウンを{Constants.vf_prosthetic.cooldown_reduction}%減少させて移動速度が
            {Constants.vf_prosthetic.movement_speed.duration}秒間{Constants.vf_prosthetic.movement_speed.effect}%増加します。<br />
            <br />
            <span className={style.emphasis}>VF暴走状態</span>：暴走持続時間を{Constants.vf_prosthetic.extend[level]}
            秒延長して、スキルクールダウンを{Constants.vf_prosthetic.cooldown_reduction}%減少させて移動速度が
            {Constants.vf_prosthetic.movement_speed.duration}秒間{Constants.vf_prosthetic.movement_speed.effect}%増加します。<br />
            <br />
            <span className={style.emphasis}>オーバーロード状態</span>：オーバーロード状態を
            {Constants.vf_prosthetic.overload_reduction[level]}秒減少させます。
        </>
    );
}

export default vfProsthetic;

export const values: ValuesProps = {
    parameters: [
        {title: "VF暴走持続時間増加量", values: Constants.vf_prosthetic.extend},
        {title: "オーバーロード持続時間減少量", values: Constants.vf_prosthetic.overload_reduction}
    ]
}