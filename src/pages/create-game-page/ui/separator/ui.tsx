import {Alert, Image, TouchableWithoutFeedback, View} from "react-native";

export function Separator() {
    return (
        <View style={s.separatorWrapper}>
            <Image style={s.separatorDetail} resizeMode={"contain"}
                   source={require("@/assets/images/gamecreationscreen/razdelenije_premium.png")}/>
            <TouchableWithoutFeedback onPress={() => Alert.alert("Я такая толстая!")}>
                <Image borderRadius={20} style={s.separatorImage} resizeMode={"cover"}
                       source={require("@/assets/images/Image1.png")}/>
            </TouchableWithoutFeedback>
        </View>
    )
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
    separatorDetail: {
        maxWidth: "100%",
    },
}