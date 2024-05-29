import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const color = "rgb(255,198,46)"

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マイは基本攻撃をするたびに防御力の{Constants.T.damage.defense[props.skillLevel]}%の追加スキルダメージを与えます。<br />
            <br />
            マイは<span style={{color}}>ミスリルクロップ</span>、<span style={{color}}>アオザイ</span>、
            <span style={{color}}>ファントムジャケット</span>、<span style={{color}}>クチュリエ</span>を製作することができます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "防御力比例ダメージ量", values: Constants.T.damage.defense, percent: true},
    ]
}
