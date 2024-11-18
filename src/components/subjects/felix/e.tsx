import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const e: React.FC<SubjectSkillProps> = props => {
    const { status, showEquation } = useValueContext();
    // Omnisyphon buff will be aquired even without Spearwaving stacks, but the in-game description states that the minimum value of Omnisyphon effect is the value at ONE Spearwaving stack.
    const omnisyphon = (() => {
        const duration = Constants.E.omnisyphon.duration;
        const base = Constants.E.omnisyphon.effect.perStack;
        const attack = Constants.E.omnisyphon.effect.attack;

        if (showEquation) {
            return <>{duration}秒間ダメージ吸血を<span className={style.emphasis}>消耗した1スタックあたり{base}%</span><span className={style.attack}>(+攻撃力の{attack}%)</span></>
        } else {
            const zero = status.attackPower.calculatedValue.percent(attack)
            return <>
                消耗した連携攻撃のスタックに比例して{duration}秒間ダメージ吸血を
                <span className={style.emphasis}>{zero.add(1).toString()}%</span> ~ <span className={style.emphasis}>{zero.add(Constants.T.max_stack).toString()}%</span>
            </>
        }
    })();

    return (
        <>
            フェリックスが後ろに跳躍しながら正面範囲の対象に<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを与え、跳躍する間、基本攻撃を回避します。基本攻撃回避に成功すると、<span className={style.emphasis}>連携攻撃</span>
            のスタックが増加します。3回目の連携で使用する時には他の効果が適用されます。<br />
            <br />
            <span className={style.emphasis}>3回目の連携</span>：<Value skill="E" ratio={Constants.E.enhanced_damage} />
            のスキルダメージを与えます。敵に的中させた場合、共有クールダウンを{Constants.E.cooldown_reduction}秒減少させ、{omnisyphon}増加させます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは最後に使用する時のみ壁を超えることができます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "3回目の連携ダメージ量", values: Constants.E.enhanced_damage.base},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
