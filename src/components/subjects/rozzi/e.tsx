import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ロッジが指定した対象をジャンプして飛び越えながら、対象がいた位置に銃を発射し、<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えて
            {Constants.E.stun}秒間気絶させます。<br />
            ロッジはジャンプしている間、対象指定不可状態になります。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
