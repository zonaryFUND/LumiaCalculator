import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        キャッシーが糸を通した針を投げて敵に<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて
        {Constants.E.bind}秒間束縛します。敵に的中すると針が貫通し最大1人の敵を追加で攻撃できます。<br />
        貫通した針で敵を的中すると、先に的中した敵を後で的中した敵の方に突き飛ばします。<br />
        二人が衝突した場合、{Constants.E.stun}秒間気絶状態になって<Value skill="E" ratio={Constants.E.knockback_damage} />
        の追加スキルダメージを受けます。貫通した針が壁に衝突すると最初に的中した敵を壁に突き飛ばして{Constants.E.stun}秒間気絶させ、
        <Value skill="E" ratio={Constants.E.knockback_damage} />の追加スキルダメージを与えます。<br />
        <br />
        縫合の衝突ダメージは外傷スタックを与えません。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "追加されたダメージ量", values: Constants.E.knockback_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}