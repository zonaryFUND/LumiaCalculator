import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        指定した位置に{Constants.R.duration}秒間持続する大剣を作り上げ、半径{Constants.R.range}m以内のすべての<span className={style.emphasis}>ガラス破片</span>
        を破壊し、半径内の敵の移動速度を{Constants.R.slow}％減少させます。大剣に的中された敵は
        <Value skill="R" ratio={Constants.R.damage} />のスキルダメージを受け、{Constants.R.hit_slow.duration}
        秒間移動速度が{Constants.R.hit_slow.effect}％減少します。大剣の持続時間が終わったり、作られてから
        {Constants.R.break_threshold}秒後の大剣が<span className={style.emphasis}>ガラス刃</span>や
        <span className={style.emphasis}>ガラス剣</span>に衝突すると、大剣は破壊されて半径{Constants.R.blast_range}m以内に
        <Value skill="R" ratio={Constants.R.blast_damage} />のスキルダメージを与えます。ダメージ量は破壊された
        <span className={style.emphasis}>ガラス破片</span>1つあたり{Constants.R.glass_additional_damage}％ずつ増加し、最大
        {Constants.R.glass_additional_max}％まで増加します。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "爆発ダメージ量", values: Constants.R.blast_damage.base},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}