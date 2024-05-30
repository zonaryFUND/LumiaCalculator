import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import martina from "./martina.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.common}>監視カメラ</span>と<span className={style.common}>木の枝</span>を組み合わせて潜入効果を持つ<span className={style.uncommon}>偽装カメラ</span>を製作できます。
            <br />
            マルティナの4K UHDカメラは基本攻撃をするたび<Value skill="T" ratio={Constants.T.damage} />のダメージを与えて電力を消耗し、充電が完了するまで基本攻撃ができません。充電時間は
            <span className={style.emphasis}>録画</span>スキルレベルが高いほど減少します。<br />
            充電にかかる時間: {Constants.T.battery_charge}秒<br />
            <br />
            <br />
            マルティナの基本攻撃は対象の視界を獲得し、攻撃速度{Constants.T.attack_speed_conversion.from}%が上がるたび、攻撃力が{Constants.T.attack_speed_conversion.to}%増加します。<br />
            <br />
            <span className={style.emphasis}>[取材中]</span>
            従軍記者であるマルティナは取材中、交戦中の地域を直感的に把握できます。{Constants.T.engagement_ping_range}m範囲内で敵実験体が交戦した地点に特殊なピングが表示されます。<br />
            マルティナが敵に基本攻撃を{Constants.T.mark_threshold}回連続でダメージを与えると、刻印を付与します。刻印が付与された敵にスキルが的中すると、刻印が消耗され
            <Value skill="T" ratio={Constants.T.mark_damage} />のスキルダメージを与えます。<br />
            <br />
            <span className={martina.broadcast}>[放送中]</span><br />
            基本攻撃が<Value skill="T" ratio={Constants.T.broadcasting_damage} />のダメージを与え、刻印が付与された敵にスキルが的中すると刻印を消耗して
            <Value skill="T" ratio={Constants.T.broadcasting_mark_damage} />のスキルダメージを与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "[取材中]刻印ダメージ量攻撃力係数", values: Constants.T.mark_damage.attack, percent: true},
        {title: "[放送中]刻印ダメージ量攻撃力係数", values: Constants.T.broadcasting_mark_damage.attack, percent: true}
    ]
}
