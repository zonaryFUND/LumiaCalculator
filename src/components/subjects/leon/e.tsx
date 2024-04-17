import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レオンが阻止不可状態になってダイビングし、指定した水溜りから飛び出ます。水溜りから飛び出る時、周りの敵に<Damage skill="E" constants={Constants.E.damage} {...props} />
            のスキルダメージを与えて敵を{Constants.E.airborne}秒間空中に浮かせます。レオンは水溜りの中に潜り込んでいる時には対象指定不可状態になり、ダイビングする時、両方に水溜りが生成されます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
