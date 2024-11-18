import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import humanq from "./lyanhq";

export default humanq;

export const values: ValuesProps = {
    additionalInfo: <>的中した場合、[侵食]を{Constants.GhostQ.thrash.hit}獲得して、的中しなかった場合には{Constants.GhostQ.thrash.miss}獲得します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.LyAnhQ.damage.base},
        {title: "[締め付ける指先]ダメージ量", values: Constants.GhostQ.damage.base},
        {title: "クールダウン", values: Constants.GhostQ.cooldown},
        {title: "体力消耗量", values: Constants.GhostQ.hp_cost}
    ]
}
