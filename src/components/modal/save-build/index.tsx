import { usePresetStorage } from "@app/storage/preset";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import * as React from "react";
import { useIntl } from "react-intl";
import { useGetSet } from "react-use";

type Props = {
    currentConfig: SubjectConfig
    onDone: () => void
}

const saveBuild: React.FC<Props> = props => {
    const intl = useIntl();
    const [name, setName] = useGetSet(intl.formatMessage({id: `Character/Name/${props.currentConfig.subject}`}));
    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setName(event.currentTarget.value);
    }, []);

    const { saveNew } = usePresetStorage()

    const onDone = React.useCallback(() => {
        saveNew(name(), props.currentConfig);
        props.onDone();
    }, []);

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(event => {
        if (event.nativeEvent.isComposing || event.key != "Enter" || event.currentTarget.value.length == 0) return;
        onDone();
    }, [])

    return (
        <>
            <header>
                <h1>ビルドを保存</h1>
            </header>
            <label>名前：<input value={name()} onChange={onChange} onKeyDown={onKeyDown} /></label>
            <button disabled={name().length == 0} onClick={onDone}>保存</button>
        </>
    );
}

export default saveBuild;