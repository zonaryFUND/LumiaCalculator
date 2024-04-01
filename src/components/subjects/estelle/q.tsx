import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        エステルが盾を強化させます。次の基本攻撃が<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        のスキルダメージを追加で与えて{Constants.Q.stun}秒間気絶させます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "[鎮圧]ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}