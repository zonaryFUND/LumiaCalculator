import * as React from "react";
import Constants from "./constants.json";
import style from "./adina.module.styl";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import baseStyle from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const e: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    const moonHeal = (() => {
        if (showEquation) {
            return <>(ダメージ量の{Constants.E.star}%)</>;
        } else {
            return <Value skill="E" ratio={Constants.E.damage} multiplier={50} />;
        }
    })();
    
    return (
        <>
            敵または味方に天体をつけ、敵には<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを与えます。天体はしばらくして落下し、円形範囲の敵に
            <Value skill="E" ratio={Constants.E.drop_damage} />のスキルダメージを与えます。<br />
            <br />
            <span className={baseStyle.emphasis}>天体追加効果</span><br />
            <span className={style.sun}>太陽</span>：それぞれのダメージ量が<Value skill="E" ratio={Constants.E.sun} />
            増加します。<br />
            <span className={style.moon}>月</span>：範囲内の敵を{Constants.E.moon}秒間気絶させます。<br />
            <span className={style.star}>星</span>：素早く落下し、味方にはダメージの代わりに体力を
            <span className={baseStyle.emphasis}>{moonHeal}</span>回復させます。<br />
            <br />
            <span className={style.star}>星コンジャンクション効果</span>：
            星が連続になると、落下した星が{Constants.E.conjunction}秒間星雲を残し、毎秒味方の体力を
            <Value skill="R" ratio={Constants.R.star_conjunction.hp} />
            、スタミナを<Value skill="R" ratio={Constants.R.star_conjunction.sp} />ずつ回復させます。
        </>
    )
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.E.damage.base},
        {title: "落下ダメージ量", values: Constants.E.drop_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
