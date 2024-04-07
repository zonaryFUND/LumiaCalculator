import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        味方や自分に使用すると青い鳥が{Constants.W.shield_duration}秒間<Damage skill="W" constants={Constants.W.shield} {...props} />
        のスキルダメージを吸収し、妨害効果免疫状態になるシールドを付けます。<br />
        <br />
        敵に使用すると青い鳥が<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えて
        {Constants.W.blind_duration[props.config.skillLevels.W]}秒間敵を失明させます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.W.shield.base},
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "失明持続時間", values: Constants.W.blind_duration},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}