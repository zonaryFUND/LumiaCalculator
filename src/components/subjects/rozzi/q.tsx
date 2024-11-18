import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ロッジが指定した方向へ銃を発射して経路上の敵に<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
            銃に当たった対象がいる場合、{Constants.Q.time_bound}秒以内の次の移動命令の方向に素早く移動し、イージーショットのクールダウンが{Constants.Q.cooldown_reduction}秒減少します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
