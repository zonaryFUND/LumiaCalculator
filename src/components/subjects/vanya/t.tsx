import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import skillDamage from "../skill-damage";

const t: React.FC<SubjectSkillProps> = props => {
    const shieldDecline = (() => {
        if (props.showEquation) {
            return <>
                <span className={style.emphasis}>{Constants.T.shield_decline.base}</span>
                <span className={style.amp}>(+ヴァーニャのレベル1あたり{Constants.T.shield_decline.perLevel})</span>
            </>
        } else {
            const value = skillDamage(props.status, props.config, "T", Constants.T.shield_decline);
            return <span className={style.emphasis}>{value.toString()}</span>
        }
    })();

    return (
        <>
            <span className={style.level}>空想</span>：一定時間ごとに基本攻撃に<Damage skill="T" constants={Constants.T.basic_attack_damage} {...props} />のスキルダメージが追加されます。<br />
            <br />
            <span className={style.level}>夢幻の蝶</span>：ヴァーニャのスキルが敵に的中した場合、敵に<span className={style.emphasis}>夢幻の蝶</span>
            スタックを1与えます。夢幻の蝶が{Constants.T.max_stack}スタックになると、幻想の中の蝶が現れて敵に<span className={style.emphasis}>{Constants.T.duration}</span>秒間
            <Damage skill="T" constants={Constants.T.damage_over_time} {...props} />の持続スキルダメージを与え、ヴァーニャには<Damage skill="T" constants={Constants.T.shield} {...props} />のダメージを吸収するシールドを付与します。<br />
            <br />
            シールド量は毎秒{shieldDecline}ずつ減少し、シールド量の最大値は<Damage skill="T" constants={Constants.T.max_shield} {...props} />を超えません。
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