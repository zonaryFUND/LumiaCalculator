import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：アドリアナはスキルを使用して火炎地帯を作ることができます。<br />
        火炎地帯は範囲内の対象に{Constants.E.tick}秒ごとに<Value skill="E" ratio={Constants.E.damage} />
        のスキルダメージを与えて移動速度を{Constants.E.slow}減少させます。<br />
        <br />
        アドリアナが指定した方向へ突進します。<br />
        アドリアナが移動した経路には{Constants.E.duration}秒間維持される火炎地帯が作られます。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "[火炎地帯]ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}