import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ニッキーが敵実験体を対象に突進した後、アッパーカットして<Damage skill="R" constants={Constants.R.damage} {...props} />
            のスキルダメージを与えながら{Constants.R.airborne}秒間空中に浮かせます。短気状態では怒りを込めて攻撃し、
            <Damage skill="R" constants={Constants.R.enhanced_damage} {...props} />のスキルダメージを与えます。<br />
            <br />
            突進している間、ニッキーは阻止不可状態になります。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "対象ダメージ量", values: Constants.R.damage.base},
        {title: "強化されたダメージ量", values: Constants.R.enhanced_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
