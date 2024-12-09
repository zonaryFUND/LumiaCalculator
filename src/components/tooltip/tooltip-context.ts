import * as React from "react";
import { TooltipRefProps } from "react-tooltip";
import { createContext } from "vm";

export type OpenModalItemProps = {
    itemCode: number,
    onSlot: boolean,
    subjectSide: "left" | "right" | undefined
}

type Props = {
    openModalSkill: React.MutableRefObject<() => void>
    openModalItem: React.MutableRefObject<(props: OpenModalItemProps) => void>
}

export function useOpenModalSkillRef(): Props["openModalSkill"] {
    return React.useRef<() => void>(() => {});
}

export function useOpenModalItemRef(): Props["openModalItem"] {
    return React.useRef<(props: OpenModalItemProps) => void>(() => {});
}

export const TooltipContext = React.createContext<Props | null>(null);