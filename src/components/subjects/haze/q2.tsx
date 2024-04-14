import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import { values as rawValues } from "./q";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>サブマシンガン状態</span>：{Constants.Q2.cast}秒間キャストし、前方に向けてサブマシンガンを連射して
            <Damage skill="Q" constants={Constants.Q2.damage} {...props} /><span className={style.attack}>(+余った弾1 * スキル増幅の{Constants.Q2.damage.amp_per_ammo}％)</span>のスキルダメージを与えた後、サブマシンガン状態を終了します。
        </>
    );
}

export default q;

const {additionalInfo, ...values} = rawValues;

export { values };