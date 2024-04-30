import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import { StateProps } from "util/state";
import index from "./index.module.styl";
import { Equipment, SkillLevels } from "components/subject/use-subject-config";
import { SubjectSkills } from "components/subjects/skills";
import SkillsStandard from "components/subjects/skills-standard";
import { WeaponTypeID, equipmentStatus } from "@app/entity/equipment";

type Props = {
    showEquation: StateProps<boolean>
    subject: SubjectID
    equipment: Equipment
    weaponMastery: number
    skillLevels: StateProps<SkillLevels>
}

const damages: React.FC<Props> = props => {
    const subjectSkills = React.useMemo(() => {
        const skills = SubjectSkills[props.subject];
        const weaponType = props.equipment.weapon ? (equipmentStatus(props.equipment.weapon).type as WeaponTypeID) : undefined;
        if (skills == undefined || skills.default == undefined) {
            const skillImage = skills == undefined ? undefined : skills.SkillImage;
            return <SkillsStandard 
                id={props.subject} 
                {...{skillLevels: props.skillLevels[0], setSkillLevels: props.skillLevels[1], skillImage}} 
                weaponType={weaponType}    
            />;
        }
        return React.createElement(SubjectSkills[props.subject].default, {weapon: props.equipment.weapon, skillLevels: props.skillLevels[0], setSkillLevels: props.skillLevels[1]})
    }, [props.subject, props.equipment.weapon, props.skillLevels]);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        props.showEquation[1](e.currentTarget.checked);
    }, []);

    return (
        <div className={index.row}>
            <header>
                <h1>ダメージ</h1>
                <label><input type="checkbox" checked={props.showEquation[0]} onChange={onChange} />スキルダメージを計算式で表記する</label>
            </header>
            <section>
                {subjectSkills}
            </section>

        </div>
    )
};

export default damages;