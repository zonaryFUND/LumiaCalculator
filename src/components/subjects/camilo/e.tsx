import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが指定した対象に素早く突進して<Damage skill="E" constants={Constants.E.damage} {...props} />
        のスキルダメージを与えて、{Constants.E.onestep_duration}秒間ワンステップを付与します。<br />
        ワンステップが付与された対象にスキルを再使用すると、対象に素早く移動して<Damage skill="E" constants={Constants.E.second_damage} {...props} />
        のスキルダメージを与え、対象を後ろに押し出した後に距離を広げながら{Constants.E.twostep_duration[props.config.skillLevels.E]}秒間ツーステップを付与します。<br />
        <br />
        ツーステップが付与された対象にはアルコムパスを使用できません。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ワンステップダメージ量", values: Constants.E.damage.base},
        {title: "ツーステップダメージ量", values: Constants.E.second_damage.base},
        {title: "ツーステップデバフ持続時間", values: Constants.E.twostep_duration},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
