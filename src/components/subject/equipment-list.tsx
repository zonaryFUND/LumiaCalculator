import * as React from "react";
import Item from "components/items/item";
import { ArmorTypeID } from "@app/entity/equipment";
import style from "./equipment-list.module.styl";
import { Weapons } from "@app/entity/weapon-id";
import { Arms, Chests, Heads, Legs } from "@app/entity/armor-id";

type Props = {
    slot: "weapon" | ArmorTypeID
}

const subjectsList: React.FC<Props> = props => {
    const IDs = React.useMemo(() => {
        switch (props.slot) {
            case "weapon":  return Weapons;
            case "head":    return Heads;
            case "chest":   return Chests;
            case "arm":     return Arms;
            case "leg":     return Legs
        }
    }, [props.slot])

    return (
        <div className={style.list}>
            <ul>
                {IDs.map(id => (
                    <li key={id}>
                        <Item slot={props.slot} itemID={id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default subjectsList;