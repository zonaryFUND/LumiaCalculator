import * as React from "react";
import Constants from "./constants.json";
import Damage, { FormulaContext } from "../damage";
import { Status } from "components/subject/use-status";
import { ValuesProps } from "../values";

const r: React.FC<Status> = status => {
    const formula = React.useContext(FormulaContext)!;

    return (
        <>
            Elevenが{Constants.R.duration}秒間
            {
                formula ? 
                <>{Constants.R.heal[status.skillLevels.R]}％</> :
                <span>{status.maxHP.times(Constants.R.heal[status.skillLevels.R]).dividedBy(100).toString()}</span>
            }
            の体力を回復し、
            {Constants.R.duration}秒ごとに周りの敵に<Damage skill="R" constants={Constants.R.damage} />のスキルダメージを与えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "最大体力比例回復量", values: Constants.R.heal, percent: true},
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
    ]
}