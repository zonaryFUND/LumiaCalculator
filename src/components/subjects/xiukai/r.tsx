import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        シウカイが{Constants.R.duration}秒間炎を{Constants.R.count}回出して、範囲内の敵に
        <Value skill="R" ratio={Constants.R.damage} />
        のスキルダメージを与えます。炎は敵の移動速度を{Constants.R.slow.duration}秒間{Constants.R.slow.effect[props.skillLevel]}
        %減少させます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "移動速度減少量(%)", values: Constants.R.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.hp_cost}
    ]
}