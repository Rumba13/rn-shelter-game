import {Dimensions, Image, StyleSheet, Text, View} from "react-native";

export function CreateGamePage() {
    return <View style={s.createGamePageWrapper}>
        <Image style={s.pageTitle} resizeMode={"contain"}
               source={require("../../../../assets/images/gamecreationscreen/create.png")}/>
    </View>
}

const s: any = {
    createGamePageWrapper: {
        width: "100%",
        height: "100%",
    },
    pageTitle: {
        maxWidth: "90%",
        marginHorizontal:"auto",
        marginTop:20
    }
}