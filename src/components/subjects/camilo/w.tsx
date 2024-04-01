import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが回転しながら前に突進して<Damage skill="W" constants={Constants.W.damage} {...props} />の基本攻撃ダメージ を最大{Constants.W.count}回与えます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
