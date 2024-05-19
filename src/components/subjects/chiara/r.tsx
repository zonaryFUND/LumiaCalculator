import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        キアラが暴走して羽を広げ、暴走ゲージが残っている間変身します。暴走している間、キアラの基本攻撃の射程距離が
        {Constants.R.range}増加し、最大体力が{Constants.R.maxHP[props.skillLevel]}増加します。この時、1秒ごとに
        {Constants.R.gauge_consumption}の暴走ゲージを消耗します。暴走している間、範囲内の敵に1秒あたり
        <Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与え、対象の1人あたり
        <Value skill="R" ratio={Constants.R.heal} />の体力を回復し、暴走ゲージを
        {Constants.R.gauge_gain}獲得します。暴走中のキアラは審判を下すことができます。<br />
        <br />
        審判：対象の位置に素早く落下し、<Value skill="R" ratio={Constants.R.finish_damage} />
        の固定ダメージを与えます。対象の烙印スタック1あたりダメージ量が{Constants.R.additional_damage_per_stack}
        %増加します。審判で実験体を倒した場合には暴走状態が初期化されて審判を再び使用することができます。実験体を倒せなかった場合、暴走状態が終了されます。
    </>
)

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        審判使用後、対象に向かって落下する間、対象指定不可状態になります。<br />
        対象が野生動物の場合には回復量が{Constants.R.animal_heal}%、暴走ゲージの獲得量は{Constants.R.animal_gauge}%のみ適用されます。<br />
        暴走ゲージは{Constants.R.gauge_consumption_acceleration.after}秒後に1秒あたりの減少量が{Constants.R.gauge_consumption_acceleration.effect}%増加します。
    </>,
    parameters: [
        {title: "持続ダメージ量", values: Constants.R.damage.base},
        {title: "審判ダメージ量", values: Constants.R.finish_damage.base},
        {title: "最大体力増加量", values: Constants.R.maxHP},
        {title: "体力回復量", values: Constants.R.heal.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}