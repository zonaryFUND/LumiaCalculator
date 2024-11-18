import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import lyanhw from "./lyanhw";

export default lyanhw;

export const values: ValuesProps = {
    additionalInfo: <>的中した場合、[侵食]を{Constants.GhostW.thrash.hit}獲得して、的中しなかった場合には{Constants.GhostW.thrash.miss}獲得します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.LyAnhW.damage.base},
        {title: "[血まみれの爪]ダメージ量", values: Constants.GhostW.damage.base}
    ]
}
