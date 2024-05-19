import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json"
import { ValuesProps } from "../values";
import style from "components/tooltip/item/item-tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アルダが遺物に秘められた起源を解読し、元の能力を復元します。
        {Constants.R.duration}秒間次に使用する一般スキルを強化させます。<br />
        <br />
        <span className={style.emphasis}>シャマシュの法典</span>
        ：指定した方向にシャマシュの法典を開きます。シャマシュの法典は衝突した敵に<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与えて法典の文字を残し、{Constants.R.Q.second_time}秒後法典の上の敵に
        <Value skill="R" ratio={Constants.R.Q.damage} />のスキルダメージを与えます。<br />
        <br />
        <span className={style.emphasis}>シャマシュの法典</span>を使用すると
        <span className={style.emphasis}>秘められた力</span>のクールダウンの{Constants.R.Q.cooldown_reduction}%が返されます。<br />
        <br />
        <span className={style.emphasis}>バビロンのさいころ</span>
        ：指定した地点にバビロンのさいころを召喚して境界線に障壁を作り、障壁に触れた敵を{Constants.R.W.bind[props.skillLevel]}
        秒間束縛させます。<br />
        障壁は{Constants.R.W.duration}秒間時計回りの順番で破壊されながら敵に
        <Value skill="R" ratio={Constants.R.W.damage} />のスキルダメージを与え、さいころの領域内の敵には
        <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えて
        {Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}%減少させます。<br />
        すべての障壁が破壊されるとバビロンのさいころは消え、領域内の敵に
        <Value skill="W" ratio={Constants.W.vanish_damage} />のスキルダメージを与えて
        {Constants.W.stun}秒間気絶させます。<br />
        <br />
        <span className={style.emphasis}>ニムルドの門</span>：使用距離が{Constants.R.E.range[props.skillLevel]}
        m増加し、指定した位置と自分の位置にニムルドの石碑を落として敵に<Value skill="E" ratio={Constants.E.damage} />
        のスキルダメージを与えて敵を押し出します。<br />
        以降、二つの石碑は神秘的な力でつながり、味方が1回移動できる次元の通路が{Constants.R.E.duration}秒間維持されます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "消費", values: Constants.R.sp_cost},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "[シャマシュの法典]文字のダメージ量", values: Constants.R.Q.damage.base},
        {title: "[バビロンのさいころ]障壁ダメージ量", values: Constants.R.W.damage.base},
        {title: "[バビロンのさいころ]束縛持続時間", values: Constants.R.W.bind},
        {title: "[ニムルドの門]距離増加", values: Constants.R.E.range}       
    ]
}