import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        エキオンが最大{Constants.W.gauge_max_consumption}のVFゲージを消耗して自分の身体を保護する
        <Value skill="W" ratio={Constants.W.shield} />のシールドを生成します。消耗したVFの
        {Constants.W.multiplier}%の分、シールドの吸収量が増加します。<br />
        生成されたシールドの{Constants.W.return_threshold}%以上のダメージを吸収すると、消耗したVFゲージの
        {Constants.W.return_gauge[props.skillLevel]}%が返されます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.W.shield.base},
        {title: "回収VFゲージ(%)", values: Constants.W.return_gauge, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown},
    ]
}

export function cooldownOverride(config: SubjectConfig): (base: Decimal) => Decimal {
    if (config.equipment.weapon?.includes("sidewinder")) {
        return v => v.times(100 - Constants.T1_2.w_cooldown_reduction).dividedBy(100);
    } else {
        return v => v;
    }
}