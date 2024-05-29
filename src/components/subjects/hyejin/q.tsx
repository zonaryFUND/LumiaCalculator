import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヘジンが指定した方向に制圧符を投げ、的中した対象に<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
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
