import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットが対象指定不可状態になって指定した味方に移動し、{Constants.E.shield_duration}秒間
        <Value skill="E" ratio={Constants.E.shield} />のシールドを付与します。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.E.shield.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
