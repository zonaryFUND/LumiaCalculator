import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            プリヤが3回連続で演奏しながら、範囲内の敵にそれぞれ<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。2回ダメージを受けた対象は
            {Constants.E.slow.duration}秒間移動速度が{Constants.E.slow.effect}%減少され、3回ダメージを受けた対象は{Constants.E.bind}秒間束縛されます。<br />
            <br />
            演奏中、移動速度が{Constants.E.movement_speed}%増加し、大地の響きスキル以外のすべてのスキルが使用できます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
