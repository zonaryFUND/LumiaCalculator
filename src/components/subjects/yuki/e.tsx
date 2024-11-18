import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        雪が指定した方向に突進し、最初に対峙した敵に<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与え
        {Constants.E.distance}m移動します。攻撃された対象は{Constants.E.basic_attack_disable}秒間基本攻撃が封鎖され、ダメージを受けた対象がいる場合は打ち落としのクールダウンが{Constants.E.cooldown_reduction}秒減少します。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}