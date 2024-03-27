import * as React from "react";
import Constants from "./constants.json";
import Damage, { FormulaContext } from "../damage";
import { Status } from "components/subject/use-status";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<Status> = status => {
    const formula = React.useContext(FormulaContext)!;
    const stack = Constants.R.additionalDamage.stack[status.skillLevels.R];
    const additionalAttack = status.attackPower.times(Constants.R.additionalDamage.attack).dividedBy(100);
    const least = additionalAttack.add(stack);
    const max = additionalAttack.add(stack).add(stack);

    return (
        <>
            アイザックが指定した地点を強く叩きつけて<Damage skill="R" constants={Constants.R.damage} />のスキルダメージを与え、
            搾取刻印のない敵を範囲の外に押し出します。
            対象の搾取刻印スタックに比例して、
            {
                formula ?
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