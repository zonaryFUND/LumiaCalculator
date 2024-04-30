import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const bat: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            前方の全ての敵に<Damage skill="D" constants={Constants.bat.damage} {...props} />
            のスキルダメージを与え、{Constants.bat.knockback}mノックバックさせます。ノックバックされた敵が壁にぶつかった場合、
            {Constants.bat.stun}秒間気絶します。
        </>
    );
}

export default bat;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.bat.damage.base},
        {title: "合計スキル増幅係数", values: Constants.bat.damage.amp, percent: true},
    ]
}