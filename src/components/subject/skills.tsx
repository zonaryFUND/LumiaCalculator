import * as React from "react";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { SubjectSkillListExpressionDictionary } from "../../ingame-params/subjects/dictionary";
import style from "./skills.module.styl";
import Images from "@app/resources/image";
import { SubjectSideContext } from "../../ingame-params/subjects/subject-side";
import PullDown from "components/common/pull-down";
import extractWeaponTypeID from "app-types/subject-dynamic/config/extract-weapon-type-id";
import { SubjectDependentSkillKey, SubjectSkillKeys } from "app-types/skill";
import { SkillTooltipID } from "components/tooltip";
import { Prohibit } from "@phosphor-icons/react";
import { WeaponSkillCodeDictionary } from "@app/ingame-params/weapon-skills/dictionary";

type SkillListProps = {
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}
export const SkillListContext = React.createContext<SkillListProps | null>(null);

const Skill: React.FC<{code?: number}> = ({code}) => {
    const side = React.useContext(SubjectSideContext);

    return (
        code ?
        <img 
            src={Images.skill[code]} 
            data-tooltip-id={SkillTooltipID} 
            data-tooltip-content={`${code}`}
            data-tooltip-subject-side={side}
        />
        :
        <div className={style.blank}><Prohibit size="2rem" /></div>
    );
}

const SkillLevelConfigurator: React.FC<{skill: SubjectDependentSkillKey, max?: number}> = props => {
    const context = React.useContext(SkillListContext);

    const value = context!.config.skillLevels[props.skill];
    const max = (() => {
        if (props.max) return props.max;
        return props.skill == "R" || props.skill == "T" ? 3 : 5;
    })();

    const onChange = React.useCallback((to: number) => {
        context!.setSkillLevels(prev => ({...prev, [props.skill]: to - 1}))
    }, [])

    return (
        <div className={style.configurator}>
            <PullDown value={{max, current: value + 1, set: onChange}} layout="skill" />
        </div>
    )
}

type Props = {
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}

const subjectSkills: React.FC<Props> = props => {
    const list = SubjectSkillListExpressionDictionary[props.config.subject](props.config);
    const weaponSkillCode = React.useMemo(() => {
        const weaponType = extractWeaponTypeID(props.config);
        return weaponType ? WeaponSkillCodeDictionary[weaponType] : undefined
    }, [props.config.equipment.Weapon])

    return (
        <div className={style.skills}>
            <SkillListContext.Provider value={props}>
            {
                SubjectSkillKeys.map(skill => (
                    <div key={skill} className={style.vertical}>
                        {
                            (() => {
                                const value = list[skill];
                                if (value == undefined) return null;
                                if (typeof value == "number") {
                                    return <Skill key={value} code={value} />;
                                } else if (Array.isArray(value)) {
                                    return value.map(code => <Skill key={code} code={code} />)
                                } else {
                                    return (typeof value.code == "number" ? [value.code] : value.code)
                                        .map(code => <Skill key={code} code={code} />)
                                }
                            })()
                        }
                    </div>
                ))
            }
            <div className={style.vertical}>
                <Skill code={weaponSkillCode} />
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
            </SkillListContext.Provider>
        </div>
    )
};

export default subjectSkills;