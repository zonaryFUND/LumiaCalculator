import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import Name from "dict/skill-name.json";
import baseStyle from "../tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import Decimal from "decimal.js";
import Values, { ValuesProps } from "components/subjects/values";
import { SubjectConfig } from "components/subject/use-subject-config";
import { Status } from "components/subject/status";
import { SubjectSkillProps } from "components/subjects/props";

const skillsContext = require.context("components/subjects", true, /\.\/.*\/(.*)\.tsx$/);
export const SkillsDescription = skillsContext.keys().reduce((skills: any, path) => {
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

function valueOrElement(value: number | number[], index: number): number {
    if (Array.isArray(value)) return value[index];
    return value;
}

const ConsumptionAndCooldown: React.FC<Props & {skillLevel: number, status: Status}> = props => {
    const info = SkillsConstant[props.id][props.skill];
    const spCost = info.sp_cost == undefined ? null : valueOrElement(info.sp_cost, props.skillLevel);
    const hpCost = info.hp_cost == undefined ? null : valueOrElement(info.hp_cost, props.skillLevel);
    const cost = info.cost == undefined ? null : valueOrElement(info.cost, props.skillLevel);
    const hpPercentCost = info.hp_cost_percent == undefined ? null : valueOrElement(info.hp_cost_percent, props.skillLevel);

    const cooldown = (() => {
        if (info.cooldown == undefined) return null;

        const base = (() => {
            if (info.cooldown.constant != undefined) {
                return new Decimal(valueOrElement(info.cooldown.constant, props.skillLevel));
            } else {
                const baseValue = valueOrElement(info.cooldown, props.skillLevel);
                return new Decimal(baseValue).subPercent(props.status.cooldownReduction);
            }
        })();

        if (SkillsDescription[props.id][props.skill.toLowerCase()].cooldownOverride == undefined) {
            return base.toString();
        }
        return SkillsDescription[props.id][props.skill.toLowerCase()].cooldownOverride(props.config, props.status)(base).toString();
    })();

    const charge = (() => {
        if (info.charge == undefined) return null;
        const charge = (() => {
            if (info.charge.time.constant != undefined) {
                return valueOrElement(info.charge.time.constant, props.skillLevel);
            } else {
                const baseValue = valueOrElement(info.charge.time, props.skillLevel);
                return new Decimal(baseValue).subPercent(props.status.cooldownReduction).toString();
            }
        })();
        return cooldown ? <>(チャージ時間{charge}秒)</> : <>チャージ時間{charge}秒</>;
    })();

    return (
        <div className={style.cooldown}>
            {spCost != null ? <>スタミナ {spCost}<br /></> : null}
            {hpCost != null ? <>体力 {hpCost}<br /></> : null}
            {hpPercentCost != null ? <>現在体力 {hpPercentCost}％<br /></> : null}
            {cost != null ? <>資源消費量 {cost}<br /></> : null}
            {spCost == null && hpCost == null && hpPercentCost == null && cost == null ? <>コストなし<br /></> : null}
            {
                cooldown != null ?
                <>クールダウン{cooldown}秒</> :
                null
            }
            {charge}
        </div>
    );
};

const subjectSkillTooltip: React.FC<Props> = props => {
    const subjectSkillsProps: SubjectSkillProps = {
        showEquation: props.showEquation,
        config: props.config,
        status: props.status
    }

    const src = React.useMemo(() => {
        const standard = Images.skill[props.id][props.skill];
        if (SkillsDescription[props.id].skills && SkillsDescription[props.id].skills.SkillImage) {
            return SkillsDescription[props.id].skills.SkillImage(props.skill) ?? standard;
        }
        return standard;
    }, [props.id, props.skill]);

    const skillIDForLevel = React.useMemo(() => {
        const def = SkillsDescription[props.id].skills
        if (def == undefined || def.idForLevel == undefined) return props.skill as "Q" | "W" | "E" | "R" | "T";
        return def.idForLevel(props.skill) as "Q" | "W" | "E" | "R" | "T";
    }, [props.id, props.skill]);

    const skillIDForConsumption = React.useMemo(() => {
        const def = SkillsDescription[props.id].skills
        if (def == undefined || def.idForConsumption == undefined) return props.skill;
        return def.idForConsumption(props.skill);
    }, [props.id, props.skill]);

    const valuesProps: ValuesProps = (() => {
        if (!props.showEquation) return null;
        const values = SkillsDescription[props.id][props.skill.toLowerCase()].values
        if (values == undefined) return null;
        return typeof values === "function" ? values(subjectSkillsProps) : values;
    })();

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
                        <ConsumptionAndCooldown {...props} skill={skillIDForConsumption} skillLevel={props.config.skillLevels[skillIDForLevel]} />
                    </div>
                </header>
                <p>
                    {React.createElement(SkillsDescription[props.id][props.skill.toLowerCase()].default, subjectSkillsProps)}
                </p>
            </div>
            {
                valuesProps ? (
                    <div className={style.values}>
                        <Values {...valuesProps} skillLevel={props.config.skillLevels[skillIDForLevel]} />
                    </div>
                ) : null
            }
        </div>
    );
};

export default subjectSkillTooltip;