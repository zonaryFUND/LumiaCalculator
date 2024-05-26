import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        つばめが自分の位置に<span className={style.emphasis}>身代わり</span>
        を残し、指定した方向に空中回転しながら{Constants.E.duration}秒間隠密状態になります。
        空中回転後、{Constants.E.reuse}秒間スキルを再度使用することができます。<br />
        <br />
        <span className={style.emphasis}>再使用：</span>つばめが<span className={style.emphasis}>身代わり</span>
        の位置と入れ替わります。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>
        <span className={style.emphasis}>霧隠れの術</span>によって隠密状態の時に<span className={style.emphasis}>忍び足</span>
        を使用する場合には、隠密状態が解除されずに発動します。<br />
        このスキルは壁を越えられません。
    </>,
    parameters: [
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}