import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ユミンが3回風の刃を放ち、経路上の敵にそれぞれ<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。最初に的中した対象以外には、{Constants.Q.second_hit}%のダメージを与えます。<br />
            <br />
            風雲地帯でスキルを使用すると、より大きな風を起こします。風は射程距離の端まで飛んで行ったり、敵に的中すると、竜巻を起こして
            {Constants.Q.vortex_tick}秒ごとに<Value skill="Q" ratio={Constants.Q.vortex_damage} />のスキルダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "[風雲地帯]ダメージ量", values: Constants.Q.vortex_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost},
    ]
}