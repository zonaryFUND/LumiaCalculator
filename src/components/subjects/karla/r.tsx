import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        指定した地点に巨大なスピアを設置して{Constants.R.range}m範囲内の敵を鎖で縛って<Damage skill="R" constants={Constants.R.first_damage} {...props} />
        のスキルダメージを与え、移動速度を{Constants.R.slow[props.config.skillLevels.R]}％減少させます。
        {Constants.R.duration}秒間、鎖から抜け出せなかった敵は巨大なスピアに引っ張られ、
        <Damage skill="R" constants={Constants.R.second_damage} {...props} />のスキルダメージを受け、{Constants.R.stun}秒間気絶します。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.first_damage.base},
        {title: "2打ダメージ量", values: Constants.R.second_damage.base},
        {title: "移動速度減少量", values: Constants.R.slow, percent: true},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
