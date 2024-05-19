import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            カティアが弾丸を発射して初めて的中した敵に
            <Value skill="Q" ratio={Constants.Q.min_damage} /> ~ <Value skill="Q" ratio={Constants.Q.max_damage} />
            のスキルダメージを与えます。<br />
            弾丸が飛んで行った距離に比例してダメージ量が増加します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.Q.min_damage.base},
        {title: "最大ダメージ量", values: Constants.Q.max_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
