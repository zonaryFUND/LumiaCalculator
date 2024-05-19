import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    const criticalWound = (() => {
        /*
        const ampRatio = Constants.T.critical_wound.amp;
        const hpRatio = Constants.T.critical_wound.targetMaxHP;
        if (props.showEquation) {
            return <>最大体力の{hpRatio}％<span className={style.amp}>(+スキル増幅の{ampRatio}％)</span></>
        } else {
            return <>{props.status.skillAmp.percent(ampRatio).toString()}<span className={style.maxhp}>(+最大体力の{hpRatio}％)</span></>
        }
        */
       return null;
    })()


    return (
        <>
            キャッシーが敵にスキルダメージを与えると{Constants.T.wound_duration}秒間<Damage skill="T" constants={Constants.T.wound} {...props} />
            のダメージを与える外傷を付与します。<br />
            外傷が{Constants.T.max_stack}スタックになると、敵は{Constants.T.wound_duration}秒間{criticalWound}
            のダメージを受ける致命的外傷状態になります。致命的外傷状態の敵は治癒効果が{Constants.T.healing_reduction}％減少します。<br />
            キャッシーは敵を致命的外傷状態にさせると{Constants.T.shield_duration}秒間<Damage skill="T" constants={Constants.T.shield} {...props} />
            のダメージを防ぐシールドを獲得し、外傷または致命的外傷状態の敵に向かって移動する時、移動速度が{Constants.T.movement_speed[props.config.skillLevels.T]}
            ％増加した後徐々に減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.base},
        {title: "移動速度増加量", values: Constants.T.movement_speed, percent: true}
    ]
}