import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアがバイクから降りてスキルが変更します。<br />
            {Constants.BikeR.duration}秒以内の次の基本攻撃が<Damage skill="R" constants={Constants.BikeR.damage} {...props} />
            の追加スキルダメージを与えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.BikeR.damage.base}
    ]
}
