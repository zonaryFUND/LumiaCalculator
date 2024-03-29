import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        アイソルが設置したトラップが敵に的中する場合、アイソルは{Constants.T.duration}秒間
        <span className={style.attack}>攻撃力{Constants.T.attack[props.config.skillLevels.T]}</span>または
        <span className={style.amp}>スキル増幅{Constants.T.amp[props.config.skillLevels.T]}</span>
        が増加します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>アイソルの視界に敵のトラップが見えた場合、アイソルは該当トラップを記憶し画面に表示します</>,
    parameters: [
        {title: "攻撃力", values: Constants.T.attack},
        {title: "スキル増幅", values: Constants.T.amp},
    ]
}