import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import Value from "components/tooltip/value";
import Decimal from "decimal.js";
import { Status } from "components/subject/status";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";
import { } from "typescript";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            つばめが敵対象に向かって素早く移動しながら経路上のすべての敵に<Value skill="R" ratio={Constants.R.damage} />
            のスキルダメージを与えます。<br />
            <br />
            <span className={style.emphasis}>秘技 - 生死の刻印</span>が{Constants.T.max_stack}スタックの対象に
            <span className={style.emphasis}>日車流暗殺術</span>でダメージを与えると、
            <span className={style.emphasis}>秘技 - 生死の刻印</span>の効果が適用され、
            <span className={style.emphasis}>日車流暗殺術</span>のクールダウンが
            {Constants.R.cooldown_reduction}%減少します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>クールダウン固定：このスキルはクールダウン減少の影響を受けません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown.constant}
    ]
}