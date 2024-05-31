import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const twoHandedSword: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            {Constants["two-handed_sword"].duration}秒間防御姿勢をとり、すべてのダメージと妨害効果免疫状態になります。その後
            {Constants["two-handed_sword"].dash}m突進し、敵に<Value skill="D" ratio={Constants["two-handed_sword"].damage} />
            のスキルダメージを与えます。
        </>
    );
}

export default twoHandedSword;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants["two-handed_sword"].damage.base},
        {title: "追加攻撃力係数", values: Constants["two-handed_sword"].damage.additionalAttack, percent: true},
    ]
}