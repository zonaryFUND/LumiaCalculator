import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const r: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();
    const stack = Constants.R.additionalDamage.stack[props.skillLevel];

    const min = {
        base: Constants.R.additionalDamage.stack[props.skillLevel],
        attack: Constants.R.additionalDamage.attack
    }

    const max = {
        base: Constants.R.additionalDamage.stack[props.skillLevel] * 2,
        attack: Constants.R.additionalDamage.attack
    }

    return (
        <>
            アイザックが指定した地点を強く叩きつけて<Value skill="R" ratio={Constants.R.damage} />
            のスキルダメージを与え、搾取刻印のない敵を範囲の外に押し出します。対象の搾取刻印スタックに比例して、
            {
                showEquation ?
                <>
                    <span className={style["vf-overflow"]}>搾取刻印スタック1あたり対象の失った体力の{stack}%</span>
                    <span className={style.attack}>(+攻撃力の{Constants.R.additionalDamage.attack}%)</span>    
                </>
                :
                <span className={style.emphasis}>対象の失った体力の<Value skill="R" ratio={min} />% ~ <Value skill="R" ratio={max} />%</span>
            }
            に値する追加スキルダメージを与え、しばらくの間移動速度を{Constants.R.slow}%減少させます。
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