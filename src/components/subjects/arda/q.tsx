import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json"
import { ValuesProps } from "../values";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        指定した方向にシャマシュの巻物を開きます。シャマシュの巻物に衝突した敵は
        <Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを受けます。
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