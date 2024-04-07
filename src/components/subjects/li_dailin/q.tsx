import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ダイリンが前方に突進し、範囲内の敵に<Damage skill="Q" constants={Constants.Q.damage} {...props} />
            のスキルダメージを与えます。 このスキルは{Constants.Q.count}回使用できます。<br />
            <br />
            <span className={style.strong}>酔拳</span>：酔いを{Constants.Q.bac}
            消耗して突進する距離を増やし、ダメージ量を<Damage skill="Q" constants={Constants.Q.enhanced_damage} {...props} />まで増加させます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは最後に使用する時のみ壁を超えることができます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "酔拳強化ダメージ量", values: Constants.Q.enhanced_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
