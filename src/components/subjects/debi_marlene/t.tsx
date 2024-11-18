import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const AA: React.FC<SubjectSkillProps> = props => {
    const { status, showEquation } = useValueContext();
    const ratio = Constants.T.basic_attack_damage;
    if (showEquation) {
        return <span className={style.emphasis}>{ratio}%</span>
    } else {
        return <Value ratio={{attack: 75, basicAttackAmp: 100}} skill="T" />;
    }
}

const t: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：デビーの状態では防御力が{Constants.T.debi_defense[props.skillLevel]}
        増加し、マーリンの状態では基本攻撃の射程距離が{Constants.T.marlene_range}増加します。デビー&マーリンの基本攻撃は
        <AA {...props} />に値するダメージを与えます。<br />
        <br />
        デビー＆マーリンの基本攻撃とスキルは対象にそれぞれ<span className={style.emphasis}>Blue & Red</span>
        を刻み込みます。この効果は最大{Constants.T.max_stack}スタックされます。<br />
        <span className={style.emphasis}>Blue & Red</span>はお互いに違う色が刻まれると元の色が消えて対象に
        <Value skill="T" ratio={Constants.T.damage} />のスキルダメージを与え、{Constants.T.movement_speed.duration}
        秒間デビー&マーリンの移動速度が{Constants.T.movement_speed.effect[props.skillLevel]}
        %増加します。(最大{Constants.T.max_ms_stack}スタック)<br />
        また、色が刻まれる時は<span className={style.emphasis}>援護して、マーリン！</span>
        または<span className={style.emphasis}>今よ、デビー！</span>のクールダウンが{Constants.T.e_cooldown_reduction}
        秒減少し、<span className={style.emphasis}>Blue & Red</span>がダメージを与えた場合にはクールダウンが
        {Constants.T.color_change_e_cdr}秒追加で減少します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>
        デビー&マーリンの基本攻撃は致命打が発生しない代わりに致命打ダメージ増加1%あたり 致命打確率が
        {Constants.T.critical_damage_to_chance}%増加します。致命打確率の
        {Constants.T.damage.criticalChance}%は<span className={style.emphasis}>Blue & Red</span>のダメージ量に増加されます。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "防御力増加量", values: Constants.T.debi_defense},
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed.effect, percent: true}
    ]
}
