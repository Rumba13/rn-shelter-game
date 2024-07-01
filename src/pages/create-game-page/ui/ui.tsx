import {Alert, Image, ImageBackground, Text, TouchableWithoutFeedback, View} from "react-native";
import {Footer} from "@/src/pages/create-game-page/ui/footer/ui";
import {useFonts} from "expo-font";
import {Range} from "@/src/shared/ui/range/ui";
import {ImageButton} from "@/src/shared/ui/image-button/ui";
import {OverlayModal} from "@/src/shared/ui/overlay-modal/ui";
import {useEffect, useState} from "react";
import {CheckBox} from "@/src/shared/ui/check-box/ui";
import {Header} from "./header/ui"
// @ts-ignore
//TODO refactoring
//TODO fix font issues
export function CreateGamePage() {

    const [fontsLoaded,fontsError] = useFonts({
        "RobotoSlab": require("@/assets/fonts/RobotoSlab-Bold.ttf")
    })

    useEffect(() =>{

    }, [fontsLoaded])

    if(fontsError){
        Alert.alert("No fonts!");
    }

    if(!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return <View style={s.createGamePageWrapper}>
        <Image style={s.pageTitle} resizeMode={"contain"}
               source={require("../../../../assets/images/gamecreationscreen/create.png")}/>
        <ImageBackground source={require("../../../../assets/images/gamecreationscreen/frame_back.png")}
                         resizeMode={"contain"} style={s.mainContentBackground}>
            <View style={s.mainContentWrapper}>
                <View style={s.mainContent}>
                    <ImageBackground resizeMode={"cover"}
                                     source={require("@/assets/images/gamecreationscreen/create_back.png")}>
                        <View style={{padding: 10}}>

                            <Header/>
                            <View style={s.separatorWrapper}>

                                <Image style={s.headerSeparator} resizeMode={"contain"}
                                       source={require("@/assets/images/gamecreationscreen/razdelenije_premium.png")}/>
                                <TouchableWithoutFeedback onPress={() => Alert.alert("Я такая толстая!")}>
                                    <Image borderRadius={20} style={s.separatorImage} resizeMode={"cover"}
                                           source={require("@/assets/images/Image1.png")}/>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </ImageBackground>
        <Footer/>
    </View>
}

const s: any = {
    separatorWrapper: {
        position: "relative",
    },
    separatorImage: {
        maxWidth: "100%",
        position: "absolute",
        top: -5,
        height: 70,
        left: "34.5%",
        width: 70,
        borderRadius: 20
    },
    headerSeparator: {
        maxWidth: "100%",
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
        flexDirection: "column",

    },

}