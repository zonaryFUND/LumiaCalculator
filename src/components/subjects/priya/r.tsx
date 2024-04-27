import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            プリヤが自然を目覚めさせる演奏をしながら大地の響きを自分の位置に残して{Constants.R.unstoppable}秒間スキルや基本攻撃が使用できない阻止不可状態になり、受けるダメージ量が
            {Constants.R.damage_reduction}％減少します。<br />
            大地の響きはプリヤがいる位置から広がって<Damage skill="R" constants={Constants.R.first_damage} {...props} />のスキルダメージを与え、外側の範囲から範囲内の敵に
            <Damage skill="R" constants={Constants.R.echo_damage} {...props} />のスキルダメージを与え、{Constants.R.dance}秒間踊らせます。<br />
            <br />
            範囲内のすべてのサラスバティの花は実を結び、プリヤや味方が実を獲得すると最大体力の{Constants.R.heal[props.config.skillLevels.R]}％をすぐ回復します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.first_damage.base},
        {title: "響きダメージ量", values: Constants.R.echo_damage.base},
        {title: "体力回復量(％)", values: Constants.R.heal, percent: true},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
