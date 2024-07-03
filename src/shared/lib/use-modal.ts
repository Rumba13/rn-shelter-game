import React from 'react'

export function useModal(isOpenByDefault: boolean = false) {
  const [isOpened, setIsOpened] = React.useState<boolean>(isOpenByDefault)

  const _globalEventListener = () => {
    setIsOpened(false)
  }

  const toggleModal = () => {
    setIsOpened(!isOpened)
  }

  return {
    toggleModal,
    setIsModalOpened: setIsOpened,
    isModalOpened: isOpened,
    _onPointerUpGlobalListener: _globalEventListener,
  }
}
