import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ProductsActionsTypes} from './types/products.types';
import ProductsReducer from './reducers/products.reducer';

const rootReducer = combineReducers({
  products: ProductsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

type AppActions = ProductsActionsTypes;

export type AppThunk = ThunkAction<
  void,
  RootState,
  undefined,
  Action<AppActions>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
