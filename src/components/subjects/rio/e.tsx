import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            短弓：指定した方向へ飛び上がり、基本攻撃の射程距離内の最大{Constants.E.max_target}人の敵に2本の矢を発射し、それぞれ
            <Value skill="E" ratio={Constants.E.hankyu_damage} />のスキルダメージを与えます。敵にダメージを与えた場合、皆中のスタックが最大になります。<br />
            <br />
            和弓：指定した方向へ飛び上がり、基本攻撃の射程距離内の最大{Constants.E.max_target}人の敵に1本の矢を発射して
            <Value skill="E" ratio={Constants.E.daikyu_damage} />のスキルダメージを与え、対象の周辺{Constants.E.daikyu_range}mに
            <Value skill="E" ratio={Constants.E.daikyu_range_damage} />の範囲スキルダメージを与えます。敵にダメージを与えた場合、皆中のスタックが最大になります。
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
