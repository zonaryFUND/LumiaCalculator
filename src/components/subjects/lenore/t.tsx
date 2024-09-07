import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果：</span>レノアはクールダウン減少ステータスと<span className={style.strong}>悲鳴</span>スタックが
            <span className={style.emphasis}>アッチェレランド</span>に変換されます。レノアは<span className={style.emphasis}>アッチェレランド</span>
            の数値に応じてクールダウン減少が4%で適用されます。<br />
            <br />
            <span className={style.emphasis}>苦痛のメロディー：</span>体力が50%より低い実験体にスキルでダメージを与えると、<Value skill="T" ratio={Constants.T.additional_damage} />
            のスキルダメージを追加で与えて悲鳴スタックを獲得します。同じ敵実験体を攻撃する場合、{Constants.T.target_cooldown[props.skillLevel]}秒ごとに効果が適用されます。<br />
            <br />
            <span className={style.emphasis}>トリル：</span>レノアが基本スキルを使用する時、3回目に使用するスキルが強化されます。<br />
            <br />
            <br />
            <span className={style.emphasis}>現在のアッチェレランド：</span>5
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>釣りでアイテム獲得確率：一般{Constants.T.fishing.common}%/高級{Constants.T.fishing.uncommon}%/レア{Constants.T.fishing.rare}%</>,
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.maxHP, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
