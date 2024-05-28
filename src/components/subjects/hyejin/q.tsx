import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヘジンが指定した方向に制圧符を投げ、的中した対象に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。<br />
            的中した場合、クールダウンが{Constants.Q.cooldown_reduction}%減少します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
