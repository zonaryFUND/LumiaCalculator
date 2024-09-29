import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ダニエルはダメージを与えてから{Constants.R.window_after_attack}秒以内の敵の影の中に入ることができます。ダニエルが影の中に入る時、
        {Constants.R.silence}秒間敵を沈黙させ、最大{Constants.R.duration}秒間敵の影の中に潜んで
        <Value skill="R" ratio={Constants.R.damage} />のスキルダメージを最大{Constants.R.damage_count}
        回まで与えることができます。<br />
        持続時間が終了されたり、スキルを再度使用すると敵の影から抜け出し、
        <Value skill="R" ratio={Constants.R.finish_damage} />のスキルダメージを与えます。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "持続ダメージ量", values: Constants.R.damage.base},
        {title: "最後のダメージ量", values: Constants.R.finish_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}