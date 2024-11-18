import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        味方や自分に使用すると青い鳥が{Constants.W.shield_duration}秒間<Value skill="W" ratio={Constants.W.shield} />
        のスキルダメージを吸収し、妨害効果免疫状態になるシールドを付けます。<br />
        <br />
        敵に使用すると青い鳥が<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えて
        {Constants.W.blind_duration[props.skillLevel]}秒間敵を失明させます。
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