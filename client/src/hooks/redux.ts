import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, ReduxStore } from '@Sofie-Automation/sisyfos-audio-controller-shared-lib'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxStore> = useSelector
