import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            対象を殴って<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与え、マグヌスの左側の方に
            {Constants.E.knockback}m飛ばします。<br />
            飛ばされた対象が壁にぶつかると{Constants.E.stun[props.skillLevel]}秒間気絶します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "気絶持続時間", values: Constants.E.stun},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
