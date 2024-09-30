import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { accelerando } from "./status-override";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { config } = useValueContext()
    return (
        <>
            <span className={style.level}>持続効果：</span>レノアはクールダウン減少ステータスと<span className={style.strong}>悲鳴</span>スタックが
            <span className={style.emphasis}>アッチェレランド</span>に変換されます。レノアは<span className={style.emphasis}>アッチェレランド</span>
            の数値に応じてクールダウン減少が4%で適用されます。<br />
            <br />
            <span className={style.emphasis}>苦痛のメロディー：</span>体力が50%より低い実験体にスキルでダメージを与えると、<Value skill="T" ratio={Constants.T.additional_damage} overrideExpression={{stack: {format: "悲鳴スタック数"}}} />
            のスキルダメージを追加で与えて悲鳴スタックを獲得します。同じ敵実験体を攻撃する場合、{Constants.T.target_cooldown}秒ごとに効果が適用されます。<br />
            <br />
            <span className={style.emphasis}>トリル：</span>レノアが基本スキルを使用する時、3回目に使用するスキルが強化されます。<br />
            <br />
            <br />
            <span className={style.emphasis}>現在のアッチェレランド：</span>{accelerando(config)}
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>
        クールダウン減少ステータス1%あたり1、<span className={style.strong}>悲鳴</span>スタック1あたり{Constants.T.stack_conversion}
        の<span className={style.emphasis}>アッチェレランド</span>に変換されます。
        <span className={style.emphasis}>アッチェレランド</span>{Constants.T.stack_conversion_limit}以上の場合、
        <span className={style.strong}>悲鳴</span>スタックを<span className={style.emphasis}>アッチェレランド</span>数値に変換されません。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.T.additional_damage.base},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
