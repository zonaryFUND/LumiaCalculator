import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const twoHandedSword: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            {Constants["two-handed_sword"].duration}秒間防御姿勢をとり、すべてのダメージと妨害効果免疫状態になります。その後
            {Constants["two-handed_sword"].dash}m突進し、敵に<Damage skill="D" constants={Constants["two-handed_sword"].damage} {...props} />
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