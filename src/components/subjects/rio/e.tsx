import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            短弓：指定した方向へ飛び上がり、基本攻撃の射程距離内の最大{Constants.E.max_target}人の敵に2本の矢を発射し、それぞれ
            <Damage skill="E" constants={Constants.E.hankyu_damage} {...props} />のスキルダメージを与えます。敵にダメージを与えた場合、皆中のスタックが最大になります。<br />
            <br />
            和弓：指定した方向へ飛び上がり、基本攻撃の射程距離内の最大{Constants.E.max_target}人の敵に1本の矢を発射して
            <Damage skill="E" constants={Constants.E.daikyu_damage} {...props} />のスキルダメージを与え、対象の周辺{Constants.E.daikyu_range}mに
            <Damage skill="E" constants={Constants.E.daikyu_range_damage} {...props} />の範囲スキルダメージを与えます。敵にダメージを与えた場合、皆中のスタックが最大になります。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "短弓ダメージ量", values: Constants.E.hankyu_damage.base},
        {title: "和弓ダメージ量", values: Constants.E.daikyu_damage.base},
        {title: "和弓追加ダメージ量", values: Constants.E.daikyu_range_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
