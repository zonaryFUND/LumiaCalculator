import * as React from "react";
import { Subjects, SubjectID, name } from "@app/entity/subject";
import style from "./subject-list.module.styl";
import Images from "@app/resources/image";

type Props = {
    current: SubjectID
    onSelect: (subject: SubjectID) => void
}

type SubjectProps = {
    id: SubjectID
    onSelect: (id: SubjectID) => void
    selected: boolean
}

const Subject: React.FC<SubjectProps> = props => (
    <li 
        className={props.selected ? style.selected : undefined} 
        key={props.id} 
        onClick={() => props.onSelect(props.id)}
    >
        <img src={Images.subject[props.id]} />
        <p>{name(props.id, "jp")}</p>
    </li>
)

const SortedSubjects = Subjects.map(s => ({id: s, name: name(s, "jp")})).sort((a, b) => a.name > b.name ? 1 : -1).map(v => v.id);
const StandardList: React.FC<Props> = props => (
    <ul>
        {
            SortedSubjects.map(id => (
                <Subject 
                    id={id} 
                    onSelect={props.onSelect} 
                    selected={props.current == id}
                />
            ))
        }
    </ul>
)

const aiueoDef: {index: string, ids: SubjectID[]}[] = [
    {index: "アルファベット", ids: ["eleven"]},
    {index: "あ", ids: [
        "isaac", "isol", "adina", "adela", "adriana",
        "abigail", "aya", "arda", "alex", "alonso",
        "ly_anh", "irem", "vanya", "william", "aiden",
        "eva", "echion", "estelle", "emma", "elena"
    ]},
    {index: "か", ids: [
        "karla", "katja", "camilo", "chiara", "cathy",
        "chloe", "kenneth"
    ]},
    {index: "さ", ids: [
        "zahir", "xiukai","jenny", "sissela", "charlotte",
        "jackie", "shoichi", "silvia", "sua", "celine"
    ]},
    {index: "た", ids: [
        "li_dailin", "tazia", "daniel", "tia", "theodore",
        "debi_marlene"
    ]},
    {index: "な", ids: [
        "nathapon", "nadine", "nicky"
    ]},
    {index: "は", ids: [
        "hart", "barbara", "bernice", "bianca", "piolo", 
        "hyunwoo", "fiora", "felix", "priya", "haze", "hyejin"
    ]},
    {index: "ま", ids: [
        "mai", "magnus", "martina", "markus"
    ]},
    {index: "や", ids: [
        "jan", "yuki", "johann"
    ]},
    {index: "ら", ids: [
        "laura", "rio", "luke", "leon", "leni", "lenox", "rozzi"
    ]}
]

const SectionedList: React.FC<Props> = props => (
    <>
        {
            aiueoDef.map(tuple => (
                <section>
                    <h3>{tuple.index}</h3>
                    <ul>
                        {
                            tuple.ids.map(id => 
                                <Subject 
                                    id={id} 
                                    onSelect={props.onSelect} 
                                    selected={props.current == id}
                                />
                            )
                        }
                    </ul>
                </section>
            ))
        }
    </>
)

const subjectsList: React.FC<Props> = props => {
    const [aiueo, setAiueo] = React.useState(false);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setAiueo(event.target.value == "dictionary")
    }, []);
    const controlRef = React.useRef<HTMLDivElement>(null)
    const inGameRef = React.useRef<HTMLLabelElement>(null);
    const dictRef = React.useRef<HTMLLabelElement>(null);
    React.useEffect(() => {
        const x = (aiueo ? dictRef : inGameRef).current?.offsetLeft;
        controlRef.current?.style.setProperty("--highlight-x-pos", `${x}px`)
    }, [aiueo]);

    return (
        <>
            <header>
                <h1>実験体選択</h1>
                <div className={style.segment} ref={controlRef}>
                    <label 
                        className={aiueo ? undefined : style.active}
                        ref={inGameRef}
                    >
                        ゲーム内表示順
                        <input 
                            type="radio" 
                            name="subjects-sort"
                            value="in-game"
                            checked={!aiueo} 
                            onChange={onChange}
                        />
                    </label>
                    <label 
                        className={aiueo ? style.active : undefined}
                        ref={dictRef}
                    >
                        日本語辞書順
                        <input 
                            type="radio"
                            name="subjects-sort"
                            value="dictionary"
                            checked={aiueo} 
                            onChange={onChange}
                        />
                    </label>
                </div>
            </header>
            <div className={style.content}>
                {   
                    aiueo ?
                    <SectionedList {...props} /> :
                    <StandardList {...props} />
                }
            </div>
        </>
    );
}

export default subjectsList;

const s: string = style.subjects
export { s as style };