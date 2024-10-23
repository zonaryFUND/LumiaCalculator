import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ユミンが空から鶴を召喚して<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与え、{Constants.R.slow.duration}秒間移動速度を{Constants.R.slow.effect}%減少させます。<br />
        <br />
        鶴は{Constants.R.second_attack}秒後、再び飛び上がり、<Value skill="R" ratio={Constants.R.second_damage} />のスキルダメージを与え、{Constants.R.airborne}秒間空中に浮かせます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.damage.base},
        {title: "2打ダメージ量", values: Constants.R.second_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}