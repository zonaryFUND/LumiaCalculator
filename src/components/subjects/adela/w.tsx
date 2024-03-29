import * as React from "react";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        アデラが指定した位置にナイトを配置して<Damage skill="W" constants={Constants.W.damage} {...props} />
        のスキルダメージを与えた後、再びジャンプして到着地点に<Damage skill="W" constants={Constants.W.damage} {...props} />
        のスキルダメージを与えます。<br />
        最初に配置される時、近くにポーン、クイーン、ルックがあるとナイトの着地地点の反対側に押し出し、それぞれ異なる効果を与えます。<br />
        ポーンとクイーン：移動中、的に遭遇すると止まってプロモーションの{Constants.W.pawn_queen.damage}％のダメージを与え、
        {Constants.W.pawn_queen.airborne}秒間空中に浮かせます。<br />
        ルック：移動して経路上の敵にキャスリングの{Constants.W.rook.damage}％のダメージを与え、空中に
        {Constants.W.rook.airborne}秒間浮かせます。<br />
        <br />
        ナイトは{Constants.W.duration}秒間維持され、ナイトを再び配置すると前のナイトは消えます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}