import * as React from "react";
import style from "./navigation.module.styl";
import { 
    Calculator, Sword, ChartBar, ChartLine, IconContext, GithubLogo, ArrowSquareOut,
    Database
} from "@phosphor-icons/react"
import { styles } from "@app/util/style";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";

type Props = {

}

const navigation: React.FC<Props> = props => {
    const { width } = useWindowSize();

    return (
        <IconContext.Provider value={{width: 40}}>
        <nav className={styles(style.nav, width < 1400 ? style.small : undefined)}>
            <h1>ルミア計算機</h1>
            <hr />
            <Link to="/simple" className={style.button}>
                <Calculator />
                <h2>シンプル</h2>
            </Link>
            <Link to="/combat" className={style.button}>
                <Sword />
                <h2>対戦</h2>
            </Link>
            <div className={style.button}>
                <ChartBar />
                <h2>成長(作成中)</h2>
            </div>
            <div className={style.button}>
                <ChartLine />
                <h2>成長対戦(作成中)</h2>
            </div>
            <Link to="/database" className={style.button}>
                <Database />
                <h2>データベース</h2>
            </Link>
            <hr />
            <a className={styles(style.button, style.link)} href="https://playeternalreturn.com" target="_blank">
                <ArrowSquareOut />
                <h2>エターナルリターン公式</h2>
            </a>
            <a className={styles(style.button, style.link)} href="https://github.com/zonaryFUND/LumiaCalculator" target="_blank">
                <GithubLogo />
                <h2>GitHub</h2>
            </a>
            <hr />
            <div className={style.acknowledgements}>
                <a className={style.link} href="https://playeternalreturn.com" target="_blank">エターナルリターン</a>はNimble Neuron社の著作物です。<br />
                <br />
                ルミア計算機は個人の研究のため作成された非営利・非公式Webサイトです。<br />
                画像は<a className={style.link} href="https://drive.google.com/drive/folders/1bgW32L09YPpRgQKtH4C_TAd3Kr0N9Y90" target="_blank">ファンキット</a>より引用され、ゲーム内テキストおよび文章はエターナルリターンより引用されています。 <br />
                <br />
                <br />
                <a className={style.link} href="https://forms.gle/VANo6tLDqr5vYbGe9" target="_blank">バグ報告用Googleフォーム</a>
            </div>
            <div className={style.warning}>
                ルミア計算機はα版です。機能には未実装のものが含まれ、値は間違っているかもしれません。<br />
                <br />
                対応バージョン：1.36
            </div>
        </nav>
        </IconContext.Provider>
    )
};

export default navigation;