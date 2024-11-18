import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>絡め捕り</span>：ピオロが双節棍を回しながら投げる準備をします。準備時間に比例して射程距離とダメージ量が増加します。再使用すると、指定した方向に双節棍を投げます。的中すると
            <Value skill="E" ratio={Constants.E1.first_min_damage} /> ~ <Value skill="E" ratio={Constants.E1.first_max_damage} />
            のスキルダメージを与えて対象に移動し、
            <Value skill="E" ratio={Constants.E1.second_min_damage} /> ~ <Value skill="E" ratio={Constants.E1.second_max_damage} />
            のスキルダメージを与えながら突き飛ばします。双節棍が敵に的中すると、<span className={style.emphasis}>打ち上げ</span>が活性化します。
            <br />
            <span className={style.enhance}>打ち上げ</span>: ピオロが指定した方向に双節棍を強く打ち上げ、対象に
            <Value skill="E" ratio={Constants.E2.damage} />のスキルダメージを与え、{Constants.E2.airborne}秒間空中に浮かせます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <><span className={style.emphasis}>絡め捕り</span>キャスト中、移動速度が{Constants.E1.movement_speed_penalty}%減少します。</>,
    parameters: [
        {title: "[絡め捕り]双節棍最小ダメージ量", values: Constants.E1.first_min_damage.base},
        {title: "[絡め捕り]双節棍最大ダメージ量", values: Constants.E1.first_max_damage.base},
        {title: "[絡め捕り]突進最小ダメージ量", values: Constants.E1.second_min_damage.base},
        {title: "[絡め捕り]突進最大ダメージ量", values: Constants.E1.second_max_damage.base},
        {title: "[打ち上げ]ダメージ量", values: Constants.E2.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
