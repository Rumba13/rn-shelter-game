import {Dimensions, ImageBackground, ImageBackgroundProps, SafeAreaView, StatusBar, View} from "react-native";
import {Component} from "react";

type PropsType = {
    children: React.ReactNode
}

export class AppLayout extends Component<PropsType> {

    componentDidMount() {

        setTimeout(() => {
            StatusBar.setTranslucent(true); //TODO find component that overriding the properties
            StatusBar.setBackgroundColor("#c3b5a8")
        }, 100)
    }


    render() {
        let {children} = this.props;

        return (
            <View style={s.root}>
                <ImageBackground source={require('../../../../assets/images/mainscreen/background.png')}
                                 style={s.background}
                                 resizeMode={"cover"}
                >

                    {children}
                </ImageBackground>
            </View>
        )
    }
}

const s = {
    background: {
        height: "100%",
        width: "100%",
    },
    root: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    }
}

//borderWidth:3,
//borderColor: "#000000",