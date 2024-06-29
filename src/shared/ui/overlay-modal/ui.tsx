import {Text, TouchableWithoutFeedback, View, Modal} from "react-native";

type PropsType = {
    isModalOpened: boolean,
    setIsModalOpened: (bool: boolean) => void,
    children: React.ReactNode,
}

export function OverlayModal({isModalOpened, setIsModalOpened, children}: PropsType) {
    return (
        <Modal visible={isModalOpened} onRequestClose={() => setIsModalOpened(false)}
               transparent={true} animationType={"slide"} style={s.modal}>
            <TouchableWithoutFeedback onPress={() => setIsModalOpened(false)}>
                <View style={s.modalOverlay}>
                    <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                        {children}
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const s: any = {
    modal: {
        maxWidth: 100,
        maxHeight: 100,
    },

    modalOverlay: {
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: -1
    },
}