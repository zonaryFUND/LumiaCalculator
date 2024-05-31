import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const crossbow: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した方向へ石弓を撃ちます。撃たれた対象は<Value skill="D" ratio={Constants.crossbow.damage} />
            のスキルダメージを受けて押し出されます。対象が壁にぶつかったら{Constants.crossbow.stun}秒間気絶し、
            <Value skill="D" ratio={Constants.crossbow.damage} />のスキルダメージを追加で与えます。
        </>
    );
}

export default crossbow;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.crossbow.damage.base},
        {title: "追加攻撃力係数", values: Constants.crossbow.damage.additionalAttack, percent: true},
        {title: "クールダウン", values: Constants.crossbow.cooldown},
    ]
}