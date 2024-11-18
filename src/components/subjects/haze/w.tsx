import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            後ろに一歩下がり、前方に向けて散弾銃を発射します。的中した敵に<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与え、{Constants.W.stun}秒間気絶させます。<br />
            <br />
            <span className={style.emphasis}>サブマシンガン状態</span>または<span className={style.emphasis}>ロケットランチャー状態</span>で使用すると、武器を解除し、クールダウンを追加で
            {Constants.W.er_cooldown_reduction}%減少させます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは壁を越えられません。<br />
        <span className={style.emphasis}>散弾銃</span>を使用し、直前まで使用していた武器が解除されます。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
