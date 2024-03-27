import * as React from "react";
import Constants from "./constants.json";
import { Status } from "components/subject/use-status";
import { ValuesProps } from "../values";
import Damage from "../damage";

const t: React.FC<Status> = status => {
    return (
        <>
            同じ敵を{Constants.T.threshold}回攻撃するたびに<Damage skill="T" constants={Constants.T.damage} />の
            追加スキルダメージを与え、移動速度が{Constants.T.movement_speed[status.skillLevels.T]}％増加した後、
            {Constants.T.duration}秒かけて元通りになります。
            与えた搾取ダメージ量の{Constants.T.heal[status.skillLevels.T]}％を体力に回復します。
            野生動物の場合、回復効果が{Constants.T.animal}％に減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>搾取は基本攻撃やスキルに関係なく{Constants.T.threshold}回目の攻撃に発動します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "体力回復量(％)", values: Constants.T.heal, percent: true},
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed, percent: true}
    ]
}