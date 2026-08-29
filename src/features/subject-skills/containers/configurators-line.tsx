import * as React from "react";
import { SubjectSkillKeys } from "app-types/skill";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { SubjectSkillListExpressionDictionary } from "@app/ingame-params/subjects/dictionary";
import SkillLevelConfigurator from "./skill-level-configurator";

// 実験体スキルセクションのうち、下側の「スキルレベル設定欄」を構成する
// 各実験体固有スキル（Q,W,E,R,T）に対応する設定欄を横並びにする（Dは自動設定されるので空のdiv要素を置く）
const ConfiguratorsLine: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const list = SubjectSkillListExpressionDictionary[config.subject](config)

    return (
        <>
        {
            SubjectSkillKeys.map(skill => {
                const value = list[skill];
                if (typeof value == "object" && "maxLevel" in value) {
                    if (value.maxLevel == "none") return <div />;
                    return <SkillLevelConfigurator 
                        key={skill} 
                        skill={skill} 
                        max={value.maxLevel}
                    />;  
                } else {
                    return <SkillLevelConfigurator 
                        key={skill} 
                        skill={skill} 
                    />;  
                }
            })
        }
        <div />
        </>
    )
}

export default ConfiguratorsLine;
