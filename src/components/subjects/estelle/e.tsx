import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.enhance}>盾防御</span>：エステルが消防用盾を広げて{Constants.E.duration}
        秒間移動することができ、スキルを使用した直後から{Constants.E.invulnerable}
        秒以内の敵の攻撃はダメージを受けずに防ぐことができます。（一部持続ダメージを除く）以降のダメージは受けるダメージ量の
        {Constants.E.damage_reduction}%を防ぎ、盾防御中に生成されたチーム安全エリアにいる味方は受けるダメージが
        {Constants.E.ally_damage_reduction[props.skillLevel]}%減少します。突進後にスキルを再使用すると、防御状態を終了させることができます。<br />
        <br />
        <span className={style.enhance}>盾突進</span>：盾防御(E)中にスキルを使用すると、前に突進してぶつかった対象に
        <Value skill="E" ratio={Constants.E2.damage} />
        のスキルダメージを与えて押し飛ばします。突進中、エステルは阻止不可状態になり、敵の監視カメラのようなオブジェクトを一気に破壊することができます。突進中にスキルを再使用すると、突進を止めることができます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "[盾防御]安全エリアの味方ダメージ減少", values: Constants.E.ally_damage_reduction, percent: true},
        {title: "[盾突進]ダメージ量", values: Constants.E2.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}