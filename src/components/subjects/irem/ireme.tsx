import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const ireme: React.FC<SubjectSkillProps> = props => (
    <>
        イレムが指定した方向に短く移動し、元の位置に＜お魚＞を生成します。
    </>
);

export default ireme;

export const values: ValuesProps = {
    parameters: [
        {title: "消費", values: Constants.IremE.sp_cost},
        {title: "クールダウン", values: Constants.IremE.cooldown}
    ]
}