import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マーカスが指定した方向に地面を強く打って敵に<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与え、{Constants.W.airborne}秒間空中に浮かせます。<br />
            <br />
            <span className={style.emphasis}>亀裂</span>の範囲内にいる敵に的中させた場合、的中させたすべての敵をマーカスの後ろ{Constants.W.r_combo_knockback}mの方に投げ飛ばします。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "消費", values: Constants.W.sp_cost},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
