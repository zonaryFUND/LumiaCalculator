import * as React from "react";
import { SubjectCode, SubjectCodeMax } from "app-types/subject-static";
import style from "./subject-list.module.styl";
import Images from "@app/resources/image";
import SegmentedControl from "components/common/segmented-control";
import { useLocalStorage } from "react-use";
import common from "@app/common.module.styl";
import { styles } from "@app/util/style";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";

type Props = {
    current: SubjectCode
    onSelect: (subject: SubjectCode) => void
}

type SubjectProps = {
    code: SubjectCode
    onSelect: (code: SubjectCode) => void
    selected: boolean
}

const Subject: React.FC<SubjectProps> = props => (
    <li 
        className={styles(props.selected ? style.selected : undefined, common.hover)} 
        key={props.code} 
        onClick={() => props.onSelect(props.code)}
    >
        <img src={Images.subject[props.code]} />
        <p><FormattedMessage id={`Character/Name/${props.code}`} /></p>
    </li>
)

const subjectsList: React.FC<Props> = props => {
    const [sort, setSort] = useLocalStorage("subject-list-sort", "in-game");
    const intl = useIntl();
    const jpNameWithCode = React.useMemo(() => {
        return [...Array(SubjectCodeMax - 1).keys()]
            .map(index => ({code: index + 1, name: intl.formatMessage({id: `Character/Name/${index + 1}`})}))
    }, []);

    const sorted = React.useMemo(() => {
        return jpNameWithCode
            .toSorted((a, b) => a.name > b.name ? 1 : -1)
            .map(v => v.code)
    }, []);

    const aiueoSorted = React.useMemo(() => {
        const sanitizedNameWithCode = jpNameWithCode
            .map(entry => {
                if (entry.name == "雪") return {code: entry.code, name: "ゆき"};
                if (entry.name == "彰一") return {code: entry.code, name: "しょういち"};
                if (entry.name == "莉央") return {code: entry.code, name: "りお"};
                return entry;
            });

        function filtered(initialRegex: RegExp): SubjectCode[] {
            return sanitizedNameWithCode
                .filter(entry => initialRegex.test(entry.name[0]))
                .toSorted((a, b) => a.name.localeCompare(b.name, "ja"))
                .map(entry => entry.code);
        }
        
        return [
            {index: "アルファベット", ids: filtered(/[a-zA-Z]/)},
            {index: "あ", ids: filtered(/[あ-おア-オ]/)},
            {index: "か", ids: filtered(/[か-こカ-コ]/)},
            {index: "さ", ids: filtered(/[さ-そサ-ソ]/)},
            {index: "た", ids: filtered(/[た-とタ-ト]/)},
            {index: "な", ids: filtered(/[な-のナ-ノ]/)},
            {index: "は", ids: filtered(/[は-ほハ-ホ]/)},
            {index: "ま", ids: filtered(/[ま-もマ-モ]/)},
            {index: "や", ids: filtered(/[や-よヤ-ヨ]/)},
            {index: "ら", ids: filtered(/[ら-ろラ-ロ]/)},
            //{index: "わ", ids: filtered(/[わ-んワ-ン]/)}
        ]
    }, []);


    return (
        <>
            <header>
                <h1>実験体選択</h1>
                <SegmentedControl name="subjects-sort" value={[sort, setSort]} segments={[{title: "ゲーム内表示順", value: "in-game"}, {title: "日本語辞書順", value: "dictionary"}]} />
            </header>
            <div className={style.content}>
                {   
                    sort == "in-game" ?
                    <ul>
                        {
                            sorted.map(code => (
                                <Subject
                                    key={code}
                                    code={code} 
                                    onSelect={props.onSelect} 
                                    selected={props.current == code}
                                />
                            ))
                        }
                    </ul>
                    :
                    <>
                        {
                            aiueoSorted.map(tuple => (
                                <section key={tuple.index}>
                                    <h3>{tuple.index}</h3>
                                    <ul>
                                        {
                                            tuple.ids.map(code => 
                                                <Subject
                                                    key={code}
                                                    code={code} 
                                                    onSelect={props.onSelect} 
                                                    selected={props.current == code}
                                                />
                                            )
                                        }
                                    </ul>
                                </section>
                            ))
                        }
                    </>
                }
            </div>
        </>
    );
}

export default subjectsList;

const s: string = style.subjects
export { s as style };