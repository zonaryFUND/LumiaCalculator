import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ウィルソンが指定した位置へ飛んで行きながら経路上の敵に<Value skill="Q" ratio={Constants.Q.first_damage} />
            のスキルダメージを与え、到着した後範囲内の敵に<Value skill="Q" ratio={Constants.Q.second_damage} />のスキルダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "移動ダメージ", values: Constants.Q.first_damage.base},
        {title: "到着ダメージ", values: Constants.Q.second_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
