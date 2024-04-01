import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果</span>：保安コンソールの操作をドローンが代わりに行います。<br />
            <br />
            ドローンは指定した位置まで飛んで行き、視界を確保できる偵察用のダーツ弾を発射します。ダーツ弾によって発見された敵実験体は
            {Constants.W.enemy_reveal}秒間姿が現れ、ダーツ弾が目標地点に到着すると波動を起こしてトラップとカメラの体力を1にします。<br />
            波動は{Constants.W.duration}秒間その場に残って視界を提供します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: (
        <>
            ドローンが保安コンソール占有している時にカティアがスキルを使用できなくなるCCに的中されたり、<span className={style.enhance}>灰色の死神 - ボーナス</span>が発動する場合、占有がキャンセルされます。<br />
            ドローンの保安コンソール作動では地域内に残ったアイテムの数を確認できません。
        </>
    ),
    parameters: [
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
