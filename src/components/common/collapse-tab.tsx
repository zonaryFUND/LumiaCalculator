import * as React from "react";
import style from "./collapse-tab.module.styl";
import TabSelector from "components/pages/simple/tab-selector";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css"

type Props = {
    children: React.ReactElement[]
    tabs: string[]
}

const collapseTab: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();
    const [tab, setTab] = React.useState(0);
    const swiperRef = React.useRef<SwiperClass>();

    const onTabChange: React.Dispatch<React.SetStateAction<number>> = React.useCallback(index => {
        setTab(index);
        if (typeof index == "function") {
            swiperRef.current?.slideTo(index(0));
        } else {
            swiperRef.current?.slideTo(index);
        }
    }, [])
    const onSlideChange = React.useCallback((swiper: SwiperClass) => {
        setTab(swiper.activeIndex);
    }, []);

    return (
        uiType == "mobile" ?
        <>
            <TabSelector tabs={props.tabs} tab={[tab, onTabChange]} />
            <Swiper
                onSwiper={swiper => { swiperRef.current = swiper }}
                className={style.swiper}
                tabIndex={tab}
                onSlideChange={onSlideChange}
            >
                {props.children.map((c, i) => <SwiperSlide key={i}>{c}</SwiperSlide>)}
            </Swiper>
        </> :
        <div className={style.pcbase}>
            {props.children}
        </div>
    );
};

export default collapseTab;