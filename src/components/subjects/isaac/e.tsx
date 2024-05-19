import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            アイザックが素早く突進し、{Constants.E.time_bound}秒間次のスキルを準備します。<br />
            <br />
            再使用：前方の敵を引き寄せてシールドを破壊し、<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを与えて{Constants.E.stun}秒間気絶させます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}