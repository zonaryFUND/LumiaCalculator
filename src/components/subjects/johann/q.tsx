import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        指定した方向に光の球体を発射します。球体は<span className={style.emphasis}>神聖の香炉(W)</span>に触れると強化されます。<br />
        <br />
        球体が最大距離に到達したり、スキルを再使用すると爆発して、<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。<br />
        強化された場合、<Damage skill="Q" constants={Constants.Q.enhanced_damage} {...props} />のスキルダメージを与えて、対象を{Constants.Q.bind}秒間束縛します。<br />
        <br />
        爆発した光は戻り、味方の体力を<Damage skill="Q" constants={Constants.Q.heal} {...props} />回復させます。<br />
        強化された場合、味方の体力を<Damage skill="Q" constants={Constants.Q.enhanced_heal} {...props} />回復します。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "強化されたダメージ量", values: Constants.Q.enhanced_damage.base},
        {title: "回復量", values: Constants.Q.heal.base},
        {title: "強化された回復量", values: Constants.Q.enhanced_heal.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}