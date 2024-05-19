import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        アヤが攻撃されると、しばらくの間シールドを生成して{Constants.T.duration}秒間
        <Value skill="T" ratio={Constants.T.shield} />のダメージから自分を保護します。<br />
        敵を攻撃するたびにアヤの正義のクールダウンが{Constants.T.cooldown_reduction}秒ずつ減少します。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.base}
    ]
}