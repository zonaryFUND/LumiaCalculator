import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エレナが指定した方向に回転しながら経路上の敵に<Value skill="W" ratio={Constants.W.damage} />
            のスキルダメージを与え、<span className={style.emphasis}>クリスタルエレガンス</span>のクールダウンを
            {Constants.W.q_cooldown_reduction}%減少させて自分の防御力を{Constants.W.defense}
            %増加させます。<br />
            <br />
            <span className={style.emphasis}>氷床地帯</span>で使用すると、<span className={style.emphasis}>ダブルアクセル</span>
            の移動距離が増加し、<span className={style.emphasis}>ダブルアクセル</span>のクールダウンが{Constants.W.enhanced_cooldown_reduction}%返されます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>ダブルアクセルは最大{Constants.W.charge.max}回まで使用できます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "チャージ時間", values: Constants.W.charge.time},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
