import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import { equipmentStatus } from "app-types/equipment";

const q: React.FC<SubjectSkillProps> = props => {
    const weaponType = props.config.equipment.weapon ? equipmentStatus(props.config.equipment.weapon).type : undefined;
    return (
        <>
            雪の次の基本攻撃が<Damage skill="Q" constants={weaponType == "dual_swords" ? Constants.Q.dual_sword_damage : Constants.Q.damage} {...props} />の基本攻撃ダメージを与えて
            {Constants.Q.slow.duration}秒間敵の移動速度を{Constants.Q.slow.effect}％減少させます。<br />
            <br />
            端正な服装のボタンがある場合、{Constants.Q.stun}秒間気絶させます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>使用中、基本攻撃の射程距離が少し増加します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}