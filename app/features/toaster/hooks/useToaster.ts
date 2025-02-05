import { useContext } from 'react'
import { ToasterPushContext } from '~/features/toaster/provider'

export function useToaster() {
    return useContext(ToasterPushContext).addToast
}