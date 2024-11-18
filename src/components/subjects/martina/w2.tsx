import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import martina from "./martina.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マルティナが{Constants.W2.duration}秒間維持される小型カメラを設置し、周りの視界を確保します。
            <span className={style.emphasis}>早送り</span>スキルが小型カメラを的中すると小型カメラがマルティナがいる方向を撮影し、敵に
            <Value skill="W" ratio={Constants.W2.damage} />のスキルダメージを与え、{Constants.W2.bind}秒間束縛します。小型カメラは最大{Constants.W2.charge.max}
            台まで保持することができ、一度に{Constants.W2.max_set}台まで設置できます。小型カメラの撮影範囲内に他の小型カメラは設置できません。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W2.damage.base},
        {title: "チャージ時間", values: Constants.W2.charge.time},
        {title: "消費", values: Constants.W2.sp_cost}
    ]
}
