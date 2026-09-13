import * as React from "react";
import { Question } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";
import style from "./help-icon.module.styl";

type Props = {
    /**
     * クリックで開くツールチップの中身（凡例など）。マウスオーバーではなくクリックで開閉する
     * （PC・モバイル問わず共通の挙動。行の説明ツールチップ・展開機能のようなタップの競合がないため）
     */
    children: React.ReactNode
}

/**
 * セクション見出しなどに添える、丸で囲まれた「？」アイコン。クリックすると`children`をツールチップとして
 * 表示し、アイコン外側のクリックまたはEscapeキーで閉じる。ホバーでは開かない（`openEvents`未指定＝
 * 既定の`mouseenter`等は効くが、クリック起点の用途のため誤操作を避けたい場合は呼び出し側で調整する）
 */
const HelpIcon: React.FC<Props> = ({ children }) => {
    const idRef = React.useRef<string>();
    if (idRef.current == undefined) idRef.current = `help-icon-${Math.random().toString(36).slice(2)}`;

    return (
        <>
            <Question
                weight="bold"
                size="1em"
                className={style.icon}
                data-tooltip-id={idRef.current}
            />
            <Tooltip
                id={idRef.current}
                className={style.tooltip}
                openEvents={{click: true, mouseenter: false}}
                closeEvents={{click: false, mouseleave: false}}
                globalCloseEvents={{clickOutsideAnchor: true, escape: true}}
                clickable
            >
                {children}
            </Tooltip>
        </>
    );
};

export default HelpIcon;
