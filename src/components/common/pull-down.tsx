import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import style from "./pull-down.module.styl";
import { StateProps } from "@app/util/state";
import Modal from "react-modal";
import { useToggle } from "react-use";
import { styles } from "@app/util/style";
import { FormattedMessage } from "react-intl";

type Props = {
    label?: string
    value: {
        max: number
        current: number
        set: (to: number) => void
    } | {
        intlID?: boolean
        list: string[]
        current: string
        set: (to: string) => void
    }
    layout: "config" | "skill"
}

const selection: React.FC<Props> = props => {
    const index = React.useMemo(() => {
        if ("max" in props.value) {
            return props.value.current - 1;
        } else {
            return props.value.list.indexOf(props.value.current);
        }
    }, [props.value]);
    const intlID = "intlID" in props.value ? props.value.intlID : false;
    const [selecting, toggleSelecting] = useToggle(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const onSelect = React.useCallback((index: number) => () => {
        if ("max" in props.value) {
            props.value.set(index + 1)
        } else {
            props.value.set(props.value.list[index]);
        }
        toggleSelecting(false);
    }, [])

    const onAfterOpen: Modal.OnAfterOpenCallback = React.useCallback(obj => {
        const top = (ref.current?.offsetHeight ?? 0) * index;
        obj?.contentEl.scrollTo({ top })
    }, [index])
    
    const list = React.useMemo(() => {
        if ("max" in props.value) {
            return [...Array(props.value.max)].map((_, i) => i + 1)
        } else {
            return props.value.list;
        }
    }, [props.value])

    return (
        <>
            <div 
                className={styles(style.selection, props.layout == "config" ? style.config : style.skill)} 
                onClick={toggleSelecting}
                ref={ref}
                style={{}}
            >
                {props.label ? <p>{props.label}</p> : null}
                <span>{intlID ? <FormattedMessage id={props.value.current as string} /> : props.value.current}</span>            
                <span className={`material-symbols-outlined`}>expand_more</span>
            </div>
            <Modal 
                isOpen={selecting} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleSelecting}
                overlayClassName={style.overlay}
                className={style.options}
                style={{
                    content: {
                        top: ref.current?.getBoundingClientRect().top,
                        left: ref.current?.getBoundingClientRect().left,
                        width: ref.current?.offsetWidth
                    }
                }}
                onAfterOpen={onAfterOpen}
            >
                <ul>
                    {
                        list.map((element, i) => (
                            <li
                                key={element}
                                className={i == index ? style.selected : undefined}
                                onClick={onSelect(i)}
                            >
                                {intlID ? <FormattedMessage id={element as string} /> : element}
                            </li>
                        ))
                    }
                    {}
                </ul>
            </Modal>
        </>
    )
};

export default selection;