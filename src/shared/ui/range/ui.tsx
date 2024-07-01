import {Alert, GestureResponderEvent, Image, Text, TouchableWithoutFeedback, View} from "react-native";

type PropsType = {
    onPressIn: (event: GestureResponderEvent) => void
}

//TODO when closing modal with range in it, sliderTrack stand in front of sliderPicker

export function Range({onPressIn}: PropsType) {

    return (
        <TouchableWithoutFeedback onPressIn={onPressIn}>
            <View style={s.slider}>
                <Image style={s.sliderPicker} resizeMode={"contain"}
                       source={require("@/assets/images/gamecreationscreen/picker.png")}/>
                <Image style={s.sliderTrack} resizeMode={"contain"}
                       source={require("@/assets/images/gamecreationscreen/picker_line.png")}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const s: any = {
    slider: {
        position: "relative",
    },
    sliderPicker: {
        position: "absolute",
        zIndex: 2,
        left: -5,
        top: -10,
        width: 36,
        height: 36
    },
    sliderTrack: {
        maxWidth: "100%",
        zIndex: 1,
    },

}