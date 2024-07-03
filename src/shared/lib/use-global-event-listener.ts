type ListenerEventsType = 'PointerUp'

export function useGlobalEventListener(event: ListenerEventsType) {
  const globalListener = () => {}

  return { globalListener }
}
