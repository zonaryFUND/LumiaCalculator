import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：スキルを使用した後、キャッシーは基本攻撃で
        <Damage skill="Q" constants={Constants.Q.additional_damage} {...props} />追加スキルダメージを与えます。<br />
        <br />
        キャッシーが指定した方向に素早く突進し、衝突するすべての敵に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。<br />
        キャッシーが敵を致命的外傷状態にさせると動脈切開術のクールダウンが{Constants.Q.cooldown_reduction[props.config.skillLevels.Q]}％減少します。
    </>
)

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
    持続効果の追加スキルダメージは最低1のダメージを与えます。<br />
    キャッシーの攻撃速度が1以上の場合、攻撃速度に比例して持続効果の基本攻撃キャスト時間が速くなります。<br />
    双剣を使用する場合、持続効果の基本攻撃は攻撃力の{Constants.Q.dual_sword}％のダメージを与えます。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "クールダウン減少量", values: Constants.Q.cooldown_reduction, percent: true},

    ]
}