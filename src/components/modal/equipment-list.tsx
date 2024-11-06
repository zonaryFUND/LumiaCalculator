import * as React from "react";
import Item from "components/item/item";
import { equipmentStatus, name, typeName } from "app-types/equipment";
import style from "./equipment-list.module.styl";
import { weaponIDsForType, Weapons } from "app-types/equipment/weapon/id";
import { Arms, Chests, HeadID, Heads, Legs } from "app-types/equipment/armor/id";
import { EquipmentID } from "app-types/equipment/id";
import { mastery } from "app-types/subject-static/mastery";
import { SubjectID } from "app-types/subject-static/id";
import SegmentedControl from "components/common/segmented-control";
import { useLocalStorage } from "react-use";
import { styles } from "@app/util/style";
import common from "@app/common.styl";
import Blank from "components/item/blank";
import { Equipment } from "app-types/subject-dynamic/config";
import { ArmorTypeID } from "app-types/equipment/armor";

type Props = {
    subject: SubjectID
    equipment: [Equipment, React.Dispatch<React.SetStateAction<Equipment>>]
    slot: "weapon" | ArmorTypeID
}

function splitIdsWithRarity(ids: EquipmentID[]): {title: string, ids: EquipmentID[]}[] {
    const splitted = ids.reduce((prev, id) => {
        const def = equipmentStatus(id);
        return {
            ...prev,
            [def.tier]: prev[def.tier].concat([id])
        }
    }, {epic: [] as EquipmentID[], legendary: [] as EquipmentID[], mythic: [] as EquipmentID[]})

    return [
        {title: "英雄等級", ids: splitted.epic},
        {title: "伝説等級", ids: splitted.legendary},
        {title: "神話等級", ids: splitted.mythic}
    ].filter(v => v.ids.length != 0)
}

const priyaUnique: HeadID[] = ["harmony_in_full_bloom", "celestial_echo"];

const subjectsList: React.FC<Props> = props => {
    const [layout, setLayout] = useLocalStorage("equipment-list-sort", "in-game");

    const def: {title: string, sections: {title?: string, ids: EquipmentID[]}[]} = React.useMemo(() => {
        switch (props.slot) {
            case "head":    
                const IDs = props.subject == "priya" ? priyaUnique : Heads.filter(id => priyaUnique.includes(id) == false);
                return {title: "頭", sections: layout == "in-game" ? [{ids: IDs}] : splitIdsWithRarity(IDs)};
            case "chest":   
                return {title: "胴", sections: layout == "in-game" ? [{ids: Chests}] : splitIdsWithRarity(Chests)};
            case "arm":
                return {title: "腕", sections: layout == "in-game" ? [{ids: Arms}] : splitIdsWithRarity(Arms)};
            case "leg":
                return {title: "脚", sections: layout == "in-game" ? [{ids: Legs}] : splitIdsWithRarity(Legs)};
            case "weapon":
                const availableTypes = mastery(props.subject).map(m => m.weapon);
                const names = availableTypes.map(id => typeName(id, "jp"))
                return {
                    title: names.join("、"), 
                    sections: availableTypes.map((id, i) => ({
                        title: names.length == 1 ? undefined : names[i],
                        ids: weaponIDsForType(id)
                    }))
                }
        }
    }, [props.slot, props.subject, layout]);

    const onClick = React.useCallback((id: EquipmentID | null) => () => {
        props.equipment[1](prev => ({...prev, [props.slot]: id}))
    }, [props.slot]);

    return (
        <>
            <header>
                <h1>装備選択 {def.title}</h1>
                {props.slot == "weapon" ? null : <SegmentedControl name="equipment-sort" value={[layout, setLayout]} segments={[{title: "一括表示", value: "in-game"}, {title: "等級別表示", value: "rarity"}]} />}
            </header>
            <div className={style.content}>
                <section key="remove">
                    <div onClick={onClick(null)} className={styles(style.blank, common["hover-bright"], props.equipment[0][props.slot] == null ? style.selected : undefined)}>
                        <Blank slot={props.slot} />
                        <p>外す</p>
                    </div>
                </section>
            {
                def.sections.map(section => (
                    <section key={section.title || "empty"}>
                        {section.title ? <h3>{section.title}</h3> : null}
                        <ul>
                            {
                                section.ids.map(id => (
                                <li key={id} onClick={onClick(id)} className={styles(common["hover-bright"], id == props.equipment[0][props.slot] ? style.selected : undefined)}>
                                    <Item slot={props.slot} itemID={id} inSlot={false} />
                                    <p>{name(id, "jp")}</p>
                                </li>
                                ))
                            }
                        </ul>
                    </section>
                ))
            }
            </div>
        </>
    );
}


export default subjectsList;

const s: string = style.list
export { s as style };