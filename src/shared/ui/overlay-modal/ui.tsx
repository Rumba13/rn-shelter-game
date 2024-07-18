import { TouchableWithoutFeedback, View, Modal, ViewStyle } from 'react-native';

type PropsType = {
  isModalOpened: boolean;
  setIsModalOpened: (bool: boolean) => void;
  children: React.ReactNode;
  styles?: ViewStyle;
  overlayStyle?: ViewStyle;
};
//TODO Add blur to overlay
//TODO change animation speed with react-native-modal
export function OverlayModal({ isModalOpened, setIsModalOpened, children, styles, overlayStyle }: PropsType) {
  return (
    <Modal
      visible={isModalOpened}
      onRequestClose={() => setIsModalOpened(false)}
      transparent={true}
      animationType={'fade'}
      style={{ ...s.modal, ...styles }}>
      <TouchableWithoutFeedback onPress={() => setIsModalOpened(false)}>
        <View style={{ ...s.modalOverlay, ...overlayStyle }}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const s: any = {
  modal: {},
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
