import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヒョヌが指定した方向に突進し、敵にぶつかると<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて敵を突き飛ばします。<br />
            <br />
            突き飛ばした敵が壁にぶつかった場合、<Value skill="E" ratio={Constants.E.wall_damage} />のスキルダメージを与えて
            {Constants.E.stun}秒間気絶させます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "現在の体力比例ダメージ量(%)", values: Constants.E.damage.targetHP},
        {title: "ダメージ量", values: Constants.E.wall_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
