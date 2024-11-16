import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const throwWeapon: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した位置に煙幕弾を投げ、爆発させます。煙幕は{Constants.highanglefire.duration}
            秒間維持され、煙幕の中の敵は視界が減少されます。
        </>
    );
}

export default throwWeapon;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.highanglefire.cooldown}
    ]
}