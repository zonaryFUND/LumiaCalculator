import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ダニエルが指定した敵実験体にインスピレーション刻印を付与します。<br />
        ダニエルは刻印が付与された敵の周辺{Constants.W.vision_range}mの視界を獲得します。<br />
        刻印を付与された敵はダニエルに攻撃されるまで視界が{Constants.W.vision_decrease}減少し、{Constants.W.duration}
        秒間ダニエルが与えたダメージ量の{Constants.W.stored_damage[props.skillLevel]}%を保存します。<br />
        インスピレーション刻印が{Constants.W.duration}秒間維持された敵はインスピレーションの対象となります。ダニエルがインスピレーションの対象を
        {Constants.W.blast_duration}秒以内に攻撃すると、刻印が爆発して保存されたダメージ量の分の固定ダメージと
        <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与え、
        {Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}%減少させます。<br />
        ダニエルと敵の距離が{Constants.W.max_distance}m以上離れると刻印は消えます。<br />
        <br />
        このスキルはクマ以外のボスモンスターにも使用できます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ保存量(%)", values: Constants.W.stored_damage, percent: true},
        {title: "ダメージ量", values: Constants.W.damage.base},
    ]
}