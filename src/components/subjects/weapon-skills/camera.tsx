import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const camera: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            フラッシュを使用して<Value skill="D" ratio={Constants.camera.damage} />
            のスキルダメージを与えます。自分を見ていた敵は{Constants.camera.additional_damage[props.skillLevel]}
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