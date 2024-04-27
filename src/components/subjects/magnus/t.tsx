import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マグヌスが敵実験体に基本攻撃を的中させた場合には根性スタック{Constants.T.basic_attack_hit_stack}、スキルを的中させた場合には根性スタック{Constants.T.basic_attack_hit_stack}
            を獲得します。マグヌスは根性スタック1あたり防御力が{Constants.T.defense[props.config.skillLevels.T]}％増加します。(最大{Constants.T.max_stack}スタック)<br />
            最大スタックになるとマグヌスの1秒あたりの体力再生が{Constants.T.hpRegen[props.config.skillLevels.T]}増加します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "防御力増加量(％)", values: Constants.T.defense},
        {title: "体力再生", values: Constants.T.hpRegen}
    ]
}
