import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import Name from "dict/skill-name.json";
import { StatusContext } from "components/subject/subject-context";
import baseStyle from "./tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import { Status } from "components/subject/use-status";
import Decimal from "decimal.js";
import { FormulaContext } from "components/subjects/damage";
import Values from "components/subjects/values";

const skillsContext = require.context("components/subjects", true, /\.\/.*\/(q|w|e|r|t|skills)\.tsx$/);
const SkillsDescription = skillsContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const [subject, skill] = pathComponents.slice(pathComponents.length - 2);
    skills[subject] = {
        ...skills[subject],
        [skill.split(".")[0].toUpperCase()]: skillsContext(path)
    };
    return skills;
}, {}) as any

const constContext = require.context("components/subjects", true, /\.\/.*\/constants.json$/);
export const SkillsConstant = constContext.keys().reduce((consts: any, path) => {
    const pathComponents = path.split("/");
    const key = pathComponents[pathComponents.length - 2]
    consts[key] = constContext(path)
    return consts;
}, {}) as any

type Props = {
    id: SubjectID
    skill: "Q" | "W" | "E" | "R" | "T"
}

const ConsumptionAndCooldown: React.FC<Props & {status: Status}> = props => {
    const info = SkillsConstant[props.id][props.skill];
    const spCost = (() => {
        if (info.sp_cost == undefined) return null;
        if (Array.isArray(info.sp_cost)) return info.sp_cost[props.status.skillLevels[props.skill]];
        return info.sp_cost;
    })()
    const baseCooldown = (() => {
        if (info.cooldown == undefined) return 0;
        if (Array.isArray(info.cooldown)) return info.cooldown[props.status.skillLevels[props.skill]];
        return info.cooldown;
    })()

    return (
        <div className={style.cooldown}>
            {spCost != null ? <>スタミナ {spCost}<br /></> : null}
            <>クールダウン{new Decimal(baseCooldown).times(new Decimal(100).sub(props.status.cooldownReduction)).dividedBy(100).toString()}秒</>
        </div>
    );
};

const subjectSkillTooltip: React.FC<Props> = props => {
    const formula = React.useContext(FormulaContext)!;
    const status = React.useContext(StatusContext)!;
    const src = React.useMemo(() => {
        const standard = Images.skill[props.id][props.skill];
        if (SkillsDescription[props.id].SKILLS.SkillImage) {
            return SkillsDescription[props.id].SKILLS.SkillImage(props.skill) || standard;
        }
        return standard;
    }, [props.id, props.skill]);

    return (
        <div className={`${baseStyle.base} ${style.tooltip}`}>
            <div className={style.main}>
                <header>
                    <img src={src} />
                    <div>
                        <div className={style.name}>
                            <h1>{(Name as any)[props.id][props.skill].jp} （レベル {status.skillLevels[props.skill] + 1}）</h1>
                            <p>[{props.skill}]</p>
                        </div>
                        <ConsumptionAndCooldown {...props} status={status} />
                    </div>
                </header>
                <p>
                    {React.createElement(SkillsDescription[props.id][props.skill].default, status)}
                </p>
            </div>
            {
                formula && SkillsDescription[props.id][props.skill].values != undefined ? (
                    <div className={style.values}>
                        <Values {...SkillsDescription[props.id][props.skill].values} skillLevel={status.skillLevels[props.skill]} />
                    </div>
                ) : null
            }
            <div className="">

            </div>
        </div>
    );
};

export default subjectSkillTooltip;