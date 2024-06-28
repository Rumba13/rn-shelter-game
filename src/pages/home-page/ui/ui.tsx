import {Button, Image, ImageBackground, StatusBar, Text, View} from "react-native";
import {ImageButton} from "@/src/shared/ui/image-button/ui";
import {contain} from "@hapi/hoek";

export function HomePage() {
    return (
        <View style={s.homePage}>
            <View style={s.mainContent}>
                <Image style={s.logo} source={require("../../../../assets/images/mainscreen/logo.png")}/>
                <ImageBackground style={s.buttons} resizeMode="contain"
                                 source={require("../../../../assets/images/mainscreen/black_box_main_menu.png")}>

                    <ImageButton buttonImage={require("../../../../assets/images/mainscreen/connect_button.png")}
                                 shadowImage={require("../../../../assets/images/mainscreen/button_shadow_2.png")}
                                 height={130} width={"100%"} style={{marginBottom: 10}}/>

                    <ImageButton buttonImage={require("../../../../assets/images/mainscreen/howtoplay_button.png")}
                                 shadowImage={require("../../../../assets/images/mainscreen/button_shadow_1.png")}
                                 height={130} width={130}/>

                    <ImageButton buttonImage={require("../../../../assets/images/mainscreen/create_button.png")}
                                 shadowImage={require("../../../../assets/images/mainscreen/button_shadow_1.png")}
                                 height={130} width={130}/>

                    <ImageButton buttonImage={require("../../../../assets/images/mainscreen/premium_button3.png")}
                                 shadowImage={require("../../../../assets/images/mainscreen/button_shadow_2.png")}
                                 height={130} width={"100%"} style={{marginTop: 10}}/>
                </ImageBackground>
            </View>
        </View>
    );
}

const s: any = {
    homePage: {
        height: "100%",
        marginLeft: 40,
        marginRight: 40,
    },
    logo: {
        width: 240,
        height: 240,
        objectFit: "contain",
        marginTop: 10,
        marginBottom: 15
    },
    mainContent: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "end",
        paddingTop:15,
        paddingBottom:10,
    }
}