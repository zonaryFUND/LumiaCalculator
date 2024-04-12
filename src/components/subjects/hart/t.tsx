import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.strong}>[高級・レア・英雄等級以上]の武器を初めて製作するたびに進化ポイントを獲得できます。</span><br />
            <br />
            ハートは基本攻撃で敵にダメージを与えるたびに{Constants.T.sp[props.config.skillLevels.T]}のスタミナを回復します。<br />
            <br />
            <span className={style.enhance}>進化効果</span>：基本攻撃をする時、音波{Constants.T.evoluted_sound_wave}
            つを追加で発射して音波1つあたり<Damage skill="T" constants={Constants.T.damage} {...props} />の基本攻撃ダメージを与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "スタミナ回復量", values: Constants.T.sp}
    ]
}
