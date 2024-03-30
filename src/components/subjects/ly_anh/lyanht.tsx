import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const lyanht: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>侵食</span>
            ：イアンは基本攻撃やスキルを使用すると侵食が始まります。侵食が100まで進むと憑依状態になります。非戦闘状態の場合、1秒あたり
            {Constants.LyAnhT.thrash_decline}ずつ減少します。<br />
            <br />
            イアンは悪霊に身体を乗っ取られないように抵抗し続けています。イアンは各状態によって基本攻撃のダメージ量が変わります。<br />
            人間状態：<span className={style.attack}>攻撃力の{Constants.LyAnhT.human_basic_attack.attack}％</span><br />
            憑依状態：<span className={style.attack}>攻撃力の{Constants.LyAnhT.possessed_basic_attack.attack}％</span><br />
            悪霊状態：<span className={style.attack}>攻撃力の{Constants.LyAnhT.ghost_basic_attack.attack}％</span><br />
            <br />
            イアンは自分の中にいる悪霊によって無意識的な残虐性に目覚めます。憑依・悪霊状態ではスキルダメージに
            <Damage skill="T" constants={Constants.LyAnhT.additional_damage} {...props} />
            の追加固定ダメージを与えます。憑依状態では固定ダメージの{Constants.LyAnhT.possesed_heal}％、悪霊状態では{Constants.LyAnhT.ghost_heal}％の体力を回復します。
        </>
    );
}

export default lyanht;

export const values: ValuesProps = {
    additionalInfo: <>基本攻撃をすると、[侵食]を{Constants.LyAnhT.thrash}獲得します。</>,
    parameters: [
        {title: "追加固定ダメージ", values: Constants.LyAnhT.additional_damage.attack, percent: true}
    ]
}
