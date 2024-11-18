import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json"
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        指定した位置にニムルドの石碑を落として範囲内の敵に
        <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて敵を押し出します。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}