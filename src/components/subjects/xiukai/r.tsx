import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        シウカイが{Constants.R.duration}秒間炎を{Constants.R.count}回出して、範囲内の敵に
        <Damage skill="R" constants={Constants.R.damage} {...props} />
        のスキルダメージを与えます。炎は敵の移動速度を{Constants.R.slow.duration}秒間{Constants.R.slow.effect[props.config.skillLevels.R]}
        ％減少させます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "移動速度減少量(％)", values: Constants.R.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.hp_cost}
    ]
}