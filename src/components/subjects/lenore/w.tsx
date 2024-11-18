import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノアが{Constants.W.shield.duration}秒間<Value skill="W" ratio={Constants.W.shield.effect} />のダメージを吸収するシールドを獲得し、周りの敵に
            <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えて{Constants.W.bind}秒間敵を束縛させます。<br />
            <br />
            <span className={style.emphasis}>強化効果：</span>シールド量が<span className={style.emphasis}>{Constants.W.enhance.shield}%</span>増加し、
            {Constants.W.enhance.movement_speed.duration}秒間レノアの移動速度が
            <span className={style.emphasis}>{Constants.W.enhance.movement_speed.effect}%</span>増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>このスキルの束縛効果は対象の移動を中断させます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "シールド吸収量", values: Constants.W.shield.effect.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
