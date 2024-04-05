import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーが指定した位置にジャンプし、周りの敵に<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}