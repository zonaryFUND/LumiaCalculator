import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        アビゲイルが空間を切り開いて敵に<Damage skill="W" constants={Constants.W.damage} {...props} />
        のスキルダメージを与え、スキルを的中した場合には{Constants.W.shield.duration}秒間
        <Damage skill="W" constants={Constants.W.shield.amount} {...props} />のダメージを吸収するシールドを獲得します。<br />
        複数の敵に的中した場合には追加で的中した敵の数ごとにシールド量が{Constants.W.additional_shield}
        ％増加します。(最大{Constants.W.additional_shield_max}％)<br />
        <br />
        スキルに的中された対象には<span className={style.emphasis}>座標</span>を残します。<br />
        座標は{Constants.W.coordinates}秒間維持され、対象の視界が提供されます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "シールド吸収量", values: Constants.W.shield.amount.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}