import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            フィオラは敵にスキルを的中させるたびにトゥシェ刻印を敵に付与することができます。トゥシェ刻印がムスタックになった敵をスキルで的中させた場合、敵に
            <Value skill="T" ratio={Constants.T.damage} />のスキルダメージを追加で与え、フィオラの移動速度が{Constants.T.movement_speed.duration}
            秒間{Constants.T.movement_speed.effect[props.skillLevel]}%増加しては徐々に減少します。フィオラの
            <span className={style.emphasis}>ファント</span>のクールダウンは{Constants.T.q_cooldown_reduction}
            %減少し、他の基本スキルの残ったクールダウンは{Constants.T.cooldown_reduction}%減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed.effect, percent: true}
    ]
}
