import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import Name from "dict/skill-name.json";
import baseStyle from "../tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import Decimal from "decimal.js";
import Values from "components/subjects/values";
import { SubjectConfig } from "components/subject/use-subject-config";
import { Status } from "components/subject/status";
import { SubjectSkillProps } from "components/subjects/props";

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
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

const ConsumptionAndCooldown: React.FC<Props & {status: Status}> = props => {
    const info = SkillsConstant[props.id][props.skill];
    const spCost = (() => {
        if (info.sp_cost == undefined) return null;
        if (Array.isArray(info.sp_cost)) return info.sp_cost[props.config.skillLevels[props.skill]];
        return info.sp_cost;
    })()
    const baseCooldown = (() => {
        if (info.cooldown == undefined || info.cooldown.constant) return null;
        if (Array.isArray(info.cooldown)) return info.cooldown[props.config.skillLevels[props.skill]];
        return info.cooldown;
    })()
    const constantCooldown = (() => {
        if (info.cooldown == undefined || info.cooldown.constant == undefined) return null;
        if (Array.isArray(info.cooldown.constant)) return info.cooldown.constant[props.config.skillLevels[props.skill]];
        return info.cooldown.constant;
    })();
    const baseCharge = (() => {
        if (info.charge == undefined) return undefined;
        if (Array.isArray(info.charge.time)) return info.charge.time[props.config.skillLevels[props.skill]];
        return info.charge.time;
    })();

    return (
        <div className={style.cooldown}>
            {spCost != null ? <>スタミナ {spCost}<br /></> : null}
            {spCost == null ? <>コストなし<br /></> : null}
            {
                baseCooldown != null ?
                <>クールダウン{new Decimal(baseCooldown).times(new Decimal(100).sub(props.status.cooldownReduction)).dividedBy(100).toString()}秒</> :
                null
            }
            {
                constantCooldown != null ?
                <>クールダウン{constantCooldown}秒</> :
                null
            }
            {
                baseCharge != null ?
                <>チャージ時間{new Decimal(baseCharge).times(new Decimal(100).sub(props.status.cooldownReduction)).dividedBy(100).toString()}秒</> :
                null
            }
        </div>
    );
};

const subjectSkillTooltip: React.FC<Props> = props => {
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
                            <h1>{(Name as any)[props.id][props.skill].jp} （レベル {props.config.skillLevels[props.skill] + 1}）</h1>
                            <p>[{props.skill}]</p>
                        </div>
                        <ConsumptionAndCooldown {...props} />
                    </div>
                </header>
                <p>
                    {React.createElement(SkillsDescription[props.id][props.skill].default, props)}
                </p>
            </div>
            {
                props.showEquation && SkillsDescription[props.id][props.skill].values != undefined ? (
                    <div className={style.values}>
                        <Values {...SkillsDescription[props.id][props.skill].values} skillLevel={props.config.skillLevels[props.skill]} />
                    </div>
                ) : null
            }
        </div>
    );
};

export default subjectSkillTooltip;