import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const lyanhq: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>人間状態</span>：イアンが短剣に操られ、経路上の敵に
            <Value skill="E" ratio={Constants.LyAnhE.damage} />のスキルダメージを与えます。的中した場合、もう一度使用できます。<br />
            <br />
            <span className={style.enhance}>憑依状態</span>：憑依されたイアンが悪霊の手を振り下ろして
            <Value skill="E" ratio={Constants.GhostE.first_damage} />のスキルダメージを与え、対象を引き寄せながら
            <Value skill="E" ratio={Constants.GhostE.second_damage} />のスキルダメージを与えます。
        </>
    );
}

export default lyanhq;

export const values: ValuesProps = {
    additionalInfo: <>スキルを使用すると、[侵食]を{Constants.LyAnhE.thrash}獲得します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.LyAnhE.damage.base},
        {title: "[切り裂く手]振り下ろしダメージ量", values: Constants.GhostE.first_damage.base},
        {title: "[切り裂く手]引き寄せダメージ量", values: Constants.GhostE.second_damage.base},
        {title: "クールダウン", values: Constants.LyAnhE.cooldown}
    ]
}
