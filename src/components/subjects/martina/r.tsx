import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import martina from "./martina.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>[取材中]</span><br />
            マルティナが最大{Constants.R.duration}秒間指定した方向を撮影し、撮影する間撮影対象が範囲内に入ってくると録画持続時間の間には移動速度が
            {Constants.R.recording_movement_speed}%増加します。撮影に成功すると対象によって
            <span className={style.emphasis}>録画スタック</span>を獲得し、{Constants.R.recorded_movement_speed.duration}秒間移動速度が
            {Constants.R.recorded_movement_speed.effect}%増加します。<br />
            <br />
            <span className={style.emphasis}>録画スタック</span>が{Constants.R.max_stack}以上になるとマルティナが取材を終わらせ、
            <span className={martina.broadcast}>放送</span>を始めてスキルの威力が強化されます。<br />
            <br />
            <span className={martina.condition}>撮影条件</span>：<span className={martina.subject}>撮影対象</span>の中で2つの対象を{Constants.R.multiple_subject_recording_time}
            秒以上撮影すると、録画スタック2と武器熟練度{Constants.R.multiple_subject_mastery}獲得。<br />
            <span className={martina.condition}>死体撮影条件</span>：<span className={martina.subject}>撮影対象</span>の中で1体の死体を
            {Constants.R.dead_body_recording_time}秒以上撮影すると、録画スタック1と武器熟練度{Constants.R.dead_body_mastery}獲得。(最大
            {Constants.R.max_dead_body_stack}スタック獲得・同じ死体重複撮影不可)<br />
            <span className={martina.subject}>撮影対象</span>：敵実験体、生命の木、隕石、アルファ、オメガ、ウィクライン、ガンマ<br />
            撮影対象の内、生命の木と隕石以外の対象は撮影した後、{Constants.R.reshooting_prohibit}秒間再撮影できません。<br />
            <br />
            <span className={martina.broadcast}>[放送中]</span><br />
            マルティナが指定した方向を撮影し、敵にダメージを与えます。スキルが終わる時、更に大きなダメージを与え、中央の敵を気絶させます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
