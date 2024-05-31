import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const hammer: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した方向へ金槌を叩きつけ、<Value skill="D" ratio={Constants.hammer.damage} />
            のスキルダメージを与えて{Constants.hammer.defense_decline.duration}秒間防御力を
            {Constants.hammer.defense_decline.effect[props.skillLevel]}%減少させます。
        </>
    );
}

export default hammer;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.hammer.damage.base},
        {title: "防御力減少量(%)", values: Constants.hammer.defense_decline.effect, percent: true},
        {title: "クールダウン", values: Constants.hammer.cooldown},
        {title: "追加攻撃力係数", values: Constants.hammer.damage.additionalAttack, percent: true},
    ]
}