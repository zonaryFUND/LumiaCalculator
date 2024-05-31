import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>空想</span>：一定時間ごとに基本攻撃に<Value skill="T" ratio={Constants.T.basic_attack_damage} />のスキルダメージが追加されます。<br />
            <br />
            <span className={style.level}>夢幻の蝶</span>：ヴァーニャのスキルが敵に的中した場合、敵に<span className={style.emphasis}>夢幻の蝶</span>
            スタックを1与えます。夢幻の蝶が{Constants.T.max_stack}スタックになると、幻想の中の蝶が現れて敵に<span className={style.emphasis}>{Constants.T.duration}</span>秒間
            <Value skill="T" ratio={Constants.T.damage_over_time} />の持続スキルダメージを与え、ヴァーニャには<Value skill="T" ratio={Constants.T.shield} />のダメージを吸収するシールドを付与します。<br />
            <br />
            シールド量は毎秒<Value skill="T" ratio={Constants.T.shield_decline} overrideExpression={{level: {format: "ヴァーニャのレベル1あたり{ratio}", className: style.amp}}} />ずつ減少し、シールド量の最大値は<Value skill="T" ratio={Constants.T.max_shield} />を超えません。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "空想ダメージ量", values: Constants.T.basic_attack_damage.base},
        {title: "クールダウン", values: Constants.T.cooldown.constant},
        {title: "夢幻の蝶持続ダメージ", values: Constants.T.damage_over_time.base},
        {title: "夢幻の蝶シールド獲得", values: Constants.T.shield.base},
        {title: "夢幻の蝶シールド最大", values: Constants.T.max_shield.base}
    ]
}