import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラはスキル使用後、次の基本攻撃の攻撃速度が{}%増加し、対象周辺に扇形範囲で<Value skill="T" ratio={Constants.T.damage} />のスキルダメージを与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>使用中、基本攻撃の射程距離が少し増加します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base}
    ]
}
