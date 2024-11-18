import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノアが演奏しながら音波を5回発射します。初めて的中させた敵の周りにそれぞれ<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
            <br />
            <span className={style.emphasis}>強化効果：</span>ダメージ量が<span className={style.emphasis}>{Constants.Q.additional_damage}%</span>増加します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>連続で同じ敵に音波を的中させた場合にはダメージ量が<span className={style.emphasis}>{Constants.Q.same_target_reduction}%</span>減少します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
