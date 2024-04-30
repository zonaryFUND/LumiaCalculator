import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const throwWeapon: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した位置に煙幕弾を投げ、爆発させます。煙幕は{Constants.throw.duration}
            秒間維持され、煙幕の中の敵は視界が減少されます。
        </>
    );
}

export default throwWeapon;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.throw.cooldown}
    ]
}