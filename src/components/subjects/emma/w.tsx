import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エマが指定した位置へ帽子を投げると、{Constants.W.before_blast}秒後爆発して範囲内の敵に
            <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えます。<br />
            帽子は{Constants.W.duration}秒間残ります。<br />
            <br />
            スキルを的中させるとマジックハットのクールダウンが{Constants.W.cooldown_reduction}%減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
