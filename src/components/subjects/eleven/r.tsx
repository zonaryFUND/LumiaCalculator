import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            Elevenが{Constants.R.duration}秒間<Value skill="R" ratio={Constants.R.heal} {...props} />の体力を回復し、
            {Constants.R.tick}秒ごとに周りの敵に<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "最大体力比例回復量", values: Constants.R.heal.maxHP, percent: true},
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
    ]
}