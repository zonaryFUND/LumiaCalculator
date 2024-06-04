import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ダルコの基本攻撃は{Constants.T.defense.duration}秒間対象の防御力を
        {Constants.T.defense.effect[props.skillLevel]}%盗み取ります。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
    ]
}