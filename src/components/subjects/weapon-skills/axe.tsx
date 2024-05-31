import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { skillLevel } from "../skill-damage";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const axe: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した方向に進みながら斧を振り回して範囲内のすべての敵に<Value skill="D" ratio={Constants.axe.damage} />
            のスキルダメージを与えます。与えたダメージの{Constants.axe.heal}%を体力に回復します。
        </>
    );
}

export default axe;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは壁を越えられません。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.axe.damage.base},
        {title: "追加攻撃力係数", values: Constants.axe.damage.additionalAttack, percent: true},
        {title: "クールダウン", values: Constants.axe.cooldown},
    ]
}