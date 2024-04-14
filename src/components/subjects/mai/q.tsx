import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マイが両手にあるショールを大きく広げ、範囲内の敵に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えて
            {Constants.Q.duration}秒間持続されるパターンを付けます。<br />
            <br />
            パターンを付けられた対象が<span className={style.emphasis}>ドレープ</span>に再び的中されると、{Constants.Q.slow.duration}
            秒間移動速度が{Constants.Q.slow.effect[props.config.skillLevels.Q]}％減少します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "移動速度減少量(％)", values: Constants.Q.slow.effect, percent: true},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
