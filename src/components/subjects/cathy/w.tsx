import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        キャッシーが前方にノコギリを大きく振り回します。内側の範囲に的中された敵には<Value skill="W" ratio={Constants.W.inner_damage} />
        のスキルダメージを与えますが、外傷スタックは与えません。外側の範囲に的中された敵は
        <Value skill="W" ratio={Constants.W.outer_damage} />のスキルダメージを与えられ、
        {Constants.W.slow.duration}秒間移動速度が{Constants.W.slow.effect}%減少されます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.inner_damage.base},
        {title: "強化されたダメージ量", values: Constants.W.outer_damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}