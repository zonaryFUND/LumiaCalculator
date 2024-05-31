import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            彰一が敵または自分が設置した短剣に素早く移動し、経路上の敵に<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えます。<br />
            短剣を回収するとスキルのクールダウンが初期化されます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
