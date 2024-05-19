import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        アビゲイルがデスサイズを振り回します。1回目の回転は
        <Value skill="Q" ratio={Constants.Q.first_damage} />
        のスキルダメージを与え、2回目の回転は<Value skill="Q" ratio={Constants.Q.second_damage} />
        のスキルダメージを与えます。バイナリスピンをキャストするときは移動速度が
        {Constants.Q.movement_speed.duration}秒間
        {Constants.Q.movement_speed.effect}%増加します。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.Q.first_damage.base},
        {title: "2打ダメージ量", values: Constants.Q.second_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}