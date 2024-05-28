import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートが指定した方向に短く移動し、周りの敵に音符を飛ばして<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを与えます。このスキルはもう1度使用することができます。<br />
            <br />
            <span className={style.enhance}>進化効果</span>：スキルの再使用回数が増加します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>スキルを進化させた後、{Constants.E.actoss_wall_count}回目の移動は壁を超えることができます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
