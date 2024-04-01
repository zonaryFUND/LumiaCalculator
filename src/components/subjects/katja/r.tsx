import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ドローンが指定した範囲をスキャンします。カティアはスキャンされた最大3人の敵実験体を近い順でそれぞれ一発ずつ弾丸を撃ち込んでスキルダメージを与えます。射撃するほどダメージ量が増加します。<br />
            経路上に他の敵実験体がいる場合、代わりに攻撃を受けます。<br />
            <br />
            一発目：<Damage skill="R" constants={Constants.R.first_damage} {...props} />のスキルダメージを与えます。<br />
            二発目：<Damage skill="R" constants={Constants.R.second_damage} {...props} />のスキルダメージを与えます。<br />
            三発目：<Damage skill="R" constants={Constants.R.third_damage} {...props} />のスキルダメージを与えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: (
        <>
            スキャンできる最大人数は、カティアの近くにいる3人までです。<br />
            スキル使用中、スキャンされた対象にはカティアの姿が見えます。<br />
            スキャンされた敵がいない場合、クールダウンが{Constants.R.cooldown_return}％返されます。
        </>
    ),
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.first_damage.base},
        {title: "2打ダメージ量", values: Constants.R.second_damage.base},
        {title: "3打ダメージ量", values: Constants.R.third_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
