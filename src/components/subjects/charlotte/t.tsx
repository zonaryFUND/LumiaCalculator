import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットの周りにいる味方が敵の攻撃によって体力が{Constants.T.ally_losthp_threshold}
        ％減少するたびに高潔な心スタックを獲得し、スタックごとに与える回復及びシールド効果が
        {Constants.T.heal_and_shield_amp[props.config.skillLevels.T]}％増加します。(最大{Constants.T.max_stack}スタック)
    </>
)

export default t;
