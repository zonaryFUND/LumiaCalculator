import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json"
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>発掘統裁</span>
        ：アルダが生命の木、隕石の採取を始めると自分の周りの領域内の敵を沈黙させるエリアを生成します。生成されたエリアは採取中持続されます。<br />
        <br />
        <span className={style.emphasis}>考古学的分析</span>：アルダが使用する遺物が敵にダメージを与えるとアルダは
        <span className={style.emphasis}>古代の精髄</span>を獲得します。
        <span className={style.emphasis}>古代の精髄</span>を{Constants.T.max_stack[props.skillLevel]}
        獲得するとランタンから神秘的な力が放出し、自分と周りの味方の体力を<Value skill="T" ratio={Constants.T.heal} />回復させます。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>発掘統裁で生成した沈黙エリアは野生動物やボスモンスターには沈黙効果を与えません。</>,
    parameters: [
        {title: "体力回復量", values: Constants.T.heal.base},
        {title: "[考古学的分析]必要精髄スタック", values: Constants.T.max_stack}
    ]
}