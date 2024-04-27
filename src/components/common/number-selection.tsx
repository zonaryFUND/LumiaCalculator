import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import style from "./number-selection.module.styl";
import { StateProps } from "@app/util/state";
import Modal from "react-modal";
import { useToggle } from "react-use";

type Props = {
    label: string
    max: number
    value: StateProps<number>
}

const selection: React.FC<Props> = props => {
    const [selecting, toggleSelecting] = useToggle(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const onSelect = React.useCallback((value: number) => () => {
        props.value[1](value);
        toggleSelecting(false);
    }, [])

    const onAfterOpen: Modal.OnAfterOpenCallback = React.useCallback(obj => {
        const top = (ref.current?.offsetHeight || 0) * (props.value[0] - 1);
        obj?.contentEl.scrollTo({ top })
    }, [props.value[0]])    

    return (
        <>
            <div 
                className={style.selection} 
                onClick={toggleSelecting}
                ref={ref}
            >
                <p>{props.label}</p>
                <span>{props.value[0]}</span>            
                <span className={`material-symbols-outlined ${style.open}`}>expand_more</span>
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
                    {[...Array(props.max)].map((_, i) => (
                        <li
                            key={i + 1}
                            className={i + 1 == props.value[0] ? style.selected : undefined}
                            onClick={onSelect(i + 1)}
                        >
                            {`${i + 1}`}
                        </li>
                    ))}
                </ul>
            </Modal>
        </>
    )
};

export default selection;