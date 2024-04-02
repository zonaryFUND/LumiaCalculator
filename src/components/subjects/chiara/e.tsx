import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        キアラが指定した方向へ執着の鎖を放ち的中した敵に<Damage skill="E" constants={Constants.E.damage} {...props} />
        のスキルダメージを与え鎖で繋ぎます。鎖の連結が{Constants.E.duration}秒以上維持されると
        <Damage skill="E" constants={Constants.E.second_damage} {...props} />のスキルダメージを対象を
        {Constants.E.bind[props.config.skillLevels.E]}秒間束縛させます。
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