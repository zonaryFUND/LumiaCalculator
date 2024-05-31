import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノックスが後ろから前へと鞭を振って、範囲内の敵に<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて突き飛ばした後、対象の移動速度を
            {Constants.E.slow.duration}秒間{Constants.E.slow.effect[props.skillLevel]}%減少させます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "移動速度減少量(%)", values: Constants.E.slow.effect, percent: true},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
