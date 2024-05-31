import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const rapier: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した対象に突進して<Value skill="D" ratio={Constants.rapier.damage} />のスキルダメージを与えます。
        </>
    );
}

export default rapier;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.rapier.damage.base},
        {title: "クールダウン", values: Constants.rapier.cooldown},
        {title: "追加攻撃力係数", values: Constants.rapier.damage.additionalAttack, percent: true},
        {title: "合計スキル増幅係数", values: Constants.rapier.damage.amp, percent: true},
    ]
}