import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ダイリンが{Constants.W.cast}秒間酒を飲んで酔いを{Constants.W.bac}
            獲得し、すべての基本攻撃を回避し、受けるダメージが{Constants.W.damage_reduction[props.skillLevel]}
            ％減少します。ダイリンが基本攻撃をすると酒飲みのクールダウンが{Constants.W.cooldown_reduction}秒減少します。<br />
            <br />
            <span className={style.emphasis}>大酒家</span>：酒飲みを完了した後、敵に与える基本攻撃ダメージ量が酔いの量に比例して
            {Constants.W.basic_attack_amp}% ~ {Constants.W.basic_attack_amp * 100}％まで増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "受けるダメージ減少(%)", values: Constants.W.damage_reduction, percent: true}
    ]
}
