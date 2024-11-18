import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            同じ敵を{Constants.T.threshold}回攻撃するたびに<Value skill="T" ratio={Constants.T.damage} />
            の追加スキルダメージを与え、移動速度が{Constants.T.movement_speed[props.skillLevel]}%増加した後、
            {Constants.T.duration}秒かけて元通りになります。与えた搾取ダメージ量の
            {Constants.T.heal[props.skillLevel]}%を体力に回復します。野生動物の場合、回復効果が
            {Constants.T.animal}%に減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>搾取は基本攻撃やスキルに関係なく{Constants.T.threshold}回目の攻撃に発動します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "体力回復量(%)", values: Constants.T.heal, percent: true},
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed, percent: true}
    ]
}