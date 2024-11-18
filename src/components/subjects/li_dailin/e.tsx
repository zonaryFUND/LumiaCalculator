import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ダイリンが酒を口に含んで、前方に向けて扇形に吹き出します。的中された敵は<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを受け、{Constants.E.slow.duration}秒間移動速度が{Constants.E.slow.effect[props.skillLevel]}%減少します。<br />
            <br />
            <span className={style.strong}>酔拳</span>：酔いを{Constants.E.bac}消耗して的中された敵の移動速度を
            {Constants.E.slow.enhanced_effect[props.skillLevel]}%減少させます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度減少量(%)", values: Constants.E.slow.effect, percent: true},
        {title: "強化された移動速度減少量(%)", values: Constants.E.slow.enhanced_effect, percent: true},
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
