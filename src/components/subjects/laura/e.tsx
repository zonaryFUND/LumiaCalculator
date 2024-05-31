import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが<span className={style.emphasis}>スリル</span>を消耗して指定した方向に短く突進します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>
        優雅な足取りは壁を超えることができません。<br />
        優雅な足取りはイバラの花、黄昏の泥棒以外のスキルをキャスト中に使用でき、クールダウン減少効果の影響を受けません。<br />
        <br />
        黄昏の泥棒の鞭を投げている途中または突進した後着地する前に使用すると、突進する方向を少し変更でき、突進距離が{Constants.E.r_combo_distance}mに増加します。
    </>,
    parameters: [
        {title: "消費", values: Constants.E.cost}
    ]
}
