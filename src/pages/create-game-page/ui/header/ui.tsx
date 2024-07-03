import {Image, Text, View} from "react-native";
import {Range} from "@/src/shared/ui/range/ui";
import {OverlayModal} from "@/src/shared/ui/overlay-modal/ui";
import {ImageButton} from "@/src/shared/ui/image-button/ui";
import {useState} from "react";

export function Header() {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    return (
        <View style={s.contentHeader}>
            <View style={{flexDirection: "row", marginBottom: 15}}>

                <View style={s.headerImageWrapper}>
                    <Image style={s.headerImage}
                           source={require("@/assets/images/gamecreationscreen/igroki.png")}/>
                    <Text style={s.playersCount}>4</Text>
                </View>
                <Text style={s.headerTitle}>Выберите {"\n"}количество {"\n"}даунов(4)</Text>
            </View>

            <View>
                <Range onPressIn={() => setIsModalOpened(true)}/>

                <OverlayModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}>
                    <View style={s.modal}>
                        <ImageButton onPress={() => setIsModalOpened(false)} style={s.modalClose}
                                     buttonImage={require("@/assets/images/popup/close.png")}
                                     shadowImage={require("@/assets/images/popup/close_shadow.png")}/>
                        <Text style={s.modalTitle}>ВРЕМЕНИ НА РАЗРАБОТКУ НЕТ</Text>
                        <Text>Ты же понимаешь насколько нецелесообразно было тратить время на разработку
                            ренжи игроков, учитывая что нас всегда четверо и мы ей никогда не
                            пользовались?</Text>
                    </View>
                </OverlayModal>
            </View>
            <Text style={s.headerSubTitle}>Рекомендуемый IQ: 20-93</Text>
        </View>
    )
}

const s: any = {
    modal: {
        position: "absolute",
        margin: 20,
        backgroundColor: "white",
        padding: 20,
        paddingRight: 30,
        borderRadius: 15
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10
    },
    modalClose: {
        position: "absolute",
        right: -10,
        top: 10,
        width: 30,
        height: 30,
    },
    headerImageWrapper: {
        position: "relative",
        width: 100,
        height: 100,
        marginRight: 10
    },
    playersCount: {
        position: "absolute",
        fontSize: 47,
        left: 32,
        top: 0,
        color: "#21272e",
        fontFamily: "RobotoSlab",
        fontWeight: 600
    },
    contentHeader: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 25,
        color: "#21272e",
        fontFamily: "RobotoSlab",
        fontWeight: 600,
        letterSpacing: 1.5
    },
    headerImage: {
        width: "100%",
        height: "100%"
    },
    headerSubTitle: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 10,
        color: "#6f586c",
        fontWeight: 600
    },
}