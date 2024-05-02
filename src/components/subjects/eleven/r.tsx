import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    const maxHP = props.status.baseMaxHP.add(props.status.additionalMaxHP);
    return (
        <>
            Elevenが{Constants.R.duration}秒間<Damage skill="R" constants={Constants.R.heal} {...props} />の体力を回復し、
            {Constants.R.tick}秒ごとに周りの敵に<Damage {...props} skill="R" constants={Constants.R.damage} />のスキルダメージを与えます。
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