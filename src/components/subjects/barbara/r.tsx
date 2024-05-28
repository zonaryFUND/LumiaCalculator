import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        バーバラがすべての基本スキルのクールダウンを初期化させ、次に使用する基本スキルに追加効果を与えます。<br />
        <br />
        ショートサーキット：バーバラがセントリーガンを設置し、その位置に瞬間移動します。すでに設置したセントリーガンは自爆して周りに
        <Value skill="R" ratio={Constants.R.Q.blast_damage} />のスキルダメージを与えます。バーバラは瞬間移動しながら敵に
        <Value skill="R" ratio={Constants.R.Q.warp_damage} />のスキルダメージを与えます。ダメージを受けた敵の数に応じて
        {Constants.R.Q.attack_speed.duration}秒間セントリーガンの攻撃速度が{Constants.R.Q.attack_speed.effect}%増加し、オーバークロックのクールダウンが
        {Constants.R.Q.cooldown_reduction}%減少します。<br />
        <br />
        レーザーチャージ：{Constants.R.W.duration}秒間レーザーがチャージされ、その間イオンレーザーとセントリーガンのレールガンのダメージ量が{Constants.R.W.damagen_increase[props.skillLevel]}
        %増加し、スタミナ消耗がなくなってクールダウンが{Constants.R.W.cooldown[props.skillLevel]}減少します。セントリーガンはレーザーチャージ中、基本攻撃がレールガン攻撃に変わります。<br />
        <br />
        超磁力ブラスト：磁力ブラストが少しずつ大きくなり、与えたダメージ量に比例するシールドの生成量が{Constants.R.E.shield_increase[props.skillLevel]}%増加し、持続時間の間受けるダメージが
        {Constants.R.E.damage_reduction}%減少します。スキルを再度使用したり、{Constants.R.E.duration}秒間後になると範囲内の敵は
        <Value skill="E" ratio={Constants.E.finish_damage} />のスキルダメージを受けて{Constants.E.slow.duration}秒間移動速度が{Constants.E.slow.effect[props.skillLevel]}%減少します。<br />
        スキルを再度使用するとオーバークロック状態をキャンセルして3秒後、再び使用できます。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ワープダメージ量", values: Constants.R.Q.warp_damage.base},
        {title: "自縛ダメージ量", values: Constants.R.Q.blast_damage.base},
        {title: "追加ダメージ量", values: Constants.R.W.damagen_increase, percent: true},
        {title: "追加ダメージ保存量(%)", values: Constants.R.E.shield_increase, percent: true},
        {title: "レールガンクールダウン", values: Constants.R.W.cooldown},
        {title: "クールダウン", values: Constants.R.cooldown},
    ]
}