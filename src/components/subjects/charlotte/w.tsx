import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットが治癒の光で体力の割合が最も低い味方と自分の体力を<Value skill="W" ratio={Constants.W.heal} />回復させます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.heal.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
