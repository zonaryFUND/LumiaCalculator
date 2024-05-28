import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：<span className={style.emphasis}>エネルギー砲</span>または
        <span className={style.emphasis}>スパーク弾</span>を的中させると次の基本攻撃の射程距離が{Constants.E.range_increase}増加します。<br />
        <br />
        テオドールがスパーク弾を投げ、的中させた敵の移動速度を{Constants.E.slow.duration}秒間{Constants.E.slow.effect[props.skillLevel]}
        %減少させ、的中された敵を{Constants.E.target_duration}秒間<span className={style.emphasis}>標的</span>
        に指定します。テオドールは標的になった対象から視界を提供され、基本攻撃やスキルで攻撃すると
        <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて
        {Constants.E.bind[props.skillLevel]}秒間束縛させます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量(%)", values: Constants.E.slow.effect, percent: true},
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "束縛持続時間", values: Constants.E.bind},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
