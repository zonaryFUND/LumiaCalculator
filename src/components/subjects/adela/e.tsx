import * as React from "react";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        アデラが指定した位置にルックを突撃させるとアデラの位置から目標地点まで素早く移動して
        経路上の敵に<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与え、
        経路上にポーン、クイーン、ナイトがある場合には即時ダメージ効果を発動します。<br />
        ポーンとクイーン：プロモーションの{Constants.E.pawn_queen}％のダメージを与えます。<br />
        ナイト：ナイトフォークの{Constants.E.knight.damage}％のダメージを与え、
        移動速度を{Constants.E.knight.slow.duration}秒間{Constants.E.knight.slow.effect}％減少します。<br />
        {Constants.E.reuse}秒以内にスキルを再使用するとアデラとルックの位置が変更されます。<br />
        <br />
        ルックは{Constants.E.duration}秒間維持され、ルックを再び配置すると前のルックは消えます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}