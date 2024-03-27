import { Status } from "components/subject/use-status";
import * as React from "react";
import Constants from "./constants.json";
import { FormulaContext } from "../damage";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import Decimal from "decimal.js";
import Damage from "../damage";

export function StaticDamage(status: Status): Decimal {
    const base = Constants.R.damage.base[status.skillLevels.R];
    return status.attackPower.times(Constants.R.damage.attack).dividedBy(100).add(base);
}

export function TargetMaxHPDependentDamage(status: Status): Decimal {
    const base = Constants.R.damage.enemyMaxHP.base[status.skillLevels.R];
    return status.additionalAttackPower.times(Constants.R.damage.enemyMaxHP.additionalAttack).add(base);
}

const r: React.FC<Status> = status => {
    const formula = React.useContext(FormulaContext);
    const damage = formula ?
        <>
            <span className={style.emphasis}>{Constants.R.damage.base[status.skillLevels.R]}</span>
            <span className={style.attack}>(+攻撃力の{Constants.R.damage.attack}％)</span>
            <span className={style.maxhp}>
                (+対象の最大体力の{Constants.R.damage.enemyMaxHP.base[status.skillLevels.R]}％
                <span className={style.maxhp}>
                    (+追加攻撃力1あたり{Constants.R.damage.enemyMaxHP.additionalAttack}％)    
                </span>                    
                )
            </span>
        </>
        :
        <>
            <span className={style.emphasis}>
                {StaticDamage(status).toString()}
            </span>
            <span className={style.maxhp}>
                (対象の最大体力の{TargetMaxHPDependentDamage(status).toString()}％)
            </span>
        </>

    return (
        <>
            <span className={style.level}>持続効果</span>：つばめの基本攻撃に命中された敵は
            {Constants.R.mark_duration}秒間維持される刻印が刻まれます。
            刻印は最大{Constants.R.max_mark}スタックまで刻まれ、最大スタックになった対象はつばめに視界を共有します。<br />
            <br />
            刻印が最大スタックになった敵対象が射程距離の中にいる場合に使用できます。
            刻印が最大スタックになった敵対象がいる方向に向かって素早く移動し、刻まれた刻印を切り落として
            {damage}のスキルダメージを与え、<Damage skill="R" constants={Constants.R.heal} />の体力を回復します。<br />
            <br />
            敵実験体にダメージを与えた場合、<span className={style.emphasis}>忍び足</span>のクールダウンは
            {Constants.R.w_cdr}％、<span className={style.emphasis}>変わり身の術</span>のクールダウンは
            {Constants.R.t_cdr}％減少し、{Constants.R.stack_duration}秒間
            <span className={style.emphasis}>刻まれた戦闘感覚</span>を呼び起こします。<br />
            <span className={style.emphasis}>刻まれた戦闘感覚</span>は最大{Constants.R.max_stack}回まで
            スタックされ、1スタックあたり<span className={style.emphasis}>秘技 - 生死の刻印</span>の
            ダメージ量が{Constants.R.damage_increase_per_stack}％増加します。<br />
            <br />
            <span className={style.emphasis}>身代わり</span>を対象にして使用する場合、
            <span className={style.emphasis}>身代わり</span>の位置に素早く移動し、位置を入れ替えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        秘技 - 生死の刻印はクールダウン減少能力値の影響を受けません。<br />
        刻印は最大1人の対象者にのみ刻むことができます。新しい対象に刻印を残す場合、元の刻印はなくなります。<br />
        刻印は対象がつばめから{Constants.R.stack_retain_range}m以上離れるとすぐに消えます。<br />
        つばめが秘技 - 生死の刻印をすでに刻んだ対象には{Constants.R.reuse_limit}秒間新しい刻印を刻むことができません。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "最大体力比例ダメージ量", values: Constants.R.damage.enemyMaxHP.base, percent: true},
        {title: "体力回復量", values: Constants.R.heal.base}
    ]
}