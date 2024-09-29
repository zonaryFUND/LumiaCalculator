import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        バニスは基本攻撃をする時、{Constants.T.bullet[props.skillLevel]}発の弾丸を発射します。<br />
        対象に命中した1発目の弾丸は<Value skill="T" ratio={Constants.T.base_damage} />
        の基本攻撃ダメージを与え、その後の弾丸はそれぞれ<Value skill="T" ratio={Constants.T.additional_damage} />の基本攻撃ダメージを与えます。<br />
        バニスの致命打攻撃は致命打効果の代わりに基本攻撃ダメージ量の{Constants.T.second_damage_multiplier}%に値する弾丸を追加で発射します。<br />
        <br />
        スキルのレベルに応じてリロードの時間が短縮されます。<br />
        現在のリロード時間：{Constants.T.reload[props.skillLevel]}秒
    </>
)

export default t;

export const values: ValuesProps = {
    additionalInfo: <>致命打が発生する場合、追加で発射される弾丸のダメージ量は致命打ダメージ量(%)の数値に応じて増加します。</>,
    parameters: [
        {title: "弾丸数", values: Constants.T.bullet},
        {title: "リロード時間", values: Constants.T.reload}
    ]
}