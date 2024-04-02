import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        地面に設置されたスピアを中心に指定した方向にジャンプし、<Damage skill="E" constants={Constants.E.damage} {...props} />
        のスキルダメージを与えます。つながりが切れたスピアに使用すると、再びつながります。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
