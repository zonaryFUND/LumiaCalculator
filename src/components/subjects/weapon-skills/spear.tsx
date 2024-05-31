import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { skillLevel } from "../skill-damage";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const camera: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した方向へ強く槍を突いて{Constants.spear.range}m以内の対象に<Value skill="D" ratio={Constants.spear.damage} />
            のスキルダメージを与え、{Constants.spear.double_range}m以内の敵には同じダメージをもう一度与えて、基本攻撃の射程距離に比例して後ろに押し出します。<br />
            攻撃された対象は{Constants.spear.slow.duration}秒間移動速度が{Constants.spear.slow.effect}%減少します。
        </>
    );
}

export default camera;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.spear.damage.base},
        {title: "追加攻撃力係数", values: Constants.spear.damage.additionalAttack, percent: true},
        {title: "合計スキル増幅係数", values: Constants.spear.damage.amp, percent: true},
        {title: "クールダウン", values: Constants.spear.cooldown},
    ]
}