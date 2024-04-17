import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レニがニンジンバズーカを発射しながら後に少し飛ばされます。<br />
            ニンジンは射程距離の最後まで到達したり、敵または味方に的中すると爆発します。爆発範囲内の敵または味方にそれぞれ違う効果が適用されます。<br />
            敵：<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。<br />
            味方：<Damage skill="Q" constants={Constants.Q.heal} {...props} />の体力を回復させます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
        味方に適用される効果はレニにも適用されます。<br />
        このスキルは壁を越えられません。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "体力回復量", values: Constants.Q.heal.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
