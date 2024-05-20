import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアは研究所以外の新しい地域に進入するたびに攻撃速度が{Constants.T.attack_speed[props.skillLevel]}
            %、最大燃料量が{Constants.T.max_fuel}増加します。
            {Constants.T.area_threshold}ヶ所の地域を探索するとスキル増幅が{Constants.T.max_skill_amp}
            %、攻撃速度が{Constants.T.max_attack_speed}%増加します。<br />
            <br />
            バイクに乗っていない状態では1秒ごとに{Constants.T.fuel_consumption}の燃料を獲得します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "攻撃速度", values: Constants.T.attack_speed, percent: true}
    ]
}
