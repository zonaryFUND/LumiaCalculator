import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const camera: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            フラッシュを使用して<Damage skill="D" constants={Constants.camera.damage} {...props} />
            のスキルダメージを与えます。自分を見ていた敵は{Constants.camera.additional_damage[level]}
            の追加スキルダメージを受け、{Constants.camera.vision}秒間視界が減少します。
        </>
    );
}

export default camera;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.camera.damage.base},
        {title: "追加ダメージ量", values: Constants.camera.additional_damage},
        {title: "追加攻撃力係数", values: Constants.camera.damage.additionalAttack, percent: true},
        {title: "合計スキル増幅係数", values: Constants.camera.damage.amp, percent: true},
    ]
}