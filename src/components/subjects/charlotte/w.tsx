import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットが治癒の光で体力の割合が最も低い味方と自分の体力を<Damage skill="W" constants={Constants.W.heal} {...props} />回復させます。
    </>
)

export default w;
