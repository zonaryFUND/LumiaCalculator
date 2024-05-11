import * as React from "react";
import { useGetSet } from "react-use";

type Props = {
    defaultName: string
    onSave: (name: string) => void
}

const saveBuild: React.FC<Props> = props => {
    const [name, setName] = useGetSet(props.defaultName);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setName(event.currentTarget.value);
    }, []);
    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(event => {
        if (event.nativeEvent.isComposing || event.key != "Enter" || event.currentTarget.value.length == 0) return;
        props.onSave(name());
    }, [])

    return (
        <>
            <header>
                <h1>ビルドを保存</h1>
            </header>
            <label>名前：<input value={name()} onChange={onChange} onKeyDown={onKeyDown} /></label>
            <button disabled={name().length == 0}>保存</button>
        </>
    );
}

export default saveBuild;