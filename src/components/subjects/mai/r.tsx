import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した味方または自分をショールで身を包んで{Constants.R.supression}秒間何のダメージも受けない制圧状態にさせます。解除される時、
            <Value skill="R" ratio={Constants.R.heal} />の体力を回復させて<span className={style.emphasis}>ショール・ベール</span>の効果を発動させます。<br />
            味方に使用すると、自分の前に引き寄せます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "体力回復量", values: Constants.R.heal.base},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
