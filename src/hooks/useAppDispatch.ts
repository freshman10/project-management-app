import { useDispatch } from 'react-redux';
import { AppDispatch } from '../App/state/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
