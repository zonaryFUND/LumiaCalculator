import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ナタポンは慎重にこの瞬間を撮り、カメラに納めます。ナタポンが使用するカメラは攻撃速度が固定され、致命打が発生しません。その代わりに、基本攻撃する時に
            <Damage skill="T" constants={Constants.T.damage} {...props} />の追加スキルダメージを与えます。<br />
            <br />
            <span className={style.level}>被写体</span>：敵にスキルダメージを与えると<span className={style.level}>被写体</span>スタックを付与します。
            <span className={style.level}>被写体</span>スタックは最大{Constants.T.max_stack}スタックまで貯めることができ、1スタックごとにナタポンが与えるダメージが
            {Constants.T.stack_damage_amp[props.config.skillLevels.T]}％増加します。<br />
            <span className={style.level}>被写体</span>スタックはナタポンの視界から離れるとすぐに消えます。<br />
            <br />
            <span className={style.level}>偽装カメラ</span>：<span className={style.common}>監視カメラ</span>と
            <span className={style.common}>枝</span>を組み合わせると、潜入効果を持つ<span style={{color:"rgb(0,128,0)"}}>偽装カメラ</span>を製作できます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "受けるダメージ増加(％)", values: Constants.T.stack_damage_amp, percent: true}
    ]
}
