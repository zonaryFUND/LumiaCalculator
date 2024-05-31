import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const glove: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した対象に近づき、<Value skill="D" ratio={Constants.glove.damage} />
            の基本攻撃ダメージを与え、最終ダメージの{Constants.glove.additional_damage[props.skillLevel]}
            %に値するダメージと{Constants.glove.true_damage.base[props.skillLevel]}の固定ダメージを追加で与えます。アッパーカットは致命打が発生しません。
        </>
    );
}

export default glove;

export const values: ValuesProps = {
    parameters: [
        {title: "追加ダメージ量", values: Constants.glove.additional_damage, percent: true},
        {title: "固定ダメージ量", values: Constants.glove.true_damage.base},
        {title: "クールダウン", values: Constants.glove.cooldown},
    ]
}