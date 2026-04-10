import * as React from "react";
import { weaponTypeIDOf, SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { SubjectSkillListExpressionDictionary } from "../../ingame-params/subjects/dictionary";
import style from "./skills.module.styl";
import PullDown from "components/common/pull-down";
import { SubjectDependentSkillKey, SubjectSkillKeys } from "app-types/skill";
import { WeaponSkillCodeDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import { SkillCodes } from "@app/ingame-params/subjects/type";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import Skill from "./containers/skill";

const Skills: React.FC<{codes: SkillCodes | undefined}> = props => {
    if (props.codes == undefined) return null;
    if (typeof props.codes == "number") {
        return <Skill key={props.codes} code={props.codes} />;
    } else if (Array.isArray(props.codes)) {
        return props.codes.map(code => <Skill key={code} code={code} />)
    } else {
        return (typeof props.codes.code == "number" ? [props.codes.code] : props.codes.code)
            .map(code => <Skill key={code} code={code} />)
    }
}

const subjectSkills: React.FC = props => {
    const config = useSubjectStateStore(s => s.config);
    const list = SubjectSkillListExpressionDictionary[config.subject](config);

    // 実験体固有の設定がある場合、武器スキルはそのスキルを表示
    // ない場合、装備中の武器に対応するスキルを表示
    const weaponSkill = React.useMemo(() => {
        if (list.D) {
            return <Skills codes={list.D} />
        } else {
            const weaponType = weaponTypeIDOf(config);
            return <Skill code={weaponType ? WeaponSkillCodeDictionary[weaponType] : undefined} />
        }
    }, [config.equipment.Weapon])

    return (
        <div className={style.skills}>
            {
            SubjectSkillKeys.map(skill => (
                <div key={skill} className={style.vertical}>
                    <Skills codes={list[skill]} />
                </div>
            ))
            }
            <div className={style.vertical}>
                {weaponSkill}
            </div>
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
        </div>
    )
};

export default subjectSkills;