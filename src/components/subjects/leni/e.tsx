import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import skillDamage from "../skill-damage";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レニがエアーホーンガンを発射します。<br />
            敵または味方にそれぞれ違う効果が適用されます。<br />
            <br />
            敵：<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与え、{Constants.E.stun}秒間気絶させます。<br />
            味方：{Constants.E.duration}秒間<Damage skill="E" constants={Constants.E.shield} {...props} />のシールドを付与します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>味方実験体に的中した場合、レニも同じ効果を受けます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "味方のシールド吸収量", values: Constants.E.shield.base},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
