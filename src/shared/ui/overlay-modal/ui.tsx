import { TouchableWithoutFeedback, View, Modal, ViewStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';

type PropsType = {
  isModalOpened: boolean;
  setIsModalOpened: (value: boolean) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
};
//TODO use `react-native-modal-animated`
//TODO change animation speed with react-native-modal
//TODO Add blur to overlay
export function OverlayModal({ isModalOpened, setIsModalOpened, children, style:modalStyle, overlayStyle }: PropsType) {
  return (
    <Modal
      visible={isModalOpened}
      onRequestClose={() => setIsModalOpened(false)}
      transparent={true}
      animationType={'fade'}
      style={[s.modal, modalStyle]}>
      <TouchableWithoutFeedback onPress={() => setIsModalOpened(false)}>
        <View style={[s.modalOverlay, overlayStyle]}>
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
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
