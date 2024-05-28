import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヒョヌが敵を攻撃するたびにドッグファイトスタックを1獲得し、{Constants.T.stack_threshold[props.skillLevel]}
            スタックになるとドッグファイトが活性化されます。次の攻撃は対象に<Value skill="T" ratio={Constants.T.damage} />
            の追加スキルダメージを与え、ヒョヌは<Value skill="T" ratio={Constants.T.heal} />の体力を回復して虚勢のクールダウンが{Constants.T.w_cooldown_reduction}秒減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "体力回復量", values: Constants.T.heal.maxHP, percent: true},
        {title: "活性化カウント", values: Constants.T.stack_threshold}
    ]
}
