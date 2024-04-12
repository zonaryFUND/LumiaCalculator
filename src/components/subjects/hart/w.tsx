import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートはギターを弾くと{Constants.W.duration[props.config.skillLevels.W]}秒間攻撃力が
            {Constants.W.attack[props.config.skillLevels.W]}増加し、基本攻撃の射程距離が{Constants.W.range}増加します。<br />
            <br />
            <span className={style.enhance}>進化効果</span>：ギターを弾く時、範囲内にいた味方の次のスキルダメージに
            <Damage skill="W" constants={Constants.W.buff_damage} {...props} />のスキルダメージを追加で与えます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "攻撃力", values: Constants.W.attack},
        {title: "持続時間(秒)", values: Constants.W.duration},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
