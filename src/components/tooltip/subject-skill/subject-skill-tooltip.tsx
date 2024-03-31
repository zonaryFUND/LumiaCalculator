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

const skillsContext = require.context("components/subjects", true, /\.\/.*\/(.*)\.tsx$/);
const SkillsDescription = skillsContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const [subject, skill] = pathComponents.slice(pathComponents.length - 2);
    skills[subject] = {
        ...skills[subject],
        [skill.split(".")[0]]: skillsContext(path)
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
    skill: string
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

const ConsumptionAndCooldown: React.FC<Props & {skillLevel: number, status: Status}> = props => {
    const info = SkillsConstant[props.id][props.skill];
    const spCost = (() => {
        if (info.sp_cost == undefined) return null;
        if (Array.isArray(info.sp_cost)) return info.sp_cost[props.skillLevel];
        return info.sp_cost;
    })()
    const hpCost =(() => {
        if (info.hp_cost == undefined) return null;
        if (Array.isArray(info.hp_cost)) return info.hp_cost[props.skillLevel];
        return info.hp_cost;
    })()
    const baseCooldown = (() => {
        const beforeOverride = (() => {
            if (info.cooldown == undefined || info.cooldown.constant) return null;
            if (Array.isArray(info.cooldown)) return info.cooldown[props.skillLevel];
            return info.cooldown;
        })();
        if (SkillsDescription[props.id][props.skill.toLowerCase()].cooldownOverride) {
            return SkillsDescription[props.id][props.skill.toLowerCase()].cooldownOverride(props.config)(new Decimal(beforeOverride));
        } else {
            return beforeOverride;
        }
    })()
    const constantCooldown = (() => {
        if (info.cooldown == undefined || info.cooldown.constant == undefined) return null;
        if (Array.isArray(info.cooldown.constant)) return info.cooldown.constant[props.skillLevel];
        return info.cooldown.constant;
    })();
    const baseCharge = (() => {
        if (info.charge == undefined) return null;
        if (Array.isArray(info.charge.time)) return info.charge.time[props.skillLevel];
        return info.charge.time;
    })();
    const chargeExpression = (() => {
        if (baseCharge == null) return null;
        const base = <>チャージ時間{new Decimal(baseCharge).times(new Decimal(100).sub(props.status.cooldownReduction)).dividedBy(100).toString()}秒</>;
        return baseCooldown || constantCooldown ? <>({base})</> : base;
    })();

    return (
        <div className={style.cooldown}>
            {spCost != null ? <>スタミナ {spCost}<br /></> : null}
            {hpCost != null ? <>体力 {hpCost}<br /></> : null}
            {spCost == null && hpCost == null ? <>コストなし<br /></> : null}
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
            {chargeExpression}
        </div>
    );
};

const subjectSkillTooltip: React.FC<Props> = props => {
    const src = React.useMemo(() => {
        const standard = Images.skill[props.id][props.skill];
        if (SkillsDescription[props.id].skills && SkillsDescription[props.id].skills.SkillImage) {
            return SkillsDescription[props.id].skills.SkillImage(props.skill) || standard;
        }
        return standard;
    }, [props.id, props.skill]);

    const skillIDForLevel = React.useMemo(() => {
        const def = SkillsDescription[props.id].skills
        if (def == undefined || def.idForLevel == undefined) return props.skill as "Q" | "W" | "E" | "R" | "T";
        return def.idForLevel(props.skill) as "Q" | "W" | "E" | "R" | "T";
    }, [props.id, props.skill]);

    return (
        <div className={`${baseStyle.base} ${style.tooltip}`}>
            <div className={style.main}>
                <header>
                    <img src={src} />
                    <div>
                        <div className={style.name}>
                            <h1>{(Name as any)[props.id][props.skill].jp} （レベル {props.config.skillLevels[skillIDForLevel] + 1}）</h1>
                            <p>[{skillIDForLevel}]</p>
                        </div>
                        <ConsumptionAndCooldown {...props} skillLevel={props.config.skillLevels[skillIDForLevel]} />
                    </div>
                </header>
                <p>
                    {React.createElement(SkillsDescription[props.id][props.skill.toLowerCase()].default, {
                        showEquation: props.showEquation,
                        config: props.config,
                        status: props.status
                    })}
                </p>
            </div>
            {
                props.showEquation && SkillsDescription[props.id][props.skill.toLowerCase()].values != undefined ? (
                    <div className={style.values}>
                        <Values {...SkillsDescription[props.id][props.skill.toLowerCase()].values} skillLevel={props.config.skillLevels[skillIDForLevel]} />
                    </div>
                ) : null
            }
        </div>
    );
};

export default subjectSkillTooltip;