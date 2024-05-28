import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const enhanced = {
    base: Constants.Q.damage.base.map((b, i) => b + Constants.Q.additional_damage.base[i]),
    amp: Constants.Q.damage.amp + Constants.Q.additional_damage.amp
}

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            フィオラが指定した方向を攻撃して的中した敵に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。端に突かれた敵には
            <Damage skill="Q" constants={enhanced} {...props} />のスキルダメージを与えて{Constants.Q.slow.duration}
            秒間移動速度を{Constants.Q.slow.effect}%減少させ、トゥシェ刻印を2つ付与します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "端部分追加ダメージ", values: Constants.Q.additional_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
