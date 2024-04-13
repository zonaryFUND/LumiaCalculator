import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            フェリックスが槍先に力を入れ、前に突進しながら槍を突き出して
            <Damage skill="R" constants={Constants.R.min_damage} {...props} /> ~ <Damage skill="R" constants={Constants.R.max_damage} {...props} />
            のスキルダメージを与えます。最後まで力をチャージすると、的中した対象を{Constants.R.stun}秒間気絶させます。<br />
            スキルを使用すると、基本スキルが3回目の連携に変更され、<span className={style.emphasis}>連携攻撃</span>のスタックが{Constants.R.stack_gain}増加します。<br />
            <br />
            力をチャージする間には突進方向を変更することができ、突進する時は妨害効果免疫状態になります。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "最小ダメージ量", values: Constants.R.min_damage.base},
        {title: "最大ダメージ量", values: Constants.R.max_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
