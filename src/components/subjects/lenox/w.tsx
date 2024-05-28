import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノックスは鞭で2回攻撃を行い、最初の攻撃で周りの敵に<Damage skill="W" constants={Constants.W.first_damage} {...props} />
            のダメージを与えて{Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}%減少させます。2回目の攻撃は対象に
            <Damage skill="W" constants={Constants.W.second_damage} {...props} />のダメージを与えて対象を引き寄せます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.W.first_damage.base},
        {title: "2打ダメージ量", values: Constants.W.second_damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
