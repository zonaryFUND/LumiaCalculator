import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Decimal from "decimal.js";

const iremq: React.FC<SubjectSkillProps> = props => (
    <>
        スキルを使用すると次の基本攻撃で対象に突進し、<Damage skill="Q" constants={Constants.CatQ.damage} {...props} />
        の追加スキルダメージを与えます。ネコの鈴が付けられた対象は攻撃されると{Constants.CatQ.bind}秒間束縛されます。<br />
        <br />
        以降、{new Decimal(Constants.CatQ.rush.tick).times(Constants.CatQ.rush.amount).toString()}秒間
        {Constants.CatQ.rush.tick}秒ごとに素早く連続攻撃をして範囲内の敵にそれぞれ
        <Damage skill="Q" constants={Constants.CatQ.rush_damage} {...props} />のスキルダメージを与えます。<br />
        連続攻撃される対象が妨害効果を受けている場合、{Constants.CatQ.additional_damage}％の追加スキルダメージを与えます。
    </>
);

export default iremq;

export const values: ValuesProps = {
    additionalInfo: <>使用中基本攻撃の射程距離が増加します。</>,
    parameters: [
        {title: "1打追加ダメージ量", values: Constants.CatQ.damage.base},
        {title: "連続攻撃ダメージ量", values: Constants.CatQ.rush_damage.base},
        {title: "クールダウン", values: Constants.CatQ.cooldown}
    ]
}