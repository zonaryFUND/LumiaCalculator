import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";

export const values: ValuesProps = {
    additionalInfo: <>ブラシストローク(Q)共通効果：スキルを使用すると自動的に次の色に変わります。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base}
    ]
}