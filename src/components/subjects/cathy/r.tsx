import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const maxDamage = {
    base: Constants.R.min_damage.base.map(v => v * Constants.R.max_damage_ratio),
    amp: Constants.R.min_damage.amp * Constants.R.max_damage_ratio
}

const r: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    const heal = showEquation ?
        <Value skill="R" ratio={Constants.R.heal} /> :
        <Value skill="R" ratio={{amp: Constants.R.heal.amp, targetMaxHP: Constants.R.heal.targetMaxHP}} />;

    return (
        <>
            <span className={style.level}>持続効果</span>：キャッシーが瀕死状態の味方を回復させると味方の体力を{Constants.R.heal_duration}
            秒間1秒あたり{heal}ずつ回復させるエリアを生成します。<br />
            <br />
            指定した方向へノコギリを振り回しながら素早く移動し、範囲内の敵に失った体力に比例して
            <Value skill="R" ratio={Constants.R.min_damage} /> ~ <Value skill="R" ratio={maxDamage} />
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