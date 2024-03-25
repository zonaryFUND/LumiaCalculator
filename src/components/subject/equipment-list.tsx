import * as React from "react";
import Item from "components/items/item";
import { ArmorTypeID } from "@app/entity/equipment";
import style from "./equipment-list.module.styl";
import { WeaponIDsForType, Weapons } from "@app/entity/weapon-id";
import { Arms, Chests, Heads, Legs } from "@app/entity/armor-id";
import { EquipmentID } from "@app/entity/equipment-id";
import { EquipmentContext, SubjectContext } from "./subject-context";
import { mastery } from "@app/entity/mastery";

type Props = {
    slot: "weapon" | ArmorTypeID
}

const subjectsList: React.FC<Props> = props => {
    const [subject, setSubject] = React.useContext(SubjectContext)!;
    const IDs = React.useMemo(() => {
        switch (props.slot) {
            case "head":    return Heads;
            case "chest":   return Chests;
            case "arm":     return Arms;
            case "leg":     return Legs;
            case "weapon":
                if (subject == null) return [];
                return mastery(subject).map(m => m.weapon).flatMap(weaponType => WeaponIDsForType(weaponType));
        }
    }, [props.slot, subject])

    const [equipment, setEquipment] = React.useContext(EquipmentContext)!;
    const onClick = React.useCallback((id: EquipmentID) => {
        setEquipment(prev => ({...prev, [props.slot]: id}))
    }, [props.slot]);

    return (
        <div className={style.list}>
            <ul>
                {IDs.map(id => (
                    <li key={id} onClick={() => onClick(id)}>
                        <Item slot={props.slot} itemID={id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default subjectsList;