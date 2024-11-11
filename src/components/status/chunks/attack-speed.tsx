import * as React from "react";
import style from "./02_basicattack.module.styl";
import { Sword, Wind } from "@phosphor-icons/react";

export default function () {
    return <span className={style.attack_speed}><Sword /><Wind weight="bold" /></span>
}