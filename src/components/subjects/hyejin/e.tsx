import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヘジンが指定した方向へ移動符を飛ばして経路上の敵に<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。<br />
            スキルを再使用すると移動符の位置に瞬間移動します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "札ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
