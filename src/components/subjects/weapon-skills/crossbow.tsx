import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const crossbow: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した方向へ石弓を撃ちます。撃たれた対象は<Damage skill="D" constants={Constants.crossbow.damage} {...props} />
            のスキルダメージを受けて押し出されます。対象が壁にぶつかったら{Constants.crossbow.stun}秒間気絶し、
            <Damage skill="D" constants={Constants.crossbow.damage} {...props} />のスキルダメージを追加で与えます。
        </>
    );
}

export default crossbow;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.crossbow.damage.base},
        {title: "追加攻撃力係数", values: Constants.crossbow.damage.additionalAttack, percent: true},
        {title: "クールダウン", values: Constants.crossbow.cooldown},
    ]
}