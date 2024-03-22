import { EquipmentAbility, name } from "@app/entity/equipment-ability";
import * as React from "react";
import PrimodalHex from "components/item-skills/primodal-hex/description";
import Vigor from "components/item-skills/vigor/description";

const skill: React.FC<EquipmentAbility> = props => {
    const text = (() => {
        switch (props.id) {
            case "primodal_hex": return <PrimodalHex values={props.values} />;
            case "vigor": return <Vigor values={props.values} />;
            default: return null;
        }
    })();

    return (
        <div>
            <header>
                <h2>固有装備効果</h2>
            </header>
            <h3>{name(props.id, "jp")}</h3>
            {text}
        </div>
    );
};

export default skill;