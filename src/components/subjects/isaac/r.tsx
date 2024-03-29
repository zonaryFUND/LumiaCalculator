import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    const stack = Constants.R.additionalDamage.stack[props.config.skillLevels.R];
    const additionalAttack = props.status.attackPower.times(Constants.R.additionalDamage.attack).dividedBy(100);
    const least = additionalAttack.add(stack);
    const max = additionalAttack.add(stack).add(stack);

    return (
        <>
            アイザックが指定した地点を強く叩きつけて<Damage {...props} skill="R" constants={Constants.R.damage} />のスキルダメージを与え、
            搾取刻印のない敵を範囲の外に押し出します。
            対象の搾取刻印スタックに比例して、
            {
                props.showEquation ?
                <>
                    <span className={style["vf-overflow"]}>搾取刻印スタック1あたり対象の失った体力の{stack}％</span>
                    <span className={style.attack}>(+攻撃力の{Constants.R.additionalDamage.attack}％)</span>    
                </>
                :
                <span className={style.emphasis}>対象の失った体力の{least.toString()}％ ～ {max.toString()}％</span>
            }
            に値する追加スキルダメージを与え、
            しばらくの間移動速度を{Constants.R.slow}％減少させます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "敵の失った体力対比追加ダメージ量", values: Constants.R.additionalDamage.stack, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
    ]
}