import {Image, ImageBackground, Text, TouchableWithoutFeedback, View} from "react-native";
import {Footer} from "@/src/pages/create-game-page/ui/footer/ui";
import {useFonts} from "expo-font";
import {Range} from "@/src/shared/ui/range/ui";
import {ImageButton} from "@/src/shared/ui/image-button/ui";
import {OverlayModal} from "@/src/shared/ui/overlay-modal/ui";
import {useState} from "react";

// @ts-ignore
//TODO refactoring
//TODO fix font issues
export function CreateGamePage() {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const [fontsLoaded] = useFonts({
        "RobotoSlab": require("@/assets/fonts/RobotoSlab-Bold.ttf")
    })


    return <View style={s.createGamePageWrapper}>
        <Image style={s.pageTitle} resizeMode={"contain"}
               source={require("../../../../assets/images/gamecreationscreen/create.png")}/>
        <ImageBackground source={require("../../../../assets/images/gamecreationscreen/frame_back.png")}
                         resizeMode={"contain"} style={s.mainContentBackground}>
            <View style={s.mainContentWrapper}>
                <View style={s.mainContent}>
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
                    </View>
                </View>
            </View>
        </ImageBackground>
        <Footer/>
    </View>
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
    createGameButtonWrapper: {},
    createGamePageWrapper: {
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
    pageTitle: {
        maxWidth: "90%",
        marginTop: 50,
        marginBottom: 33,
        maxHeight: 80,
        flexBasis: "auto",
        alignSelf: "center"
    },
    mainContentWrapper: {
        position: "relative",
        width: "100%",
        height: 470,

    },
    mainContentBackground: {
        marginBottom: 25
    },
    mainContent: {
        position: "absolute",
        right: "17.5%",
        top: "2%",
        width: "65%",
        height: "96%",
        backgroundColor: "red",
        padding: 15,
        flexDirection: "column"

    },

}