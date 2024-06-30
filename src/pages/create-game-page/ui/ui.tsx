import {Dimensions, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {ImageButton} from "@/src/shared/ui/image-button/ui";

export function CreateGamePage() {
    return <View style={s.createGamePageWrapper}>
        <Image style={s.pageTitle} resizeMode={"contain"}
               source={require("../../../../assets/images/gamecreationscreen/create.png")}/>
        <ImageBackground source={require("../../../../assets/images/gamecreationscreen/frame_back.png")}
                         resizeMode={"center"} style={s.mainContentBackground}>
            <View style={s.mainContent}>
                <View style={s.mainContentHeader}>

                </View>
            </View>
        </ImageBackground>
        <View style={s.footer}>
            <View style={s.createGameButtonWrapper}>
                <Image style={s.createGameButtonDetail} resizeMode={"contain"}
                       source={require("@/assets/images/gamecreationscreen/next_dec.png")}/>
                <ImageButton buttonImage={require("@/assets/images/gamecreationscreen/next_button.png")}
                             shadowImage={require("@/assets/images/gamecreationscreen/next_button_shadow.png")}
                             style={s.createGameButton} height={80}/>
            </View>
            <Image style={s.footerDetail} resizeMode={"contain"}
                   source={require("@/assets/images/gamecreationscreen/cloud.png")}/>
        </View>
    </View>
}

const s: any = {
    createGameButtonDetail: {
        position: "absolute",
        width: 65,
        height: "100%",
        left: 0,
        top: 18,
    },
    footerDetail: {
        width: "100%",
        flexBasis: 85,
    },
    createGameButtonWrapper: {
        position: "relative",
    },
    createGamePageWrapper: {
        position: "relative",
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
    pageTitle: {
        maxWidth: "90%",
        marginTop: 20,
        flexBasis: "auto"
    },
    mainContent: {
        // minHeight: "100%",
        // width: "100%",
        // marginHorizontal: 100,
        // backgroundColor: 'blue',
        flexBasis: "auto",
        backgroundColor: "red"
    },
    mainContentBackground: {},
    mainContentHeader: {},
    createGameButton: {
        alignSelf: "center"
    },
    footer: {
        display: "flex",
        flexBasis: "auto",
        marginHorizontal: 20,
        position: "relative",
        height: "auto"
    },
}