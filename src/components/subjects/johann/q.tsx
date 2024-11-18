import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        指定した方向に光の球体を発射し、経路上にいる味方の体力を<Value skill="Q" ratio={Constants.Q.heal} />回復させます。球体は最大距離に到達したり、スキルを再使用すると爆発して敵に
        <Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
        <br />
        球体が<span className={style.emphasis}>神聖の香炉(W)</span>と接触した場合には球体が強化され、味方の体力を<Value skill="Q" ratio={Constants.Q.heal} />
        回復させます。球体が爆発する時には敵に<Value skill="Q" ratio={Constants.Q.enhanced_damage} />のスキルダメージを与えて敵を{Constants.Q.bind}秒間束縛します。<br />
        <br />
        光の球体は爆発した後、ヨハンのところに戻ります。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "強化されたダメージ量", values: Constants.Q.enhanced_damage.base},
        {title: "体力回復量", values: Constants.Q.heal.base},
        {title: "強化された回復量", values: Constants.Q.enhanced_heal.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}