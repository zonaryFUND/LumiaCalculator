import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        バーバラの基本スキルが強化されます。もう一度使用すると強化状態をキャンセルし、{Constants.R.cancel_cooldown}秒後に再び使用できます。<br />
        <br />
        <span className={style.emphasis}>BT-Mk3 強化セントリーガン</span>：指定した位置に体力<Value skill="Q" ratio={Constants.Q.hp} overrideExpression={{level: {format: "バーバラのレベル"}}} />
        の強化されたセントリーガンを設置します。強化セントリーガンは{Constants.R.Q.duration}秒間維持され、最大設置数の制限を無視することができます。<br />
        強化セントリーガンは設置されたセントリーガンに{Constants.R.Q.duration}秒間強化効果を付与し、強化効果が付与されたセントリーガンは攻撃速度が
        {Constants.R.Q.attack_speed}増加し、{Constants.R.Q.railgun_count}回目の基本攻撃ごとにレールガンを発射します。<br />
        <br />
        <span className={style.emphasis}>超高出力イオンレーザー</span>：バーバラが高出力砲でイオンレーザーを最大出力で発射し、経路上の敵に
        <Value skill="R" ratio={Constants.R.W.damage} />のスキルダメージを与え、カメラとトラップを破壊します。的中した敵は
        {Constants.R.W.dot_duration}秒間<Value skill="R" ratio={Constants.R.W.dot_damage} />のスキルダメージを受けます。敵に的中すると、
        {Constants.R.W.movement_speed.duration}秒間移動速度が{Constants.R.W.movement_speed.effect}%増加します。増加した移動速度は
        {Constants.R.W.movement_speed.duration}秒にわたって徐々に元に戻ります。<br />
        <br />
        <span className={style.emphasis}>超磁力手榴弾</span>：バーバラが強化された超磁力手榴弾を投げて敵に<Value skill="R" ratio={Constants.R.E.damage} />
        のスキルダメージを与えます。<br />
        中央部分に的中した敵は{Constants.R.E.stun}秒間気絶します。<br />
        手榴弾が爆発した後、磁力暴風地帯が発生し、範囲内の敵は{Constants.R.E.dot_tick}秒ごとに
        <Value skill="R" ratio={Constants.R.E.dot_damage} />のスキルダメージを受け、移動速度が{Constants.R.E.slow}%減少します。
    </>
)

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        BT-Mk3強化セントリーガンの能力値<br />
        基本攻擊：<Value skill="R" ratio={Constants.R.Q.damage} /><br />
        レールガン：<Value skill="R" ratio={Constants.R.Q.railgun_damage} /><br />
        防御力<span className={style.emphasis}>{Constants.R.Q.sentry_defence}</span>
    </>,
    parameters: [
        {title: "セントリーガン基本攻撃ダメージ量", values: Constants.R.Q.damage.base},
        {title: "セントリーガンレールガンダメージ量", values: Constants.R.Q.railgun_damage.base},
        {title: "超高出力異音レーザーダメージ量", values: Constants.R.W.damage.base},
        {title: "超高出力異音レーザー持続ダメージ量", values: Constants.R.W.dot_damage.base},
        {title: "超磁力手榴弾ダメージ量", values: Constants.R.E.damage.base},
        {title: "超磁力手榴弾持続ダメージ量", values: Constants.R.E.dot_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
    ]
}