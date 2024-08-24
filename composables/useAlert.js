import { useEventBus } from '@vueuse/core'

const alertBus = useEventBus()

export function useAlert() {
  function showAlert(message, type = 'info') {
    alertBus.emit({ message, type })
  }

  return {
    showAlert,
    onAlert: alertBus.on,
  }
}