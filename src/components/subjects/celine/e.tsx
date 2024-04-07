import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
    衝撃波爆弾を指定した位置に投げ、範囲内の敵と自分を突き飛ばして<Damage skill="E" constants={Constants.E.damage} {...props} />
    のスキルダメージを与えます。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown.constant}
    ]
}