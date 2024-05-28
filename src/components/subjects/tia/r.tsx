import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ティアが呪文を唱えると、指定した位置に巨大な筆が現れレインボーを描き、敵に<Value skill="R" ratio={Constants.R.damage} />
        のスキルダメージを与え、{Constants.R.stun[props.skillLevel]}秒間敵を気絶させます。敵に絵の具の色がついたら、気絶持続時間が
        {Constants.R.stun_enhance}秒増加します。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "気絶持続時間", values: Constants.R.stun},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}