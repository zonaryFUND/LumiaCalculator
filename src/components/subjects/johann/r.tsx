import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ヨハンの周りの敵を突き飛ばして<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与え、味方は
        <Value skill="R" ratio={Constants.R.heal} />の体力を回復します。<br />
        <br />
        以降、ヨハンは自分の周りに{Constants.R.duration}秒間聖域を作って味方の防御力を{Constants.R.defense[props.skillLevel]}
        増加させ、毎秒<Value skill="R" ratio={Constants.R.heal_per_sec} />の体力を回復させます。
    </>
);

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        使用中、ヨハンの移動速度が減少します。<br />
        再使用するとスキルをキャンセルできます。
    </>,
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.damage.base},
        {title: "最初の体力回復量", values: Constants.R.heal.base},
        {title: "最初の体力回復量(失った体力比例)", values: Constants.R.heal.targetLostHP, percent: true},
        {title: "持続回復量", values: Constants.R.heal_per_sec.base},
        {title: "防御力増加量", values: Constants.R.defense},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}