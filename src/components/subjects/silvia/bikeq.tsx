import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアがバイクで旋回し、範囲内の敵に<Damage skill="Q" constants={Constants.BikeQ.damage} {...props} />のスキルダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.BikeQ.damage.base},
        {title: "クールダウン", values: Constants.BikeQ.cooldown}
    ]
}
