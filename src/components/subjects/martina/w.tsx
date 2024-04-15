import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import martina from "./martina.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>[取材中]</span><br />
            マルティナが{Constants.W.duration}秒間維持される小型カメラを設置し、周りの視界を確保します。
            <span className={style.emphasis}>早送り</span>スキルが小型カメラを的中すると小型カメラがマルティナがいる方向を撮影し、敵に
            <Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与え、移動速度を
            {Constants.W.slow.duration}秒間{Constants.W.slow.effect}％減少させます。小型カメラは最大{Constants.W.charge.max}
            台まで保持することができ、一度に{Constants.W.max_set}台まで設置できます。<br />
            <br />
            <span className={martina.broadcast}>[放送中]</span><br />
            小型カメラ撮影は敵を束縛し、最大保持数または設置できる数を増加させます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "チャージ時間", values: Constants.W.charge.time},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
