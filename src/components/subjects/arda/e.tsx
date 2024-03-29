import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json"
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        指定した位置にニムルドの石碑を落として範囲内の敵に
        <Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えて敵を押し出します。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}