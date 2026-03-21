import * as React from "react";
import { weaponTypeIDOf, SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { SubjectSkillListExpressionDictionary } from "../../ingame-params/subjects/dictionary";
import style from "./skills.module.styl";
import Images from "@app/resources/image";
import { SubjectSideContext } from "../../ingame-params/subjects/subject-side";
import PullDown from "components/common/pull-down";
import { SubjectDependentSkillKey, SubjectSkillKeys } from "app-types/skill";
import { SkillTooltipID } from "components/tooltip";
import { Prohibit } from "@phosphor-icons/react";
import { WeaponSkillCodeDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import { TooltipContext } from "components/tooltip/tooltip-context";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { useLatest } from "react-use";
import { SkillCodes } from "@app/ingame-params/subjects/type";
import { useSubjectStateStore } from "@app/features/subject-config/store";

type SkillListProps = {
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}
export const SkillListContext = React.createContext<SkillListProps | null>(null);

const Skill: React.FC<{code?: number}> = ({code}) => {
    const uiType = useResponsiveUIType();
    const side = React.useContext(SubjectSideContext);
    const tooltipContext = React.useContext(TooltipContext);

    const latest = useLatest({ code, side });
    const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(event => {
        if (uiType != "mobile" || latest.current.code == undefined) {
            return
        }

        tooltipContext?.openModalSkill.current({
            skillCode: latest.current.code,
            subjectSide: latest.current.side
        });
    }, [])

    return (
        code ?
        <img 
            src={Images.skill[code]} 
            data-tooltip-id={SkillTooltipID} 
            data-tooltip-content={`${code}`}
            data-tooltip-subject-side={side}
            onClick={onClick}
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
    const setSkillLevels = useSubjectStateStore(s => s.setSkillLevels);
    const list = SubjectSkillListExpressionDictionary[config.subject](config);
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
            <SkillListContext.Provider value={{config, setSkillLevels}}>
            {
                SubjectSkillKeys.map(skill => (
                    <div key={skill} className={style.vertical}>
                        <Skills codes={list[skill]} />
                    </div>
                ))
            }
            {
                
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
            </SkillListContext.Provider>
        </div>
    )
};

export default subjectSkills;