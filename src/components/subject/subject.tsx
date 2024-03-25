import * as React from "react";
import { useToggle } from "react-use";
import { SubjectID, name } from "@app/entity/subject";
import useStatus from "./use-status";
import SubjectsList from "./subjects-list";
import EquipmentSlot from "./equipment-slot";
import Item from "components/items/item";
import Images from "@app/resources/image";
import { Equipment, EquipmentContext, SubjectContext } from "./subject-context";
import style from "./subject.module.styl";

type Props = {
    //subject: SubjectID
}

const subject: React.FC<Props> = props => {
    const {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        status,
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        movementMastery: [movementMastery, setMovementMastery]
    } = useStatus();
    const subjectName = React.useMemo(() => subject ? name(subject, "jp") : null, [subject]);


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

    return (
        <section>
            <div>
                <div  onClick={toggleShowingCharacters}>
                    <img className={style.subject} src={subject ? Images.subject[subject] : undefined} />
                    <h3>{subjectName}</h3>
                </div>
                {
                    showingCharacters ? <SubjectsList onSelect={selectSubjectFromList} /> : null
                }
                <SubjectContext.Provider value={[subject, setSubject]}>
                <EquipmentContext.Provider value={[equipment, setEquipment]}>
                    <div>
                        <EquipmentSlot slot="weapon" />
                        <EquipmentSlot slot="chest" />
                        <EquipmentSlot slot="head" />
                        <EquipmentSlot slot="arm" />
                        <EquipmentSlot slot="leg" />
                    </div>
                </EquipmentContext.Provider>
                </SubjectContext.Provider>
            </div>
            <table>
                <tbody>
                    <tr><td>最大体力</td><td>{status ? status.maxHP.toNumber() : "-"}</td></tr>
                    <tr><td>最大スタミナ</td><td>{status ? status.maxSP.toNumber() : "-"}</td></tr>
                    <tr><td>体力再生</td><td>{status ? status.hpReg.toNumber() : "-"}</td></tr>
                    <tr><td>スタミナ再生</td><td>{status ? status.spReg.toNumber() : "-"}</td></tr>
                    <tr><td>攻撃力</td><td>{status ? status.attackPower.toNumber() : "-"}</td></tr>
                    <tr><td>基本攻撃増幅</td><td>{status ? `${status.basicAttackAmp.toNumber()}%` : "-"}</td></tr>
                    <tr><td>攻撃速度</td><td>{status ? status.attackSpeed.toNumber() : "-"}</td></tr>
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
            <label>
                {`レベル${level}`}
                <input type="range" min="1" defaultValue={1} max="20" step="1" onChange={onLevelSliderChange}/>
            </label>
            <label>
                {`武器熟練度${weaponMastery}`}
                <input type="range" min="1" defaultValue={1} max="20" step="1" onChange={onWeaponMasterySliderChange}/>
            </label>
            <label>
                {`移動熟練度${movementMastery}`}
                <input type="range" min="1" defaultValue={1} max="20" step="1" onChange={onMovementMasterySliderChange}/>
            </label>
        </section>
    )
}

export default subject;