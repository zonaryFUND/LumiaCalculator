import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const whip: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            鞭を2回振り回し、1回あたり<Damage skill="D" constants={Constants.whip.damage} {...props} />
            のスキルダメージを与えて、敵の移動速度を{Constants.whip.slow.duration}秒間
            {Constants.whip.slow.effect[level]}%減少させます。
        </>
    );
}

export default whip;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.whip.damage.base},
        {title: "クールダウン", values: Constants.whip.cooldown},
        {title: "移動速度減少量(%)", values: Constants.whip.slow.effect, percent: true},
    ]
}