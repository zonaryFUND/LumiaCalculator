import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const maxDamage = {
    base: Constants.R.finish_damage.base.map(v => v * Constants.R.finish_multiplier_max),
    attack: Constants.R.finish_damage.attack * Constants.R.finish_multiplier_max
}

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーが{Constants.R.duration[props.skillLevel]}秒間電気ノコギリを取り出し、基本攻撃で<Value skill="R" ratio={Constants.R.damage} />
        の追加スキルダメージを与えます。ジャッキーが敵実験体のキルに関与した場合、持続時間が{Constants.R.extend}
        秒増加します。スキルを発動してから{Constants.R.finish_time}秒後になると<span className={style.emphasis}>虐殺</span>を使用することができます。<br />
        <span className={style.emphasis}>虐殺</span>：ジャッキーが電気ノコギリ大きく振り回し、敵の失った体力に比例する
        <Value skill="R" ratio={Constants.R.finish_damage} /> ~ <Value skill="R" ratio={maxDamage} />のスキルダメージを与えます。
    </>
);

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        双剣を装備する場合、基本攻撃が1回に変更される代わりに攻撃力の{Constants.R.dualsword_multiplier}%のダメージを与え、アドレナリン分泌の体力回復が{Constants.R.dualsword_w_heal_multiplier}倍になります。<br />
        <br />
        虐殺ダメージ量は対象の現在体力が最大体力の{Constants.R.finish_multiplier_max_hp}%の場合に最大になります。
    </>,
    parameters: [
        {title: "追加ダメージ量", values: Constants.R.damage.base},
        {title: "[虐殺]ダメージ量", values: Constants.R.finish_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "維持時間", values: Constants.R.duration},
    ]
}