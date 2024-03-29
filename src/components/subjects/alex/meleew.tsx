import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const meleeW: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスが指定した地点にプラズママインを発射して範囲内の敵に<Damage skill="W" constants={Constants.MeleeW.damage} {...props} />のスキルダメージを与え、中心部に引っ張ります。
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