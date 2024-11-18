import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>アルティジャナート</span>：タジアは<span className={style.emphasis}>ガラス破片</span>
        を破壊するたび{Constants.T.collection_duration}秒間持続する<span className={style.emphasis}>ガラス塊</span>を1スタック獲得します。
        <span className={style.emphasis}>ガラス塊</span>が{Constants.T.collection_max}スタックになるとガラス剣を作り上げます。<br />
        <br />
        <span className={style.emphasis}>ディフェットーゾ</span>：タジアは一定時間ごとに基本攻撃で
        <Value skill="T" ratio={Constants.T.damage} />のスキルダメージを与えます。この基本攻撃が的中した位置には
        <span className={style.emphasis}>ガラス破片</span>が生成されます。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}