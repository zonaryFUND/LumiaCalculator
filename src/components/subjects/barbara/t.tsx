import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    const attack = (() => {
        /*
        if (props.showEquation) {
            return <><span className={style.level}>キャラクターレベル</span><span className={style.amp}>(*スキル増幅の{Constants.T.attack_amp}％)</span></>
        } else {
            return <span className={style.emphasis}>{props.status.skillAmp.percent(Constants.T.attack_amp).times(props.config.level).toString()}</span>
        }
        */
       return null;
    })();

    const defense = (() => {
        /*
        if (props.showEquation) {
            return <><span className={style.level}>キャラクターレベル</span><span className={style.amp}>(*スキル増幅の{Constants.T.defense_amp}％)</span></>
        } else {
            return <span className={style.emphasis}>{props.status.skillAmp.percent(Constants.T.defense_amp).times(props.config.level).toString()}</span>
        }
        */
       return null;
    })();

    return (
        <>
            セントリーガンの攻撃力が{attack}、防御力が{defense}増加します。<br />
            セントリーガンがイオンレーザーに的中するか、磁力ブラストを生成するたびに攻撃速度が 15%増加します。(最大3スタック)
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>強化されていないセントリーガンの攻撃力は{Constants.sentry_gun.base_attack}、防御力は{Constants.sentry_gun.base_defense}です。</>,
    parameters: [
        {title: "追加攻撃速度(％)", values: Constants.T.attack_speed, percent: true}
    ]
}