import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：アドリアナはスキルを使用して火炎地帯を作ることができます。<br />
        火炎地帯は範囲内の対象に{Constants.E.tick}秒ごとに<Damage skill="E" constants={Constants.E.damage} {...props} />
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