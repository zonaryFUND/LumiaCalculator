import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        アビゲイルの次の基本攻撃は<Damage skill="T" constants={Constants.T.damage} {...props} />
        の追加スキルダメージを与えて対象の防御力を{Constants.T.defense_reduction.duration}秒間
        {Constants.T.defense_reduction.effect[props.config.skillLevels.T]}減少させます。<br />
        スキルを的中させるたびに<span className={style.emphasis}>ティアリングブレード</span>のクールダウンが
        {Constants.T.cooldown_reduction}秒間減少します。<br />
        <br />
        この基本攻撃はスキル攻撃とも見なされます。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "防御力減少量", values: Constants.T.defense_reduction.effect},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}