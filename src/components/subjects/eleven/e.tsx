import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            チャージ：Elevenがハンバーガーフォークに乗って指定した地点にジャンプする準備をします。チャージ時間に比例して移動距離が増加します。
            Elevenがハンバーガーフォークに乗って指定した地点にジャンプし、敵に
            <Value skill="E" ratio={Constants.E.min_damage} /> ~ <Value skill="E" ratio={Constants.E.max_damage} />
            のスキルダメージを与えながら押し出します。飛んで行く間、Elevenはすべての妨害効果免疫状態になります。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>チャージ中にスキルがキャンセルされたり、スキルを使用しなかった場合、クールダウンの{Constants.common.return_cooldown}%が返されます。</>,
    parameters: [
        {title: "最小ダメージ量", values: Constants.E.min_damage.base},
        {title: "最大ダメージ量", values: Constants.E.max_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}