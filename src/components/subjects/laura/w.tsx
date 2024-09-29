import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが指定した方向に予告状を投げます。<br />
            予告状が敵に的中した場合、<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えて
            {Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}%減少させます。<br />
            的中した敵は{Constants.W.target_duration}秒間ラウラの<span className={style.emphasis}>ターゲット</span>になります。<br />
            ラウラは<span className={style.emphasis}>ターゲット</span>になった対象を個別攻撃でダメージを与えるたびに体力を<Value skill="W" ratio={Constants.W.heal} />回復します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "体力回復量", values: Constants.W.heal.base},
        {title: "移動速度減少量(%)", values: Constants.W.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
