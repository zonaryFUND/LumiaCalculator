import * as React from "react";
import Modal from "react-modal";
import { Tooltip } from "react-tooltip";
import SkillTooltip from "./skill/tooltip";
import ItemTooltip from "./item/item-tooltip";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import style from "./tooltip.module.styl"
import { OpenModalItemProps, OpenModalSkillProps, TooltipContext } from "./tooltip-context";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import common from "@app/common.module.styl";
import { styles } from "@app/util/style";

type Props = {
    showEquation: boolean
    config: SubjectConfig | [SubjectConfig, SubjectConfig]
    status: Status | [Status, Status]
}

export const SkillTooltipID = "skill";

function sidedParams(props: Props, side: OpenModalSkillProps["subjectSide"]): { config: SubjectConfig, status: Status } {
    const config = Array.isArray(props.config) ? props.config[side == "left" ? 0 : 1] : props.config;
    const status = Array.isArray(props.status) ? props.status[side == "left" ? 0 : 1] : props.status;

    return { config, status }
}

const tooltipPresenter: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();
    const context = React.useContext(TooltipContext);

    const [modalSkillProps, setModalSkillProps] = React.useState<OpenModalSkillProps | null>(null);
    const [modalItemProps, setModalItemProps] = React.useState<OpenModalItemProps | null>(null)
    React.useEffect(() => {
        context!.openModalSkill.current = setModalSkillProps;
        context!.openModalItem.current = setModalItemProps;
    }, []);

    return (
        <>
            <Tooltip 
                id={SkillTooltipID}
                className={style.root}
                style={{padding: 0}}
                openEvents={uiType == "mobile" ? {click: false} : undefined}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');
                    const config = Array.isArray(props.config) ? props.config[side == "left" ? 0 : 1] : props.config;
                    const status = Array.isArray(props.status) ? props.status[side == "left" ? 0 : 1] : props.status;

                    return (
                        <SkillTooltip
                            code={+content} 
                            showEquation={props.showEquation}
                            config={config}
                            status={status}
                        />
                    );
                }}
            />
            <Tooltip 
                id="weapon"
                className={style.root}
                style={{padding: 0}}
                openEvents={uiType == "mobile" ? {click: false} : undefined}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');
                    const config = Array.isArray(props.config) ? props.config[side == "left" ? 0 : 1] : props.config;
                    const status = Array.isArray(props.status) ? props.status[side == "left" ? 0 : 1] : props.status;

                    const [item, onSlot] = content.split("%");
                    return (
                        <ItemTooltip 
                            itemID={+item} 
                            showEquation={props.showEquation || onSlot == undefined} 
                            config={config} 
                            status={status} 
                        />
                    );
                }}
            />
            <Modal
                isOpen={modalSkillProps != null}
                shouldCloseOnOverlayClick
                onRequestClose={() => setModalSkillProps(null)}
                className={style.modalbase}
                overlayClassName={styles(common["modal-overlay"], style.modaloverlay)}
            >
                {
                    modalSkillProps ?
                    (() => {
                        const { config, status } = sidedParams(props, modalSkillProps.subjectSide);
                        return (
                            <SkillTooltip
                                code={+modalSkillProps.skillCode} 
                                showEquation={props.showEquation}
                                config={config} 
                                status={status} 
                            /> 
                        )
                    })() :
                    null                    
                }
            </Modal>
            <Modal
                isOpen={modalItemProps != null}
                shouldCloseOnOverlayClick
                onRequestClose={() => setModalItemProps(null)}
                className={style.modalbase}
                overlayClassName={styles(common["modal-overlay"], style.modaloverlay)}
            >
                {
                    modalItemProps ?
                    (() => {
                        const { config, status } = sidedParams(props, modalItemProps.subjectSide);
                        return (
                            <ItemTooltip 
                                itemID={+modalItemProps.itemCode} 
                                showEquation={props.showEquation || !modalItemProps.onSlot} 
                                config={config} 
                                status={status} 
                            /> 
                        )
                    })() :
                    null                    
                }
            </Modal>
        </>
    )
}

export default tooltipPresenter;