import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { status, config, showEquation } = useValueContext();

    const attack = (() => {
        if (showEquation) {
            return <><span className={style.level}>キャラクターレベル</span><span className={style.amp}>(*スキル増幅の{Constants.T.attack_amp}%)</span></>
        } else {
            return <span className={style.emphasis}>{status.skillAmp.calculatedValue.percent(Constants.T.attack_amp).times(config.level).toString()}</span>
        }
    })();

    const defense = (() => {
        if (showEquation) {
            return <><span className={style.level}>キャラクターレベル</span><span className={style.amp}>(*スキル増幅の{Constants.T.defense_amp}%)</span></>
        } else {
            return <span className={style.emphasis}>{status.skillAmp.calculatedValue.percent(Constants.T.defense_amp).times(config.level).toString()}</span>
        }
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
        {title: "追加攻撃速度(%)", values: Constants.T.attack_speed, percent: true}
    ]
}