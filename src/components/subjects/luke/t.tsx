import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            満足感：ルクは実験体のキルに関与すると自分が失った体力の{Constants.T.subject_kill[props.skillLevel]}%を回復し、ウィクラインのキルに関与した場合、自分が失った体力の
            {Constants.T.wickline_kill[props.skillLevel]}%を回復します。<br />
            <br />
            掃除完了：ルクは実験体・野生動物を倒したり補給箱を獲得するたびに<span className={style.strong}>掃除完了</span>スタックを獲得します。<br />
            {Constants.T.evolution_stack.map(v => `${v}`).join("/")}スタックごとに進化ポイントを獲得し、
            {Constants.T.heal_amp_threshold}スタックからは{Constants.T.heal_amp_per}スタック毎に満足感の効果が1%増加します。<br />
            <br />
            ニワトリ、コウモリ {Constants.T.chicken_bat}<br />
            イノシシ、ハウンド、オオカミ {Constants.T.boar_hound_wolf}<br />
            クマ {Constants.T.bear}<br />
            実験体 {Constants.T.subject}<br />
            アルファ/オメガ {Constants.T.alpha_omega}<br />
            ウィクライン {Constants.T.wickline}<br />
            補給箱 食品{Constants.T.food_box}/英雄{Constants.T.epic_box}/伝説以上{Constants.T.legendary_box}
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "実験体処置時、体力回復効果(%)", values: Constants.T.subject_kill, percent: true},
        {title: "ウィクライン処置時、体力回復効果(%)", values: Constants.T.wickline_kill, percent: true}
    ]
}
