import * as React from "react";
import Constants from "./constants.json";
import { Status } from "components/subject/use-status";
import Damage, { FormulaContext } from "../damage";
import { ValuesProps } from "../values";

const q: React.FC<Status> = status => {
    return (
        <>
            アイザックが敵に強く突進して<Damage skill="Q" constants={Constants.Q.damage} />のスキルダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
