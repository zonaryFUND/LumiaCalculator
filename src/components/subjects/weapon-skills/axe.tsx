import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";
import style from "components/tooltip/tooltip.module.styl";

const axe: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した方向に進みながら斧を振り回して範囲内のすべての敵に<Damage skill="D" constants={Constants.axe.damage} {...props} />
            のスキルダメージを与えます。与えたダメージの{Constants.axe.heal}％を体力に回復します。
        </>
    );
}

export default axe;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは壁を越えられません。<br />
        野生動物に{Constants.axe.animal}％のダメージを与えます。<br />
        <br />
        武器熟練度<span className={style.emphasis}>5Lv・10Lv・15Lv</span>の時にスキルレベルアップ<br />
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.axe.damage.base},
        {title: "追加攻撃力係数", values: Constants.axe.damage.additionalAttack, percent: true},
        {title: "クールダウン", values: Constants.axe.cooldown},
    ]
}