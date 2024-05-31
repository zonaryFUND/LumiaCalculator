import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const arcana: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            自分の周りを回るVFエネルギー球体を{Constants.arcana.count}個を生成します。生成された球体は近くの敵に向かって飛んで行き、対象とその周りに
            <Value skill="D" ratio={Constants.arcana.damage} />のスキルダメージを与えます。<br />
            <br />
            対象が野生動物の場合、ダメージ量が<span className={style.emphasis}>{Constants.arcana.animal_enhance}%</span>増加します。
        </>
    );
}

export default arcana;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.arcana.damage.base},
        {title: "クールダウン", values: Constants.arcana.cooldown}
    ]
}