import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            アイザックが素早く突進し、{Constants.E.time_bound}秒間次のスキルを準備します。<br />
            <br />
            再使用：前方の敵を引き寄せてシールドを破壊し、<Damage {...props} skill="E" constants={Constants.E.damage} />
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