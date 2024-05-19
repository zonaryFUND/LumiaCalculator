import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const cate: React.FC<SubjectSkillProps> = props => (
    <>
        イレムが跳躍して着地する時、範囲内の敵に<Value skill="E" ratio={Constants.CatE.damage} />のスキルダメージを与えます。<br />
        ＜お魚＞に向かって跳躍するとより遠くまで移動できます。
    </>
);

export default cate;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.CatE.damage.base},
        {title: "消費", values: Constants.CatE.sp_cost},
        {title: "クールダウン", values: Constants.CatE.cooldown}
    ]
}