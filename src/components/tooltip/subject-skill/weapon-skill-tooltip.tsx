import * as React from "react";
import Name from "dictionary/weapon-skill-name.json";
import baseStyle from "../tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import Values, { ValuesProps } from "components/subjects/values";
import { SubjectSkillProps } from "components/subjects/props";
import Constant from "components/subjects/weapon-skills/constants.json";
import { equipmentStatus } from "app-types/equipment";
import { skillLevel } from "components/subjects/skill-damage";

function valueOrElement(value: number | number[], index: number): number {
    if (Array.isArray(value)) return value[index];
    return value;
}

const skillsContext = require.context("components/subjects/weapon-skills", true, /(.*)\.tsx$/);
export const SkillsDescription = skillsContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const weapon = pathComponents[pathComponents.length - 1];
    return {
        ...skills,
        [weapon.split(".")[0]]: skillsContext(path)
    };
}, {}) as any

const weaponSkillTooltip: React.FC<SubjectSkillProps> = props => {
    const weaponType = React.useMemo(() => {
        return equipmentStatus(props.config.equipment.weapon!).type;
    }, [props.config.equipment.weapon]);

    const subjectSkillsProps: SubjectSkillProps = {
        showEquation: props.showEquation,
        config: props.config,
        status: props.status
    }

    const level = skillLevel("D", props.config);

    const valuesProps: ValuesProps = (() => {
        if (!props.showEquation) return null;
        const values = SkillsDescription[weaponType].values
        return typeof values === "function" ? values(subjectSkillsProps) : values;
    })();

    return (
        <div className={`${baseStyle.base} ${style.tooltip}`}>
            <div className={style.main}>
                <header>
                    <img src={Images.skill.weapon[weaponType]} />
                    <div>
                        <div className={style.name}>
                            <h1>{(Name as any)[weaponType].jp} （レベル {level + 1}）</h1>
                            <p>[D]</p>
                        </div>
                        <div className={style.cooldown}>
                            コストなし<br />
                            クールダウン{valueOrElement((Constant as any)[weaponType].cooldown, level)}秒
                        </div>
                    </div>
                </header>
                <p>
                    {React.createElement(SkillsDescription[weaponType].default, subjectSkillsProps)}
                </p>
            </div>
            {
                valuesProps ? (
                    <div className={style.values}>
                        <Values {...valuesProps} additionalInfo={valuesProps.additionalInfo ?? <>武器熟練度<span className={baseStyle.emphasis}>5Lv・10Lv・15Lv</span>の時にスキルレベルアップ</>} skillLevel={level} />
                    </div>
                ) : null
            }
        </div>
    );
};

export default weaponSkillTooltip;