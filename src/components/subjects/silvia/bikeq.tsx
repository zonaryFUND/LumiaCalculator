import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアがバイクで旋回し、範囲内の敵に<Value skill="Q" ratio={Constants.BikeQ.damage} />のスキルダメージを与えます。
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
