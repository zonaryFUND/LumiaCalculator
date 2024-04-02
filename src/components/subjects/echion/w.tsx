import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import { SubjectConfig } from "components/subject/use-subject-config";
import Decimal from "decimal.js";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        エキオンが最大{Constants.W.gauge_max_consumption}のVFゲージを消耗して自分の身体を保護する
        <Damage skill="W" constants={Constants.W.shield} {...props} />のシールドを生成します。消耗したVFの
        {Constants.W.multiplier}％の分、シールドの吸収量が増加します。<br />
        生成されたシールドの{Constants.W.return_threshold}％以上のダメージを吸収すると、消耗したVFゲージの
        {Constants.W.return_gauge[props.config.skillLevels.W]}％が返されます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.W.shield.base},
        {title: "回収VFゲージ(％)", values: Constants.W.return_gauge, percent: true},
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