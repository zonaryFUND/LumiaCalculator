import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const lyanhq: React.FC<SubjectSkillProps> = props => {
    return (
        <>
             <span className={style.enhance}>人間状態</span>：悪霊がイアンを操ります。短剣で対象を突き刺して
             <Value skill="Q" ratio={Constants.LyAnhQ.damage} />
             のスキルダメージを与えます。的中した場合、クールダウンが{Constants.LyAnhQ.on_hit_cooldown}秒になります。<br />
             <br />
             <span className={style.enhance}>憑依状態</span>：憑依されたイアンが指定した範囲内の対象に
             <Value skill="Q" ratio={Constants.GhostQ.damage} />のスキルダメージを与えて
             {Constants.GhostQ.bind}秒間束縛させます。
        </>
    );
}

export default lyanhq;

export const values: ValuesProps = {
    additionalInfo: <>スキルを使用すると、[侵食]を{Constants.LyAnhQ.thrash}獲得します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.LyAnhQ.damage.base},
        {title: "[締め付ける指先]ダメージ量", values: Constants.GhostQ.damage.base},
        {title: "クールダウン", values: Constants.LyAnhQ.cooldown}
    ]
}
