import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { MaxStack } from "./stack";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { config } = useValueContext();

    return (
        <>
            料理人シウカイが作った食べ物と飲み物は{Constants.T.food}%の回復量が追加されます。シウカイは高級等級以上の食べ物や飲み物を作るたびに料理人の情熱スタックを獲得し、スタックに応じて最大体力が
            {Constants.T.max_hp[props.skillLevel]}増加します。(最大{MaxStack}スタック)<br />
            <br />
            現在の最大体力追加数値:{config.stack * Constants.T.max_hp[props.skillLevel]}
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>
        等級別料理人の情熱スタック獲得量<br />
        高級：{Constants.T.stack_gain.uncommon} / レア：{Constants.T.stack_gain.rare} / 英雄：{Constants.T.stack_gain.epic} / 伝説：{Constants.T.stack_gain.legendary}
    </>,
    parameters: [
        {title: "最大体力増加量", values: Constants.T.max_hp}
    ]
}