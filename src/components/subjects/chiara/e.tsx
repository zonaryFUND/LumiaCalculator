import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        キアラが指定した方向へ執着の鎖を放ち的中した敵に<Value skill="E" ratio={Constants.E.damage} />
        のスキルダメージを与え鎖で繋ぎます。鎖の連結が{Constants.E.duration}秒以上維持されると
        <Value skill="E" ratio={Constants.E.second_damage} />のスキルダメージを対象を
        {Constants.E.bind[props.skillLevel]}秒間束縛させます。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "追加ダメージ量", values: Constants.E.second_damage.base},
        {title: "束縛持続時間", values: Constants.E.bind},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}