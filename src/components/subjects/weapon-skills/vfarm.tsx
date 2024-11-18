import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const vfProsthetic: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エキオンが{Constants.vfarm.cast}秒間スキルをキャストします。VFゲージの状態に応じて効果が適用されます。<br />
            <br />
            <span className={style.emphasis}>VFゲージ50未満</span>：{Constants.vfarm.charge_gauge}のゲージをチャージします。<br />
            <br />
            <span className={style.emphasis}>VFゲージ50以上</span>：ゲージ{Constants.vfarm.gauge_consumption}
            を消耗して、武器スキルを除いたスキルクールダウンを{Constants.vfarm.cooldown_reduction}%減少させて移動速度が
            {Constants.vfarm.movement_speed.duration}秒間{Constants.vfarm.movement_speed.effect}%増加します。<br />
            <br />
            <span className={style.emphasis}>VF暴走状態</span>：暴走持続時間を{Constants.vfarm.extend[props.skillLevel]}
            秒延長して、スキルクールダウンを{Constants.vfarm.cooldown_reduction}%減少させて移動速度が
            {Constants.vfarm.movement_speed.duration}秒間{Constants.vfarm.movement_speed.effect}%増加します。<br />
            <br />
            <span className={style.emphasis}>オーバーロード状態</span>：オーバーロード状態を
            {Constants.vfarm.overload_reduction[props.skillLevel]}秒減少させます。
        </>
    );
}

export default vfProsthetic;

export const values: ValuesProps = {
    parameters: [
        {title: "VF暴走持続時間増加量", values: Constants.vfarm.extend},
        {title: "オーバーロード持続時間減少量", values: Constants.vfarm.overload_reduction}
    ]
}