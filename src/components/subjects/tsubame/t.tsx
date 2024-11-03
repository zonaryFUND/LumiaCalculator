import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();
    const damage = (() => {
        if (showEquation) {
            return <>
                <span className={style.emphasis}>{Constants.T.damage.base}</span>
                <span className={style.attack}>(+追加攻撃力の{Constants.T.damage.additionalAttack}%)</span>
                <span className={style.maxhp}>(+対象の最大体力の{Constants.T.damage.targetMaxHP.base[props.skillLevel]}</span>
                <span className={style.attack}>(+追加攻撃力の{Constants.T.damage.targetMaxHP.additionalAttack}%)</span>
                <span className={style.maxhp}>%)</span>
            </>
        } else {
            return <Value skill="T" ratio={Constants.T.damage} />;
        }
    })()

    return (
        <>
            つばめの基本攻撃は{Constants.T.stack_duration}秒間<span className={style.emphasis}>秘技 - 生死の刻印</span>
            スタックを残します。{Constants.T.max_stack}スタックになると、つばめが攻撃をする時、
            <span className={style.emphasis}>秘技 - 生死の刻印</span>を切り刻んで
            {damage}のスキルダメージを与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>
        <span className={style.emphasis}>秘技 - 生死の刻印</span>スタックは最大1人の敵対象にのみ残すことができます。新しい対象にスタックを残した場合、元のスタックはなくなります。
    </>,
    parameters: [
        {title: "最大体力ダメージ(%)", values: Constants.T.damage.targetMaxHP.base}
    ]
}