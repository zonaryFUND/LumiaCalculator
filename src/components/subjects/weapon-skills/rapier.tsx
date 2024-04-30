import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const rapier: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した対象に突進して<Damage skill="D" constants={Constants.rapier.damage} {...props} />のスキルダメージを与えます。
        </>
    );
}

export default rapier;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.rapier.damage.base},
        {title: "クールダウン", values: Constants.rapier.cooldown},
        {title: "追加攻撃力係数", values: Constants.rapier.damage.additionalAttack, percent: true},
        {title: "合計スキル増幅係数", values: Constants.rapier.damage.amp, percent: true},
    ]
}