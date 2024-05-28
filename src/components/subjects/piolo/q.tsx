import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>双節乱舞</span>：ピオロが指定した方向に双節棍を素早く振り回し、範囲内の敵に{Constants.Q1.tick}秒ごとに
            <Value skill="Q" ratio={Constants.Q1.damage} />のスキルダメージを与えます。
            {Constants.Q1.enhance.map(i => i.toString()).join("、")}回的中された対象には<Value skill="Q" ratio={Constants.Q1.enhanced_damage} />
            の強化スキルダメージを与えます。持続時間の最後まで使用したり、強化スキルダメージを{Constants.Q1.Q2_enable_enhanced_attack}回以上的中させた場合、
            <span className={style.emphasis}>打ち下ろし</span>が活性化します。<br />
            <br />
            <span className={style.enhance}>打ち下ろし</span>：ピオロが指定した地点に双節棍を強く打ち下ろし、中央範囲の敵には
            <Value skill="Q" ratio={Constants.Q2.center_damage} />のスキルダメージを与え、対象の移動速度を
            {Constants.Q2.slow.duration}秒間{Constants.Q2.slow.effect}%減少させます。外側範囲の敵には
            <Value skill="Q" ratio={Constants.Q2.outer_damage} />のスキルダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <><span className={style.emphasis}>双節乱舞</span>キャスト中、移動速度が{Constants.Q1.movement_speed_penalty}%減少します。</>,
    parameters: [
        {title: "[双節乱舞]ダメージ量", values: Constants.Q1.damage.base},
        {title: "[双節乱舞]強化ダメージ量", values: Constants.Q1.enhanced_damage.base},
        {title: "[打ち下ろし]中央範囲ダメージ量", values: Constants.Q2.center_damage.base},
        {title: "[打ち下ろし]外範囲ダメージ量", values: Constants.Q2.outer_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
