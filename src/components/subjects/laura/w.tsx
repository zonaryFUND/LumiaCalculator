import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが指定した方向に予告状を投げます。予告状は敵実験体と衝突すると開かれ、範囲内の敵の移動速度を{Constants.W.hit_slow}%減少させます。衝突した対象には
            <Value skill="W" ratio={Constants.W.hit_damage} />のスキルダメージを与え、その対象は{Constants.W.target}秒後、ラウラの<span className={style.emphasis}>ターゲット</span>になります。
            <span className={style.emphasis}>ターゲット</span>になった対象は
            <Value skill="W" ratio={Constants.W.target_damage} />のスキルダメージを受けて{Constants.W.target_slow.duration}秒間移動速度が{Constants.W.target_slow.effect}%減少し、
            {Constants.W.defense_decrease.duration}秒間防御力が{Constants.W.defense_decrease.effect[props.skillLevel]}%減少します。この時、対象の減少した防御力の分、ラウラの防御力が
            {Constants.W.defense_decrease.duration}秒間増加します。また、{Constants.W.thril}の<span className={style.emphasis}>スリル</span>を回復します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.hit_damage.base},
        {title: "追加ダメージ量", values: Constants.W.target_damage.base},
        {title: "防御力減少量(%)", values: Constants.W.defense_decrease.effect, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
