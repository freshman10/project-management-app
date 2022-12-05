import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../App/state/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
