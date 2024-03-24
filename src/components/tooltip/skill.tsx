import { EquipmentAbility, name } from "@app/entity/equipment-ability";
import * as React from "react";
import PrimodalHex from "components/item-skills/primodal-hex";
import Vigor from "components/item-skills/vigor";
import MagneticMidnight from "components/item-skills/magnetic-midnight";
import Smolder from "components/item-skills/smolder";
import LichsGrasp from "components/item-skills/lichs-grasp";

const skill: React.FC<EquipmentAbility> = props => {
    const text = (() => {
        switch (props.id) {
            case "primodal_hex": return <PrimodalHex values={props.values} />;
            case "vigor": return <Vigor values={props.values} />;
            case "magnetic_midnight": return <MagneticMidnight values={props.values} />;
            case "smolder": return <Smolder values={props.values} />;
            case "lichs_grasp": return <LichsGrasp values={props.values} />;
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