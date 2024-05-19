import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json"
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        指定した方向にシャマシュの巻物を開きます。シャマシュの巻物に衝突した敵は
        <Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを受けます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}