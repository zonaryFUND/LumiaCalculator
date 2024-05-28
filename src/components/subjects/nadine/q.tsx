import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ナディンが{Constants.Q.cast}秒にわたって力を溜めます。この時、移動速度が{Constants.Q.movement_speed_penalty}%まで減少し、スキルの射程距離とダメージが
        {Constants.Q.max_range}倍まで増加します。野性スタックが{Constants.Q.max_range_on_some_stack.threshold}
        以上になるとスキルの射程距離が{Constants.Q.max_range_on_some_stack.value}倍まで増加します。<br />
        スキルをもう一度使用すると矢を放ち、
        <Value skill="Q" ratio={Constants.Q.min_damage} /> ~ <Value skill="Q" ratio={Constants.Q.max_damage} />
        のスキルダメージを敵に与えます(ナディンの<span className={style.strong}>野性</span>スタックに応じてダメージが増加します)。<br />
        基本攻撃の射程距離によってブルズアイの射程距離が増加します。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.Q.min_damage.base},
        {title: "最大ダメージ量", values: Constants.Q.max_damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}