import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：基本攻撃をするたびにこのスキルのクールダウンが
        {Constants.E.cooldown_reduction}秒減少し、{Constants.E.count}回目の基本攻撃は
        <Value skill="E" ratio={Constants.E.damage} />の追加スキルダメージを与えます。<br />
        この効果はペルソナスキルを使用するとすぐに活性化します。<br />
        <br />
        <span className={style.level}>使用効果</span>：ジェニーが指定した方向へ短い距離を移動して配役を切り替え、追加スキルダメージ効果を活性化させます。<br />
        <br />
        このスキルはクールダウン減少ステータスの影響を受けません。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>設置されていたスポットライトとレッドカーペットの効果は変わりません。</>,
    parameters: [
        {title: "クールダウン", values: Constants.E.cooldown.constant},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "追加ダメージ量", values: Constants.E.damage.base}
    ]
}