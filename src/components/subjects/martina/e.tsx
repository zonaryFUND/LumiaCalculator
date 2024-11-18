import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import martina from "./martina.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>[取材中]</span><br />
            マルティナが現在の位置にビデオテープを残して指定した方向に素早く移動します。以降、最大{Constants.E.duration}秒間早戻し状態を維持します。早戻し状態ではマルティナの移動速度が
            {Constants.E.movement_speed}%増加します。<br />
            <br />
            早戻し状態が終了すると、妨害効果免疫状態になり、ビデオテープの位置に素早く戻ります。この際、マルティナに触れた敵は移動速度が
            {Constants.E.slow.duration}秒間{Constants.E.slow.effect}%減少します。<br />
            <br />
            再使用：ビデオテープの位置により速く戻ります。<br />
            <br />
            <span className={martina.broadcast}>[放送中]</span><br />
            ビデオテープの位置に戻ってくる時、マルティナに触れた敵は気絶し、早戻し状態の間に敵から受けたダメージ量の一部を回復します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
