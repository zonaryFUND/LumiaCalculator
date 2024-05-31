import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ロッジはスキルを使用した後、{Constants.T.duration}秒以内に基本攻撃をすると二回連続で攻撃して
            <Value skill="T" ratio={Constants.T.first_damage} />と
            <Value skill="T" ratio={Constants.T.second_damage} />の基本攻撃ダメージを与えます。<br />
            <br />
            ロッジはチョコレートが入った食べ物を食べると体力回復量の{Constants.T.food}%のスタミナを回復し、チョコレートが入った飲み物を飲むとスタミナ回復量の
            {Constants.T.drink}%の体力を回復します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "2打攻撃力係数", values: Constants.T.second_damage.attack, percent: true},
    ]
}
