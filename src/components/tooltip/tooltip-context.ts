import * as React from "react";

export type OpenModalSkillProps = {
    skillCode: number,
    subjectSide: "left" | "right" | undefined        
}

export type OpenModalItemProps = {
    itemCode: number,
    onSlot: boolean,
    subjectSide: "left" | "right" | undefined
}



type Props = {
    openModalSkill: React.MutableRefObject<(props: OpenModalSkillProps) => void>
    openModalItem: React.MutableRefObject<(props: OpenModalItemProps) => void>
}

export function useOpenModalSkillRef(): Props["openModalSkill"] {
    return React.useRef<(props: OpenModalSkillProps) => void>(() => {});
}

export function useOpenModalItemRef(): Props["openModalItem"] {
    return React.useRef<(props: OpenModalItemProps) => void>(() => {});
}

export const TooltipContext = React.createContext<Props | null>(null);