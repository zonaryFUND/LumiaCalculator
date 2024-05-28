import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        バーバラが最大{Constants.E.duration}秒間維持される磁力ブラストを自分とセントリーガンに生成し、範囲内の敵に{Constants.E.tick}秒ごとに
        <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて自分の移動速度を{Constants.E.movement_speed}%増加させます。<br />
        スキルを再度使用したり、持続時間が終わると磁力ブラストが爆発して範囲内の敵に<Value skill="E" ratio={Constants.E.finish_damage} />のスキルダメージを与え、磁力ブラストが維持される間に与えたすべてのダメージ量の
        {Constants.E.shield}%のシールドを獲得します。シールドはバーバラの最大体力の{Constants.E.max_shield}%まで獲得できます。<br />
        バーバラとセントリーガンの磁力ブラスト爆発ダメージを同時に受けた敵は{Constants.E.slow.duration}秒間移動速度が
        {Constants.E.slow.effect[props.skillLevel]}%減少します。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "移動速度減少量(%)", values: Constants.E.slow.effect, percent: true},
        {title: "最大体力追加ダメージ量", values: Constants.E.damage.targetMaxHP, percent: true},
        {title: "2打ダメージ量", values: Constants.E.finish_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}