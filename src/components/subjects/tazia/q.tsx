import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：タジアは一定時間ごとに<span className={style.emphasis}>ガラス刃</span>
        を作ります。タジアが<span className={style.emphasis}>ガラス破片</span>に近づくと破壊され、<span className={style.emphasis}>ガラス刃</span>のチャージ時間の
        {Constants.Q.collect_charge}％を回復します。<span className={style.emphasis}>ガラス刃</span>
        は最大{Constants.Q.charge.max}つまで保有することができます。<br />
        <br />
        <span className={style.emphasis}>ガラス刃</span>を前方に投げて的中させた敵に
        <Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与え、<span className={style.emphasis}>ガラス破片</span>
        を生成します。<br />
        <br />
        <span className={style.emphasis}>スパーダ</span>：<span className={style.emphasis}>ガラス剣</span>を保有している場合、
        <span className={style.emphasis}>ガラス剣</span>を投げ、的中させた敵に<Damage skill="Q" constants={Constants.Q.spada_damage} {...props} />
        のスキルダメージを与えて押し出し、<span className={style.emphasis}>ガラス破片</span>を生成します。
        <span className={style.emphasis}>ガラス剣</span>は1回目では衝突後に貫通し、{Constants.Q.spada_range}m進んだ後に爆発して周りに
        <Damage skill="Q" constants={Constants.Q.spada_blast_damage} {...props} />のスキルダメー ジを与え、
        <span className={style.emphasis}>ガラス破片</span>を追加で生成します。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "[スパーダ]ダメージ量", values: Constants.Q.spada_damage.base},
        {title: "[スパーダ]爆発ダメージ量", values: Constants.Q.spada_blast_damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "チャージ時間", values: Constants.Q.charge.time}
    ]
}