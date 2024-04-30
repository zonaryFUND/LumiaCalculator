import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const hammer: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した方向へ金槌を叩きつけ、<Damage skill="D" constants={Constants.hammer.damage} {...props} />
            のスキルダメージを与えて{Constants.hammer.defense_decline.duration}秒間防御力を
            {Constants.hammer.defense_decline.effect[level]}％減少させます。
        </>
    );
}

export default hammer;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.hammer.damage.base},
        {title: "防御力減少量(％)", values: Constants.hammer.defense_decline.effect, percent: true},
        {title: "クールダウン", values: Constants.hammer.cooldown},
        {title: "追加攻撃力係数", values: Constants.hammer.damage.additionalAttack, percent: true},
    ]
}