import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { hootState } from './store';

export const appUseSelector: TypedUseSelectorHook<hootState> = useSelector;
