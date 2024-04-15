import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マグヌスがバイクのエンジンをかけて{Constants.R.duration}秒間、真の男の疾走を始めます。バイクの速度は段々速くなってエンジン始動から
            {Constants.R.max_speed}秒後、最大速度になります。バイクが敵や壁に衝突すると、<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与えます。<br />
            <br />
            スキルを再使用すると、バイクだけ前方に走らせ、マグヌスはバイクから即時脱出します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
