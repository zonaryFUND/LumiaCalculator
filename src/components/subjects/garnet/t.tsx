import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            苦痛に慣れているガーネットは、受ける基本攻撃ダメージが<Value skill="T" ratio={Constants.T.reduction} />減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "基本攻撃ダメージ減少量", values: Constants.T.reduction.base}
    ]
}
