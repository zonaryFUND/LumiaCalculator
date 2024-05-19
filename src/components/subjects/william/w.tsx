import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ウィリアムが指定した方向へ強いボールを投げて経路上の敵に
        <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与え、
        {Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}
        %減少させます。その後、野球ボールは再びウィリアムに戻って、経路上の敵に同一効果を与えながらキャッチボールスタックを獲得します。投げたボールと戻るボール両方に的中した対象は
        {Constants.W.stun}秒間気絶します。<br />
        <br />
        <span className={style.level}>マウンド</span>
        ：ウィリアムが{Constants.W.mound_duration}
        秒間維持されるマウンドを生成し、範囲内の敵を突き飛ばします。マウンドの上ではキャッチボールで弾け飛んだ野球ボールがウィリアムへ戻り、基本攻撃の射程距離が
        {Constants.W.range}増加します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base}
    ]
}