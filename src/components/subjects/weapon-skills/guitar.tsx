import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const guitar: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した方向へ音波を投げて最初に当たった対象に<Damage skill="D" constants={Constants.guitar.damage} {...props} />
            のスキルダメージを与えます。<br />
            音波に当たった対象は音に魅了され{Constants.guitar.charm[level]}秒間音波を投げた対象に移動します。
        </>
    );
}

export default guitar;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.guitar.damage.base},
        {title: "追加攻撃力係数", values: Constants.guitar.damage.additionalAttack, percent: true},
        {title: "合計スキル増幅係数", values: Constants.guitar.damage.amp, percent: true},
        {title: "魅惑持続時間", values: Constants.guitar.charm},
    ]
}