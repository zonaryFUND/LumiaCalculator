import * as React from "react";
import { useToggle } from "react-use";
import { SubjectID, name } from "@app/entity/subject";
import useStatus from "./use-status";
import SubjectsList from "./subjects-list";
import EquipmentSlot from "./equipment-slot";
import Item from "components/items/item";
import Images from "@app/resources/image";

type Props = {
    //subject: SubjectID
}

const subject: React.FC<Props> = props => {
    const [subject, setSubject] = React.useState<SubjectID | null>("jackie");
    const subjectName = React.useMemo(() => subject ? name(subject, "jp") : null, [subject]);
    const {
        status, 
        onLevelSliderChange
    } = useStatus(subject);

    const [showingCharacters, toggleShowingCharacters] = useToggle(false);
    const selectSubjectFromList = React.useCallback((subject: SubjectID) => {
        setSubject(subject);
        toggleShowingCharacters(false);
    }, []);

    return (
        <section>
            <div>
                <div onClick={toggleShowingCharacters}>
                    <img src={subject ? Images.subject[subject] : undefined} />
                    <h3>{subjectName}</h3>
                </div>
                {
                    showingCharacters ? <SubjectsList onSelect={selectSubjectFromList} /> : null
                }
                <div>
                    <EquipmentSlot slot="weapon" />
                    <EquipmentSlot slot="head" />
                    <EquipmentSlot slot="chest" />
                    <EquipmentSlot slot="arm" />
                    <EquipmentSlot slot="leg" />
                </div>
            </div>
            <table>
                <tbody>
                    <tr><td>最大体力</td><td>{status ? status.maxHP.toNumber() : "-"}</td></tr>
                    <tr><td>最大スタミナ</td><td>{status ? status.maxSP.toNumber() : "-"}</td></tr>
                    <tr><td>体力再生</td><td>{status ? status.hpReg.toNumber() : "-"}</td></tr>
                    <tr><td>スタミナ再生</td><td>{status ? status.spReg.toNumber() : "-"}</td></tr>
                    <tr><td>攻撃力</td><td>{status ? status.attackPower.toNumber() : "-"}</td></tr>
                    <tr><td>防御力</td><td>{status ? status.armor.toNumber() : "-"}</td></tr>
                    <tr><td>攻撃速度</td><td>{status ? status.attackSpeed.toNumber() : "-"}</td></tr>
                    <tr><td>移動速度</td><td>{status ? status.movementSpeed.toNumber() : "-"}</td></tr>
                </tbody>
            </table>
            <label>
                レベル
                <input type="range" min="1" defaultValue={1} max="20" step="1" onChange={onLevelSliderChange}/>
            </label>
        </section>
    )
}

export default subject;