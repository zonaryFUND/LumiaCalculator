import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノックスが後ろから前へと鞭を振って、範囲内の敵に<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えて突き飛ばした後、対象の移動速度を
            {Constants.E.slow.duration}秒間{Constants.E.slow.effect[props.config.skillLevels.E]}％減少させます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "移動速度減少量(％)", values: Constants.E.slow.effect, percent: true},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
