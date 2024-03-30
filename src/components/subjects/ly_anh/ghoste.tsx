import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import lyanhe from "./lyanhe"

export default lyanhe;

export const values: ValuesProps = {
    additionalInfo: <>的中した場合、[侵食]を{Constants.GhostE.thrash.hit}獲得して、的中しなかった場合には{Constants.GhostE.thrash.miss}獲得します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.LyAnhE.damage.base},
        {title: "[切り裂く手]振り下ろしダメージ量", values: Constants.GhostE.first_damage.base},
        {title: "[切り裂く手]引き寄せダメージ量", values: Constants.GhostE.second_damage.base},
        {title: "クールダウン", values: Constants.GhostE.cooldown},
        {title: "体力消耗量", values: Constants.GhostE.hp_cost}
    ]
}
