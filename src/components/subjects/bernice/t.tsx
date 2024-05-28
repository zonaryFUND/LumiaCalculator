import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        バニスは基本攻撃をする時、{Constants.T.bullet[props.skillLevel]}発の弾丸を発射し、基本攻撃の射程距離は変動効果の影響されずに固定されます。<br />
        弾丸は敵に的中した数に比例して
        <Value skill="T" ratio={Constants.T.min_damage} /> ~ <Value skill="T" ratio={Constants.T.max_damage} />
        の基本攻撃ダメージを与えます。バニスの致命打攻撃は致命打効果の代わりに弾丸を追加で発射し、的中した敵の数に比例して攻撃力の
        <Value skill="T" ratio={Constants.T.min_second_damage} /> ~ <Value skill="T" ratio={Constants.T.max_second_damage} />
        の基本攻撃ダメージを与えます。<br />
        スキルのレベルに応じてリロードの時間が短縮されます。<br />
        現在のリロード時間：{Constants.T.reload[props.skillLevel]}秒
    </>
)

export default t;

export const values: ValuesProps = {
    additionalInfo: <>致命打が発生する場合、追加で発射される弾丸のダメージ量は致命打ダメージ量(%)の数値 に応じて増加します。</>,
    parameters: [
        {title: "弾丸数", values: Constants.T.bullet},
        {title: "リロード時間", values: Constants.T.reload}
    ]
}