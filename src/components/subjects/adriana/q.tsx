import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        アドリアナが指定した方向に{Constants.Q.duration}秒間火炎放射器の炎を発射して
        {Constants.Q.tick}秒ごとに<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与えます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "合計スキル増幅係数", values: Constants.Q.damage.amp, percent: true},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}