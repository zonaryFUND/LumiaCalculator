import { Status } from "components/subject/use-status";
import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";

const w: React.FC<Status> = status => (
    <>
        アイソルが{Constants.W.duration}秒間前方に銃を乱射して
        {Constants.W.tick}ごとに<Damage skill="W" constants={Constants.W.damage} />のスキルダメージを与え、
        対象の防御力を{Constants.W.defense_decline[status.skillLevels.W]}ずつ減少させます。
        防御力減少は{Constants.W.defense_decline_duration}秒間維持され、
        最大{Constants.W.defense_decline_max}回まで適用されます。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>
        火網は敵の設置物にダメージを与えることができます
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "防御力減少量", values: Constants.W.defense_decline},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost},
    ]
}