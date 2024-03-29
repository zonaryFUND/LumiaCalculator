import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アドリアナが指定した位置に火炎瓶を投げます。<br />
        床に落ちた火炎瓶は爆発して<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与えます。<br />
        火炎瓶が爆発した場所には{Constants.R.duration}秒間、維持される火炎地帯が作られます。<br />
        <br />
        火炎瓶は最大{Constants.R.charge.max}回まで使用できます。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "チャージ時間", values: Constants.R.charge.time},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}