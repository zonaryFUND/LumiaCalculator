import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが魅惑的な姿で周りの敵実験体に<Value skill="R" ratio={Constants.R.first_damage} />のスキルダメージを与えて敵を引き寄せます。<br />
            <br />
            1人以上の敵実験体に的中した場合には{Constants.R.shield_duration}秒間<Value skill="R" ratio={Constants.R.shield} />
            のダメージを吸収するシールドを獲得し、しばらくしてから周りの敵に
            <Value skill="R" ratio={Constants.R.second_damage} />のスキルダメージを与えます。<br />
            追加で的中した敵実験体1人ごとにシールド量が<Value skill="R" ratio={Constants.R.additional_shield} />増加します。（最大{Constants.R.max_additional_shield}人）
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.first_damage.base},
        {title: "2打ダメージ量", values: Constants.R.second_damage.base},
        {title: "シールド吸収量", values: Constants.R.shield.base},
        {title: "追加シールド吸収量", values: Constants.R.additional_shield.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
