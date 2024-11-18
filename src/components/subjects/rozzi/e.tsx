import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ロッジが指定した対象をジャンプして飛び越えながら、対象がいた位置に銃を発射し、<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて
            {Constants.E.stun}秒間気絶させます。<br />
            ロッジはジャンプしている間、対象指定不可状態になります。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
