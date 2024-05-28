import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートが{Constants.R.duration}秒間ギターを演奏し、範囲内のすべての対象を踊らせます。<br />
            ギターを演奏している間、{Constants.R.heal_tick}秒ごとに自分の体力を<Value skill="R" ratio={Constants.R.heal} />回復します。<br />
            <br />
            <span className={style.enhance}>進化効果</span>：ギターを演奏している間、範囲内の味方の体力が回復します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>踊っている間、移動速度が{Constants.R.movement_speed}に固定され、基本攻撃またはスキルを使用できません</>,
    parameters: [
        {title: "体力回復量", values: Constants.R.heal.base},
        {title: "合計攻撃力", values: Constants.R.heal.attack, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
