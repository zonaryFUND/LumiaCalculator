import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アロンソが周りの敵を短く引き寄せながら<Damage skill="R" constants={Constants.R.damage} {...props} />
        のスキルダメージを与えます。<br />
        <br />
        その後大地から引き寄せた金属の破片でアロンソの体力を{Constants.R.tick}秒間
        <Damage skill="R" constants={Constants.R.heal} {...props} />
        ずつ回復させ、敵には<Damage skill="R" constants={Constants.R.damage_on_time} {...props} />
        の持続スキルダメージを与えてフィールドの外に向かう敵の移動速度を{Constants.R.slow}減少させます。<br />
        <br />
        再使用したり持続時間が終了すると、維持時間に比例して
        <Damage skill="R" constants={Constants.R.final_damage.min} {...props} /> ~
        <Damage skill="R" constants={Constants.R.final_damage.max} {...props} />
        のスキルダメージを与えます。
    </>
);

export default r;

export const values: ValuesProps = {
    additionalInfo: <>突進する前に対象が遠くなったり消えた場合には突進せず、クールダウンが一部返されます。</>,
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.damage.base},
        {title: "最大体力比例回復量", values: Constants.R.heal.maxHP, percent: true},
        {title: "持続ダメージ量", values: Constants.R.damage_on_time.base},
        {title: "スキル終了ダメージ量(最小)", values: Constants.R.final_damage.min.base},
        {title: "スキル終了ダメージ量(最大)", values: Constants.R.final_damage.max.base},
        {title: "クールダウン", values: Constants.R.cooldown},
    ]
}