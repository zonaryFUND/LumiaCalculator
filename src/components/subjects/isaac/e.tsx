import * as React from "react";
import Constants from "./constants.json";
import { Status } from "components/subject/use-status";
import Damage from "../damage";
import { ValuesProps } from "../values";

const e: React.FC<Status> = status => {
    return (
        <>
            アイザックが素早く突進し、{Constants.E.time_bound}秒間次のスキルを準備します。<br />
            <br />
            再使用：前方の敵を引き寄せてシールドを破壊し、<Damage skill="E" constants={Constants.E.damage} />の
            スキルダメージを与えて{Constants.E.stun}秒間気絶させます。
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