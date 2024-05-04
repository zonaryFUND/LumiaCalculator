import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const maxDamage = {
    base: Constants.R.min_damage.base.map(v => v * Constants.R.max_damage_ratio),
    amp: Constants.R.min_damage.amp * Constants.R.max_damage_ratio
}

const r: React.FC<SubjectSkillProps> = props => {
    const heal = (() => {
        const ampRatio = Constants.R.heal.targetMaxHP.amp;
        const hpRatio = Constants.R.heal.targetMaxHP.base;
        if (props.showEquation) {
            return <>最大体力の{hpRatio}％<span className={style.amp}>(+スキル増幅の{ampRatio}％)</span></>
        } else {
            return <>{props.status.skillAmp.percent(ampRatio).toString()}％<span className={style.maxhp}>(+最大体力の{hpRatio}％)</span></>
        }
    })()

    return (
        <>
            <span className={style.level}>持続効果</span>：キャッシーが瀕死状態の味方を回復させると味方の体力を{Constants.R.heal_duration}
            秒間1秒あたり{heal}ずつ回復させるエリアを生成します。<br />
            <br />
            指定した方向へノコギリを振り回しながら素早く移動し、範囲内の敵に失った体力に比例して
            <Damage skill="R" constants={Constants.R.min_damage} {...props} /> ~ <Damage skill="R" constants={maxDamage} {...props} />
            のスキルダメージを与えてすぐに致命的外傷を付与します。攻撃した範囲に{Constants.R.heal_duration}秒間体力を1秒あたり{heal}ずつ回復させるエリアを生成します。<br />
            <br />
            移動する間、阻止不可状態になります。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.R.min_damage.base},
        {title: "最大ダメージ量", values: maxDamage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}