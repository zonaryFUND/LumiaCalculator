import * as React from "react";
import { useSubjectStateStore } from "../store";
import SliderSection from "../components/slider-section.view";
import { SubjectStackInfoDictionary } from "@app/ingame-params/subjects/dictionary";
import { useIntl } from "react-intl";

const StackSlider: React.FC = () => {
    const intl = useIntl();
    const subject = useSubjectStateStore(s => s.config.subject);
    const stack = useSubjectStateStore(s => s.config.stack);
    const setStack = useSubjectStateStore(s => s.setStack);

    const stackInfo = React.useMemo(() => {
        return SubjectStackInfoDictionary[subject];
    }, [subject]);
    
    if (stackInfo == undefined) return null;

    return (
        <SliderSection
            style={{type: "stack"}}
            label={intl.formatMessage({id: stackInfo.nameIntlID})}
            value={[stack, setStack]}
            max={stackInfo.max}
        />
    )
}

export default StackSlider;
