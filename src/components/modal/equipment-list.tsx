import * as React from "react";
import Item from "components/item/item";
import style from "./equipment-list.module.styl";
import { EquipmentID } from "app-types/equipment/id";
import { WeaponMasteryStatus } from "app-types/subject-static/mastery";
import SegmentedControl from "components/common/segmented-control";
import { styles } from "@app/util/style";
import common from "@app/common.module.styl";
import Blank from "components/item/blank";
import { Equipment } from "app-types/subject-dynamic/config";
import { ArmorTypeID } from "app-types/equipment/armor";
import { FormattedMessage, useIntl } from "react-intl";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { ArmArmorCodes, ChestArmorCodes, EquipmentStatusDictionary, HeadArmorCodes, LegArmorCodes, WeaponTypeCodes } from "app-types/equipment";
import { SubjectCode } from "app-types/subject-static";
import { useLocalStorage } from "react-use";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";

type Props = {
    subject: SubjectCode
    equipment: [Equipment, React.Dispatch<React.SetStateAction<Equipment>>]
    slot: "Weapon" | ArmorTypeID
}

function splitIdsWithRarity(ids: EquipmentID[], david: boolean = false): {title: string, ids: EquipmentID[]}[] {
    const splitted = ids.reduce((prev, id) => {
        const status = EquipmentStatusDictionary[id];
        if (david != (status.david?.from != undefined)) return prev;

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

const priyaUnique: number[] = [201416, 201516];

const subjectsList: React.FC<Props> = props => {
    const intl = useIntl();
    const uiType = useResponsiveUIType();
    const [david, setDavid] = useLocalStorage("equipment-list-david", "notDavid");

    const def: {title: string, sections: {title?: string, mastery?: React.ReactElement, ids: EquipmentID[]}[]} = React.useMemo(() => {
        switch (props.slot) {
            case "Head":    
                const IDs = props.subject == 51 ? priyaUnique : HeadArmorCodes.filter(id => priyaUnique.includes(id) == false);
                return {title: "頭", sections: splitIdsWithRarity(IDs)};
            case "Chest":
                return {title: "胴", sections: splitIdsWithRarity(ChestArmorCodes, david == "david")};
            case "Arm":
                return {title: "腕", sections: splitIdsWithRarity(ArmArmorCodes)};
            case "Leg":
                return {title: "脚", sections: splitIdsWithRarity(LegArmorCodes)};
            case "Weapon":
                const availableTypes = Object.keys(WeaponMasteryStatus[props.subject]) as WeaponTypeID[];
                const names = availableTypes.map(id => intl.formatMessage({id: `MasteryType/${id}`}));
                const masteryInfo = WeaponMasteryStatus[props.subject];
                return {
                    title: "武器", 
                    sections: availableTypes.map((id, i) => {
                        const masteryStatus = masteryInfo[id];
                        const targetMasteryStatus = (() => {
                            switch (masteryStatus?.type) {
                                case "attack_power":
                                    return `攻撃力${masteryStatus.value.toString()}/熟練度`
                                case "basic_attack_amp":
                                    return `基本攻撃増幅${masteryStatus.value.toString()}%/熟練度`
                                case "skill_amp":
                                    return `スキル増幅${masteryStatus.value.toString()}%/熟練度`
                            }
                        })();

                        const attackSpeed = `攻撃速度${masteryStatus?.attackSpeed.toString()}%/熟練度`

                        return {
                            title: names[i],
                            mastery: <>{targetMasteryStatus}<br />{attackSpeed}</>,
                            ids: WeaponTypeCodes[id]
                        }
                    })
                }
        }
    }, [props.slot, props.subject, david]);

    const onClick = React.useCallback((id: EquipmentID | null) => () => {
        props.equipment[1](prev => ({...prev, [props.slot]: id}))
    }, [props.slot]);

    return (
        <>
            <header>
                <h1>
                    装備選択 {def.title}
                    {
                        props.slot == "Chest" ? 
                        <SegmentedControl 
                            name="equipment-sort" 
                            value={[david, setDavid]} 
                            segments={[{title: "通常", value: "notDavid"}, {title: "David", value: "david"}]} 
                        />
                        : 
                        null
                    }
                </h1>
                <p>{uiType == "mobile" ? "ダブルタップでツールチップを表示" : "マウスオーバーでツールチップを表示"}</p>
            </header>
            <div className={style.content}>
                <section key="remove">
                    <div className={styles(style.blank, common["hover-bright"], props.equipment[0][props.slot] == null ? style.selected : undefined)}>
                        <Blank slot={props.slot} onClick={onClick(null)} />
                        <p>外す</p>
                    </div>
                </section>
            {
                def.sections.map(section => (
                    <section key={section.title || "empty"}>
                        <header>
                            {section.title ? <h3>{section.title}</h3> : null}
                            {section.mastery ? <p>{section.mastery}</p> : null}
                        </header>
                        <ul>
                            {
                                section.ids.map(id => (
                                <li key={id} className={styles(common["hover-bright"], id == props.equipment[0][props.slot] ? style.selected : undefined)}>
                                    <Item 
                                        slot={props.slot} 
                                        itemID={id} 
                                        inSlot={false}
                                        onSingleClick={onClick(id)}
                                    />
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