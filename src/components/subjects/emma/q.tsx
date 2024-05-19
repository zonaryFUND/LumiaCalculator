import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エマが指定した方向へカードを飛ばして敵に<Value skill="Q" ratio={Constants.Q.damage} />
            のスキルダメージを与え、自分の位置に鳩を{Constants.Q.duration}秒間残します。<br />
            エマがカードを飛ばす時、鳩が近くにいる場合には鳩がカードになって飛んでいき、エマのカードと同じダメージを与えます。<br />
            <br />
            エマが飛ばしたカードに敵が的中すると助手の鳩さんのクールダウンが{Constants.Q.cooldown_reduction}%減少します。<br />
            <br />
            エマと鳩のカードが一つの対象に両方的中すると、対象の移動速度が{Constants.Q.slow.duration}秒間{Constants.Q.slow.effect}%減少します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
