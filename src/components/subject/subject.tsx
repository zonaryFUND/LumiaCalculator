import * as React from "react";
import { useToggle } from "react-use";
import { SubjectID, name } from "@app/entity/subject";
import useStatus from "./use-status";
import SubjectsList from "./subjects-list";
import EquipmentSlot from "./equipment-slot";
import Images from "@app/resources/image";
import style from "./subject.module.styl";
import { SubjectSkills } from "components/subjects/skills";
import { Tooltip } from "react-tooltip";
import ItemTooltip from "components/tooltip/item-tooltip";
import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import useSubjectConfig from "./use-subject-config";
import { equipmentStatus } from "@app/entity/equipment";
import SkillsStandard from "components/subjects/skills-standard";

const subject: React.FC = _ => {
    const {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels],
        gauge: [gauge, setGauge]
    } = useSubjectConfig();

    const subjectConfig = {
        subject, equipment, level, weaponMastery, movementMastery, skillLevels, gauge
    }
    const status = useStatus(subjectConfig);

    const subjectName = React.useMemo(() => subject ? name(subject, "jp") : null, [subject]);
    const [damageInFormula, toggleDamageInFormula] = useToggle(false);

    const [showingCharacters, toggleShowingCharacters] = useToggle(false);
    const selectSubjectFromList = React.useCallback((id: SubjectID) => {
        setSubject(id);
        toggleShowingCharacters(false);
    }, []);

    const onLevelSliderChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setLevel(+event.target.value);
    }, []);
    const onWeaponMasterySliderChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setWeaponMastery(+event.target.value);
    }, []);
    const onMovementMasterySliderChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setMovementMastery(+event.target.value);
    }, []);
    const onSubjectUniqueGaugeSliderChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setGauge(+event.target.value);
    }, []);


    const subjectSkills = React.useMemo(() => {
        if (subject == null) return null;
        const skills = SubjectSkills[subject];
        if (skills == undefined) return <SkillsStandard id={subject} />;
        return React.createElement(SubjectSkills[subject].default, {weapon: equipment.weapon})
    }, [subject, equipment.weapon]);
    
    return (
        <section className={style.base}>
            <div>
                <div  onClick={toggleShowingCharacters}>
                    <img className={style.subject} src={subject ? Images.subject[subject] : undefined} />
                    <h3>{subjectName}</h3>
                </div>
                {
                    showingCharacters ? <SubjectsList onSelect={selectSubjectFromList} /> : null
                }
                <div>
                    <EquipmentSlot slot="weapon" subject={subject!} equipment={[equipment, setEquipment]} />
                    <EquipmentSlot slot="chest" subject={subject!} equipment={[equipment, setEquipment]} />
                    <EquipmentSlot slot="head" subject={subject!} equipment={[equipment, setEquipment]} />
                    <EquipmentSlot slot="arm" subject={subject!} equipment={[equipment, setEquipment]} />
                    <EquipmentSlot slot="leg" subject={subject!} equipment={[equipment, setEquipment]} />
                </div>
                <label><input type="checkbox" defaultChecked={damageInFormula} onChange={toggleDamageInFormula} />スキルダメージを計算式で表記する</label>
                {subjectSkills}
            </div>
            <div className={style.status}>
                <table>
                    <tbody>
                        <tr><td>最大体力</td><td>{status ? status.baseMaxHP.add(status.additionalMaxHP).toNumber() : "-"}</td></tr>
                        <tr><td>最大スタミナ</td><td>{status ? status.maxSP.toNumber() : "-"}</td></tr>
                        <tr><td>体力再生</td><td>{status ? status.hpReg.toNumber() : "-"}</td></tr>
                        <tr><td>スタミナ再生</td><td>{status ? status.spReg.toNumber() : "-"}</td></tr>
                        <tr><td>攻撃力</td><td>{status ? status.attackPower.toNumber() : "-"}</td></tr>
                        <tr><td>基本攻撃増幅</td><td>{status ? `${status.basicAttackAmp.toNumber()}%` : "-"}</td></tr>
                        <tr><td>攻撃速度</td><td>{status ? status.attackSpeed.calculated.toNumber() : "-"}</td></tr>
                        <tr><td>致命打確率</td><td>{status ? `${status.criticalChance.toNumber()}%` : "-"}</td></tr>
                        <tr><td>致命打ダメージ上昇量</td><td>{status ? `${status.criticalDamage.toNumber()}%` : "-"}</td></tr>
                        <tr><td>スキル増幅</td><td>{status ? status.skillAmp.toNumber() : "-"}</td></tr>
                        <tr><td>クールダウン減少</td><td>{status ? `${status.cooldownReduction.toNumber()}%` : "-"}</td></tr>
                        <tr><td>防御力</td><td>{status ? status.defense.toNumber() : "-"}</td></tr>
                        <tr><td>ダメージ吸血</td><td>{status ? `${status.omnisyphon.toNumber()}%` : "-"}</td></tr>
                        <tr><td>生命力吸収</td><td>{status ? `${status.lifeSteal.toNumber()}%` : "-"}</td></tr>
                        <tr><td>防御貫通</td><td>{status ? `${status.armorPenetrationRatio.toNumber()}% / ${status.armorPenetration.toNumber()}` : "-"}</td></tr>
                        <tr><td>与える回復増加</td><td>{status ? `${status.healPower.toNumber()}%` : "-"}</td></tr>
                        <tr><td>行動妨害体制</td><td>{status ? `${status.tenacity.toNumber()}%` : "-"}</td></tr>
                        <tr><td>移動速度</td><td>{status ? status.movementSpeed.toNumber() : "-"}</td></tr>
                        <tr><td>視界範囲</td><td>{status ? status.visionRange.toNumber() : "-"}</td></tr>
                        <tr><td>基本攻撃射程</td><td>{status ? status.basicAttackRange.toNumber() : "-"}</td></tr>
                    </tbody>
                </table>
                {
                    status && status.summonedStatus ?
                    <table>
                        <tbody>
                            <tr><td>最大体力</td><td>{status.summonedStatus.maxHP.toString()}</td></tr>
                            <tr><td>攻撃力</td><td>{status.summonedStatus.attackPower.toString()}</td></tr>
                            <tr><td>攻撃速度</td><td>{status.summonedStatus.attackSpeed.toString()}</td></tr>
                            <tr><td>致命打確率</td><td>{status.summonedStatus.criticalChance.toString()}</td></tr>
                            <tr><td>スキル増幅</td><td>{status.summonedStatus.skillAmp.toString()}</td></tr>
                            <tr><td>防御貫通</td><td>{status ? `${status.summonedStatus.armorPenetrationRatio.toNumber()}% / ${status.summonedStatus.armorPenetration.toNumber()}` : "-"}</td></tr>
                        </tbody>
                    </table>
                    :
                    null
                }
            </div>
            <label>
                {`レベル${level}`}
                <input type="range" min="1" value={level} max="20" step="1" onChange={onLevelSliderChange}/>
            </label>
            <label>
                {`武器熟練度${weaponMastery}`}
                <input type="range" min="1" value={weaponMastery} max="20" step="1" onChange={onWeaponMasterySliderChange}/>
            </label>
            <label>
                {`移動熟練度${movementMastery}`}
                <input type="range" min="1" value={movementMastery} max="20" step="1" onChange={onMovementMasterySliderChange}/>
            </label>
            <label>
                {`実験体固有ゲージ${gauge}`}
                <input type="range" min="0" value={gauge} max="100" step="1" onChange={onSubjectUniqueGaugeSliderChange}/>
            </label>
            <Tooltip 
                id="weapon"
                className={`${style.tooltip}`}
                render={({ content, activeAnchor }) => content ? <ItemTooltip itemID={content}/> : null}
            />
            <Tooltip 
                id="subject-skill"
                className={`${style.tooltip}`}
                delayHide={1000000}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const [subject, skill] = content?.split("-");
                    return (
                        <SubjectSkillTooltip 
                            id={subject} 
                            skill={skill as any} 
                            showEquation={damageInFormula}
                            status={status!} 
                            config={subjectConfig!} 
                        />
                    );
                }}
            />
        </section>
    )
}

export default subject;