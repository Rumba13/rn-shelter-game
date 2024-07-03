import {
    Button, GestureResponderEvent,
    Image,
    ImageBackground,
    LayoutAnimation,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useEffect, useState} from "react";


type PropsType = {
    buttonImage: any,
    shadowImage: any,
    height?: number | string,
    width?: number | string,
    style?: any,
    onPress?: (event: GestureResponderEvent) => void,
    options?: {
        xOffsetOnPress?: number,
        yOffsetOnPress?: number,
        xOffset?: number,
        yOffset?: number,
    }
}

export function ImageButton({buttonImage, shadowImage, height, width, style, onPress, options}: PropsType) {
    const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false)


    const buttonOnPressIn = () => {
        LayoutAnimation.configureNext({
            create: {type: "linear", property: "opacity"},
            update: {type: "linear"},
            delete: {type: "linear", property: "opacity"},

            duration: 55
        })
        setIsButtonPressed(true);
    }
    const buttonOnPressOut = () => {
        LayoutAnimation.configureNext({
            create: {type: "linear", property: "opacity"},
            update: {type: "linear"},
            delete: {type: "linear", property: "opacity"},

            duration: 55
        })

        setIsButtonPressed(false);
    }

    return (
        <View style={{...s.buttonContainer, ...style, maxHeight: height, width}}>
            < ImageBackground source={shadowImage} style={s.buttonShadow} resizeMode={"contain"}>
                <Image source={buttonImage}
                       style={{
                           ...s.buttonImage,
                           ...{
                               bottom: options?.yOffset ?? 3,
                               right: options?.xOffset ?? 3
                           },
                           ...isButtonPressed ? {
                               bottom: options?.yOffsetOnPress ?? 3,
                               right: options?.xOffsetOnPress ?? 3
                           } : {}
                       }}
                       resizeMode={"contain"}/>
            </ImageBackground>

            <TouchableWithoutFeedback style={s.buttonWrapper} onPress={onPress} onPressIn={buttonOnPressIn}
                                      onPressOut={buttonOnPressOut}>
                <View style={s.button}></View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const s: any = {
    buttonContainer: {},
    buttonShadow: {
        maxWidth: "100%",
        maxHeight: "100%",
    },
    buttonImage: {
        maxWidth: "100%",
        bottom: 5,
        right: 3,
        position: "relative",
        maxHeight: "100%",
    },
    buttonImage__pressed: {
    },
    button: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 12,
        maxHeight: "100%",
        minHeight: "100%",
    },
    buttonWrapper: {}
}