import * as React from "react";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アデラが空中に浮かんで{Constants.R.channel}
        秒間すべてのダメージを受けない状態になり、着地しながら範囲内の敵に
        <Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与えます。<br />
        スキルをキャストする時、配置した駒の数に応じて敵の最大体力の{Constants.R.per_piece.targetMaxHP}％の固定ダメージを与えます。<br />
        着地する時、すべてのチェス駒は{Constants.R.other_pieces}％のダメージ効果を発動して消えます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}