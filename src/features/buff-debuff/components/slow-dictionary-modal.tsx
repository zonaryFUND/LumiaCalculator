import * as React from "react";
import { useToggle } from "react-use";
import Modal from "react-modal";
import { FormattedMessage } from "react-intl";
import { SlowDictionary, SlowDictionaryEntry } from "@app/ingame-params/buff-debuff/slow-dictionary";
import common from "@app/common.module.styl";
import style from "./slow-dictionary-modal.module.styl";

/**
 * 汎用スロウ（`generic.slow`）行に添える「辞書」ボタン＋モーダル。移動速度減少率ごとに、その効果量を
 * 与えうる発生源（実験体固有スキル等。`SlowDictionary`参照）を一覧表示する参照専用UI。クリックしても
 * 選択・反映は行わない（行のスタック選択自体には一切関与しない）
 */
const SlowDictionaryModal: React.FC = () => {
    const [open, toggleOpen] = useToggle(false);

    const grouped = React.useMemo(() => {
        const map = new Map<number, SlowDictionaryEntry[]>();
        for (const entry of SlowDictionary) {
            map.set(entry.value, [...(map.get(entry.value) ?? []), entry]);
        }
        return [...map.entries()];
    }, []);

    return (
        <>
            <button type="button" className={style.open} onClick={toggleOpen}>
                <FormattedMessage id="app.buff-debuff.slow-dictionary" />
            </button>
            <Modal
                isOpen={open}
                shouldCloseOnOverlayClick
                onRequestClose={toggleOpen}
                className={style.list}
                overlayClassName={common["modal-overlay"]}
            >
                <h1><FormattedMessage id="app.buff-debuff.slow-dictionary" /></h1>
                {
                    grouped.length == 0 ?
                    <p><FormattedMessage id="app.buff-debuff.slow-dictionary-empty" /></p> :
                    <table>
                        <tbody>
                            {
                                grouped.map(([value, entries]) => (
                                    <tr key={value}>
                                        <td className={style.value}>{value}%</td>
                                        <td>
                                            <ul>
                                                {
                                                    entries.map((entry, i) => (
                                                        <li key={i}>
                                                            <FormattedMessage id={entry.sourceIntlID} />{" "}
                                                            <FormattedMessage id={entry.nameIntlID} />
                                                            {entry.valueLabel ? <>{" "}(<FormattedMessage id={entry.valueLabel} />)</> : null}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </Modal>
        </>
    );
};

export default SlowDictionaryModal;
