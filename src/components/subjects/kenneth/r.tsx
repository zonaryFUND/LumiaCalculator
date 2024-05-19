import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ケネスが斧を振り上げながら<Value skill="R" ratio={Constants.R.first_damage} />のスキルダメージを与えます。的中された敵は
            {Constants.R.stun}秒間の間空中で捕まったまま気絶し、ケネスの回転攻撃によって
            <Value skill="R" ratio={Constants.R.second_damage} />のスキルダメージを{Constants.R.second_count}回受けます。<br />
            <br />
            その後、斧を振り下ろしながら着地し、着地地点の敵に<Value skill="R" ratio={Constants.R.third_damage} />
            のスキルダメージを与えて{Constants.R.airborne}秒間空中に浮かせます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        スキルを使用すると、ケネスは抑圧された怒りのスタックが最大スタックまで増加します。<br />
        振り上げながら与えるダメージは基本攻撃及びスキル攻撃判定と見なされ、初めて敵に的中した時に効果が発動します。
    </>,
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.first_damage.base},
        {title: "2打ダメージ量", values: Constants.R.second_damage.base},
        {title: "3打ダメージ量", values: Constants.R.third_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
