import * as React from "react";
import Item from "components/item/item";
import style from "./equipment-list.module.styl";
import { EquipmentID } from "app-types/equipment/id";
import { WeaponMasteryStatus } from "app-types/subject-static/mastery";
import SegmentedControl from "components/common/segmented-control";
import { useLocalStorage } from "react-use";
import { styles } from "@app/util/style";
import common from "@app/common.module.styl";
import Blank from "components/item/blank";
import { Equipment } from "app-types/subject-dynamic/config";
import { ArmorTypeID } from "app-types/equipment/armor";
import { FormattedMessage, useIntl } from "react-intl";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { ArmArmorCodes, ChestArmorCodes, EquipmentStatusDictionary, HeadArmorCodes, LegArmorCodes, WeaponTypeCodes } from "app-types/equipment";
import { SubjectCode } from "app-types/subject-static";

type Props = {
    subject: SubjectCode
    equipment: [Equipment, React.Dispatch<React.SetStateAction<Equipment>>]
    slot: "Weapon" | ArmorTypeID
}

function splitIdsWithRarity(ids: EquipmentID[]): {title: string, ids: EquipmentID[]}[] {
    const splitted = ids.reduce((prev, id) => {
        const status = EquipmentStatusDictionary[id];
        return {
            ...prev,
            [status.itemGrade]: (prev[status.itemGrade] ?? []).concat(id)
        };
    }, {Epic: [] as EquipmentID[], Legend: [] as EquipmentID[], Mythic: [] as EquipmentID[]})

    return [
        {title: "英雄等級", ids: splitted.Epic},
        {title: "伝説等級", ids: splitted.Legend},
        {title: "神話等級", ids: splitted.Mythic}
    ].filter(v => v.ids.length != 0)
}

function splitAndRemergeItems(ids: EquipmentID[]): { ids: EquipmentID[] }[] {
    const splitted = splitIdsWithRarity(ids);
    return [{ids :splitted.flatMap(({ ids }) => ids) }];
}

const priyaUnique: number[] = [201416, 201516];

const subjectsList: React.FC<Props> = props => {
    const intl = useIntl();
    const [layout, setLayout] = useLocalStorage("equipment-list-sort", "in-game");

    const def: {title: string, sections: {title?: string, ids: EquipmentID[]}[]} = React.useMemo(() => {
        switch (props.slot) {
            case "Head":    
                const IDs = props.subject == 51 ? priyaUnique : HeadArmorCodes.filter(id => priyaUnique.includes(id) == false);
                return {title: "頭", sections: layout == "in-game" ? splitAndRemergeItems(IDs) : splitIdsWithRarity(IDs)};
            case "Chest":   
                return {title: "胴", sections: layout == "in-game" ? splitAndRemergeItems(ChestArmorCodes) : splitIdsWithRarity(ChestArmorCodes)};
            case "Arm":
                return {title: "腕", sections: layout == "in-game" ? splitAndRemergeItems(ArmArmorCodes) : splitIdsWithRarity(ArmArmorCodes)};
            case "Leg":
                return {title: "脚", sections: layout == "in-game" ? splitAndRemergeItems(LegArmorCodes) : splitIdsWithRarity(LegArmorCodes)};
            case "Weapon":
                const availableTypes = Object.keys(WeaponMasteryStatus[props.subject]) as WeaponTypeID[];
                const names = availableTypes.map(id => intl.formatMessage({id: `MasteryType/${id}`}))
                return {
                    title: names.join("、"), 
                    sections: availableTypes.map((id, i) => ({
                        title: names.length == 1 ? undefined : names[i],
                        ids: WeaponTypeCodes[id]
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
                {props.slot == "Weapon" ? null : <SegmentedControl name="equipment-sort" value={[layout, setLayout]} segments={[{title: "一括表示", value: "in-game"}, {title: "等級別表示", value: "rarity"}]} />}
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
                                    <p><FormattedMessage id={`Item/Name/${id}`} /></p>
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