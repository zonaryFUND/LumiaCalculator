import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノアが幻想的な演奏を始め、的中させた敵に{Constants.R.duration}秒間持続する音波を飛ばします。<br />
            的中した音波は段々大きくなり、範囲内のすべての敵に{Constants.R.damage_tick}秒ごとに
            <Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与え、移動速度を{Constants.R.slow}%減少させる効果を最大
            {Constants.R.max_stack}スタックまで与える ことができます。<br />
            <br />
            持続時間が終了すると、範囲内のすべての敵に<Value skill="R" ratio={Constants.R.finish_damage} />のスキルダメージを与えて敵を
            {Constants.R.insane[props.skillLevel]}秒間精神異常状態にさせ、精神異常状態の敵は周りの対象を基本攻撃します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <><span className={style.emphasis}>精神異常</span>状態に陥った敵は操作できない状態になり、攻撃速度が{Constants.R.insane_attack_speed}%増加し、自分の味方を優先して攻撃します。</>,
    parameters: [
        {title: "持続ダメージ量", values: Constants.R.damage.base},
        {title: "爆発ダメージ量", values: Constants.R.finish_damage.base},
        {title: "精神異常持続時間", values: Constants.R.insane},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
