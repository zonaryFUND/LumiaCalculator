import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートがアンプを取り出して{Constants.R.duration}秒間公演を始めます。領域内にいる間、すべての対象が死亡しなくなり、体力が
            {Constants.R.threshold}%以下になると、ダメージを受けたり体力を回復することができなくなります。<br />
            <br />
            公演が終わると領域内にいるすべての対象の体力が<Value skill="R" ratio={Constants.R.heal} />回復します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>ハートは領域内でオブジェクトと相互作用できません。</>,
    parameters: [
        {title: "体力回復量", values: Constants.R.heal.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
