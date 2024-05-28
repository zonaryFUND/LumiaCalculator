import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マグヌスが武器を振り回しながら{Constants.W.duration}秒間<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを
            {Constants.W.count[props.config.skillLevels.W]}回与えます。<br />
            <br />
            スキルが的中するたびにクールダウンが{Constants.W.cooldown_reduction}秒減少します。スキル使用中には妨害耐性が{Constants.W.tenacity}%増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "ダメージ回数", values: Constants.W.count},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
