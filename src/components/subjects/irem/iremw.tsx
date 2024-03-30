import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const iremw: React.FC<SubjectSkillProps> = props => (
    <>
        イレムが魅力を発散して範囲内の敵の移動速度を{Constants.IremW.slow}％減少させ、
        {Constants.IremW.charge}秒後範囲内の対象に<Damage skill="W" constants={Constants.IremW.damage} {...props} />
        のスキルダメージを与えて{Constants.IremW.charm[props.config.skillLevels.W]}秒間魅惑させます。<br />
        移動速度減少効果は範囲から離れても{Constants.IremW.slow_remain}秒間維持されます。
    </>
);

export default iremw;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.IremW.damage.base},
        {title: "魅惑持続時間", values: Constants.IremW.charm},
        {title: "消費", values: Constants.IremW.sp_cost},
        {title: "クールダウン", values: Constants.IremW.cooldown}
    ]
}