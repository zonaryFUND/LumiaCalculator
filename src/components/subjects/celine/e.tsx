import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
    衝撃波爆弾を指定した位置に投げ、範囲内の敵と自分を突き飛ばして<Value skill="E" ratio={Constants.E.damage} />
    のスキルダメージを与えます。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown.constant}
    ]
}