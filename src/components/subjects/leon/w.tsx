import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レオンが自分と周りの味方にシールドを付与します。シールドは秒間レオンに<Value skill="W" ratio={Constants.W.shield} />のダメージを吸収するシールドを付与し、周りの味方には
            <Value skill="W" ratio={Constants.W.ally_shield} />のダメージを吸収するシールドを付与します。シールドが消える時、その場に水溜りを生成します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.W.shield.base},
        {title: "味方のシールド吸収量", values: Constants.W.ally_shield.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
