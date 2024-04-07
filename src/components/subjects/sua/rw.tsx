import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const rw: React.FC<SubjectSkillProps> = props => (
    <>
        味方や自分に使用すると青い鳥が{Constants.RW.shield_duration}秒間<Damage skill="R" constants={Constants.RW.shield} {...props} />
        のスキルダメージを吸収し、妨害効果免疫状態になるシールドを付けます。<br />
        <br />
        敵に使用すると青い鳥が<Damage skill="R" constants={Constants.RW.damage} {...props} />のスキルダメージを与えて
        {Constants.RW.blind_duration[props.config.skillLevels.R]}秒間敵を失明させます。
    </>
);

export default rw;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.RW.shield.base},
        {title: "ダメージ量", values: Constants.RW.damage.base},
        {title: "失明持続時間", values: Constants.RW.blind_duration},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}