import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const glove: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した対象に近づき、<Damage skill="D" constants={Constants.glove.damage} {...props} />
            の基本攻撃ダメージを与え、最終ダメージの{Constants.glove.additional_damage[level]}
            %に値するダメージと{Constants.glove.true_damage.base[level]}の固定ダメージを追加で与えます。アッパーカットは致命打が発生しません。
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