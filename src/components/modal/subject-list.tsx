import * as React from "react";
import { Subjects, SubjectID, name } from "app-types/subject-static";
import style from "./subject-list.module.styl";
import Images from "@app/resources/image";
import SegmentedControl from "components/common/segmented-control";
import { useLocalStorage } from "react-use";
import common from "@app/common.styl";
import { styles } from "@app/util/style";

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
        className={styles(props.selected ? style.selected : undefined, common.hover)} 
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
                    key={id}
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
        "garnet", "karla", "katja", "camilo", "chiara", "cathy",
        "chloe", "kenneth"
    ]},
    {index: "さ", ids: [
        "zahir", "xiukai","jenny", "sissela", "charlotte",
        "jackie", "shoichi", "silvia", "sua", "celine"
    ]},
    {index: "た", ids: [
        "li_dailin", "tazia", "daniel", "darko", "tia", "theodore",
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
        "jan", "yuki", "yumin", "johann"
    ]},
    {index: "ら", ids: [
        "laura", "rio", "luke", "leon", "leni", "lenore", "lenox", "rozzi"
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
    const [sort, setSort] = useLocalStorage("subject-list-sort", "in-game");

    return (
        <>
            <header>
                <h1>実験体選択</h1>
                <SegmentedControl name="subjects-sort" value={[sort, setSort]} segments={[{title: "ゲーム内表示順", value: "in-game"}, {title: "日本語辞書順", value: "dictionary"}]} />
            </header>
            <div className={style.content}>
                {   
                    sort == "in-game" ?
                    <StandardList {...props} /> :
                    <SectionedList {...props} />
                }
            </div>
        </>
    );
}

export default subjectsList;

const s: string = style.subjects
export { s as style };