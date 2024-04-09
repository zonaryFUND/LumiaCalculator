import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットが対象指定不可状態になって指定した味方に移動し、{Constants.E.shield_duration}秒間
        <Damage skill="E" constants={Constants.E.shield} {...props} />のシールドを付与します。
    </>
)

export default e;
