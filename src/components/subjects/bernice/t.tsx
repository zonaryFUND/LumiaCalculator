import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        バニスは基本攻撃をする時、{Constants.T.bullet[props.config.skillLevels.T]}発の弾丸を発射し、基本攻撃の射程距離は変動効果の影響されずに固定されます。<br />
        弾丸は敵に的中した数に比例して
        <Damage skill="T" constants={Constants.T.min_damage} {...props} /> ~ <Damage skill="T" constants={Constants.T.max_damage} {...props} />
        の基本攻撃ダメージを与えます。バニスの致命打攻撃は致命打効果の代わりに弾丸を追加で発射し、的中した敵の数に比例して攻撃力の
        <Damage skill="T" constants={Constants.T.min_second_damage} {...props} /> ~ <Damage skill="T" constants={Constants.T.max_second_damage} {...props} />
        の基本攻撃ダメージを与えます。<br />
        スキルのレベルに応じてリロードの時間が短縮されます。<br />
        現在のリロード時間：{Constants.T.reload[props.config.skillLevels.T]}秒
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