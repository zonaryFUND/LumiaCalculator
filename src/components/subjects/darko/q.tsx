import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ダルコが敵実験体に向かって移動する時、{Constants.Q.movement_speed.duration}秒間移動速度が
        {Constants.Q.movement_speed.effect}%増加します。<br />
        <br />
        ダルコの次の基本攻撃は<Value skill="Q" ratio={Constants.Q.damage} />の追加スキルダメージを与えて
        {Constants.Q.mark}秒間刻印を残します。刻印が残った対象にこのスキルを再び使用すると、ダメージ量が{Constants.Q.mark_enhance[props.skillLevel]}%増加します。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "ダメージ増加量(%)", values: Constants.Q.mark_enhance, percent: true}
    ]
}