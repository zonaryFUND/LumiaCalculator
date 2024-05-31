import * as React from "react";
import Constants from "./constants.json";
import LeniValue from "./leni-value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レニの基本スキルは味方実験体に的中すると対象にクマさんが生成されます。クマさんは{Constants.T.duration}秒間維持されます。<br />
            <br />
            クマさんを獲得した味方の攻撃が敵に的中すると、クマさんが飛んで行き、<LeniValue skill="T" ratio={Constants.T.damage} />
            の追加スキルダメージを与えます。<br />
            クマさんでダメージを与えた場合、レニの基本スキルのクールダウンが{Constants.T.cooldown_reduction}秒減少します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "クールダウン減少量", values: Constants.T.cooldown_reduction}
    ]
}
