import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        スアはスキルを使用すると心の糧を獲得し、次の基本攻撃が相手に<Damage skill="T" constants={Constants.T.damage} {...props} />
        のスキルダメージを与え、周辺{Constants.T.aoe_range}m範囲に<Damage skill="T" constants={Constants.T.aoe_damage} {...props} />
        のスキルダメージを与えます。<br />
        心の糧で与えたダメージの{Constants.T.heal}％の体力をすぐに回復します。<br />
        心の糧は最大{Constants.T.max_stack}スタックまで獲得できます。スタックを保有した場合は攻撃速度が{Constants.T.attack_speed}％増加します。<br />
        心の糧で敵にダメージを与えるとすべてのスキルのクールダウンが{Constants.T.cooldown_reduction}秒減少します。<br />
        クールダウン減少効果はダメージを与えた対象の数と関係なく1度だけ適用されます。<br />
        この基本攻撃はスキル攻撃とも見なされます。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "周辺範囲ダメージ量", values: Constants.T.aoe_damage.base}
    ]
}