import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：<span className={style.emphasis}>変わり身の術</span>
        のクールダウンが{Constants.E.cooldown_reduction[props.config.skillLevels.E]}秒減少します。<br />
        <br />
        つばめが指定した方向に空中回転しながら隠密状態になります。隠密状態は{Constants.E.duration}
        秒間維持され、空中回転する間、対象指定不可状態になります。<br />
        <br />
        <span className={style.emphasis}>霧隠れの術</span>で隠密状態になった時に
        <span className={style.emphasis}>忍び足</span>を使用すると隠密状態が解除されずに発動します。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "[変わり身の術]クールダウン減少量", values: Constants.E.cooldown_reduction},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}