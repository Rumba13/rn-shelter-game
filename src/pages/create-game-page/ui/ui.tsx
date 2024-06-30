import {Image, ImageBackground, Text, View} from "react-native";
import {Footer} from "@/src/pages/create-game-page/ui/footer/ui";
import {ImageButton} from "@/src/shared/ui/image-button/ui";
import {useFonts} from "expo-font";

export function CreateGamePage() {
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
                        <View style={s.headerImageWrapper}>
                            <Image style={s.headerImage}
                                   source={require("@/assets/images/gamecreationscreen/igroki.png")}/>
                            <Text style={s.playersCount}>4</Text>
                        </View>
                        <Text style={s.headerTitle}>Выберите {"\n"}количество {"\n"}даунов(4)</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
        <Footer/>
    </View>
}

const s: any = {
    headerImageWrapper: {
        position: "relative",
        width: 100,
        height: 100,
        marginRight:15
    },
    playersCount: {
        position: "absolute",
        fontSize:47,
        left: 32,
        top: 0,
        color:"#21272e",
        fontFamily:"RobotoSlab",
        fontWeight:700
    },
    contentHeader: {
        display: "flex",
        flexDirection: "row",
    },
    headerTitle: {
        fontSize: 17,
        lineHeight: 25,
        color:"#21272e",
        fontFamily: "RobotoSlab"
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
        padding: 15
    },

}