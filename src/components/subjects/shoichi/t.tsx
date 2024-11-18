import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            彰一が敵にスキルを的中させると5秒間不当利得のスタックを獲得します。(最大{Constants.T.max_stack}スタック)<br />
            スタックが最大になると、次の基本攻撃が<Value skill="T" ratio={Constants.T.basic_attack_damage} />の追加スキルダメージを与えて敵の後ろに短剣を生成します。<br />
            <br />
            彰一が短剣を拾う時、{Constants.T.knife_range}m以内に敵がいる場合、短剣を投げて<Value skill="T" ratio={Constants.T.knife_damage} />のスキルダメージを与えます。協商刻印が与えられた対象を優先して短剣を投げます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.basic_attack_damage.base},
        {title: "最大体力係数", values: Constants.T.basic_attack_damage.targetMaxHP},
        {title: "短剣被害量", values: Constants.T.knife_damage.base}
    ]
}
