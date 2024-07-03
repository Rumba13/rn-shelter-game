import {View, Text, Image} from "react-native";
import {useEffect, useState} from "react";
import {CheckBox} from "@/src/shared/ui/check-box/ui";
import {ImageButton} from "@/src/shared/ui/image-button/ui";
import {useFonts} from "expo-font";

type PropsType = {
    title: string,
}

export function GameOptionCheckbox({title}: PropsType) {
    const [isOptionEnabled, setIsOptionEnabled] = useState<boolean>(false);
    const [fontsLoaded, fontsError] = useFonts({
        "RobotoSlabSemiBold": require("@/assets/fonts/RobotoSlab-SemiBold.ttf")
    })

    useEffect(() => {

    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }
    return (
        <View style={s.gameOption}>
            <View style={{margin: 10}}>
            <Text style={s.gameOptionTitle}>{title}</Text>
            <ImageButton style={s.optionHelpButton}
                         options={{xOffset: 2, yOffset: 2, xOffsetOnPress: 1, yOffsetOnPress: 1}}
                         buttonImage={require("@/assets/images/core/vopros_icon.png")}
                         shadowImage={require("@/assets/images/gameconnectionscreen/info_icon_shadow.png")}/>
            <CheckBox style={s.gameOptionCheckBox} isToggled={isOptionEnabled} setIsToggled={setIsOptionEnabled}/>

            </View>
            <Image style={s.separator} source={require("@/assets/images/gamecreationscreen/razdelenije.png")}/>
        </View>
    );
}

const helpButtonSize = 35;

const s: any = {
    gameOption: {
        position: "relative",
    },
    optionHelpButton: {
        position: "absolute",
        maxWidth: helpButtonSize,
        height: helpButtonSize,
        right: 0,
        top: 0,
    },
    gameOptionTitle: {
        fontSize: 18,
        color: "#232322",
        fontWeight: 600,
        fontFamily: "RobotoSlabSemiBold",
        letterSpacing: 1,
        marginRight: helpButtonSize + 5
    },
    gameOptionCheckBox: {
        marginTop: 20,
        marginLeft: "auto",
    },
    separator: {
        maxWidth: "100%",
        height: 6
    }
}