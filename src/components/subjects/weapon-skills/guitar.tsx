import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const guitar: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した方向に音波を発射し、一直線上にいる複数の敵に<Value skill="D" ratio={Constants.guitar.damage} />
            のスキルダメージを与えて移動速度を{Constants.guitar.slow.effect}
            %減少させます。減少された移動速度は{Constants.guitar.slow.duration}秒にわたって元に戻ります。
        </>
    );
}

export default guitar;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.guitar.damage.base},
        {title: "追加攻撃力係数", values: Constants.guitar.damage.additionalAttack, percent: true},
        {title: "合計スキル増幅係数", values: Constants.guitar.damage.amp, percent: true}
    ]
}