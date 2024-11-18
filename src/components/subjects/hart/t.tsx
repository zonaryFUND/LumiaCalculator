import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートは基本攻撃をする時、音波{Constants.T.evoluted_sound_wave}
            つを追加で発射し、音波1つあたり<Value skill="T" ratio={Constants.T.damage} />の基本攻撃ダメージを与えます。ハートは基本攻撃で敵にダメージを与えるたびに
            {Constants.T.sp[props.skillLevel]}のスタミナを回復します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "音波の基本攻撃係数", values: Constants.T.damage.attack, percent: true},
        {title: "スタミナ回復量", values: Constants.T.sp}
    ]
}
