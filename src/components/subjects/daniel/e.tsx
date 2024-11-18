import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        ダニエルが前に素早く突進して、{Constants.E.duration}秒間シャドーグライド状態になります。シャドーグライド状態では基本攻撃の射程距離が
        {Constants.E.basic_attack_range}mに固定され、敵を基本攻撃するとダニエルは敵の後ろ側に瞬間移動して
        <Value skill="W" ratio={Constants.E.damage} />のスキルダメージを追加で与えます。
    </>
)

export default e;

export const values: ValuesProps = {
    additionalInfo: <>この基本攻撃はスキル攻撃とも見なされます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}