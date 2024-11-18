import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const meleeW: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスが指定した地点にプラズママインを発射して範囲内の敵に<Value skill="W" ratio={Constants.MeleeW.damage} />
        のスキルダメージを与え、中心部に引っ張ります。
    </>
);

export default meleeW;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.MeleeW.damage.base},
        {title: "消費", values: Constants.MeleeW.sp_cost},
        {title: "クールダウン", values: Constants.MeleeW.cooldown},
    ]
}