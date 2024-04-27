import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ロッジが銃を乱射して周りの敵に<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与え、{Constants.W.duration}
            秒間防御力を{Constants.W.defense_down[props.config.skillLevels.W]}％、治癒効果を{Constants.W.healing_reduction}％減少させます。<br />
            乱射をする間にはロッジの移動速度が{Constants.W.movement_speed}％増加し、弾丸をリロードします。的中させた対象がいる場合、クールダウンが{Constants.W.cooldown_reduction}秒減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "消費", values: Constants.W.sp_cost},
        {title: "防御力減少量(％)", values: Constants.W.defense_down, percent: true}
    ]
}
