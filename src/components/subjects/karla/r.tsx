import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        指定した地点に巨大なスピアを設置して{Constants.R.range}m範囲内の敵を鎖で縛って<Value skill="R" ratio={Constants.R.first_damage} />
        のスキルダメージを与え、移動速度を{Constants.R.slow[props.skillLevel]}%減少させます。
        {Constants.R.duration}秒間、鎖から抜け出せなかった敵は巨大なスピアに引っ張られ、
        <Value skill="R" ratio={Constants.R.second_damage} />のスキルダメージを受け、{Constants.R.stun}秒間気絶します。
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
