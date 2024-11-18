import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ニッキーが敵実験体を対象に突進した後、アッパーカットして<Value skill="R" ratio={Constants.R.damage} />
            のスキルダメージを与えながら{Constants.R.airborne}秒間空中に浮かせます。短気状態では怒りを込めて攻撃し、
            <Value skill="R" ratio={Constants.R.enhanced_damage} />のスキルダメージを与えます。<br />
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
