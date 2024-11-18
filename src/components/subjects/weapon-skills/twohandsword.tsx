import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const twoHandedSword: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            {Constants["twohandsword"].duration}秒間防御姿勢をとり、すべてのダメージと妨害効果免疫状態になります。その後
            {Constants["twohandsword"].dash}m突進し、敵に<Value skill="D" ratio={Constants["twohandsword"].damage} />
            のスキルダメージを与えます。
        </>
    );
}

export default twoHandedSword;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants["twohandsword"].damage.base},
        {title: "追加攻撃力係数", values: Constants["twohandsword"].damage.additionalAttack, percent: true},
    ]
}