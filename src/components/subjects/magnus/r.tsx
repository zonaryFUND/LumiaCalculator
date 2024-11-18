import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マグヌスがバイクのエンジンをかけて{Constants.R.duration}秒間、真の男の疾走を始め、根性スタックを
            {Constants.R.stack_gain[props.skillLevel]}獲得します。バイクの速度は段々速くなってエンジン始動から
            {Constants.R.max_speed}秒後、最大速度になります。バイクが敵や壁に衝突すると、<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与えます。<br />
            <br />
            スキルを再使用すると、バイクだけ前方に走らせ、マグヌスはバイクから即時脱出します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "スタック獲得量", values: Constants.R.stack_gain},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
