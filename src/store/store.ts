import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getDropDownData } from "./../services/Queries/dropDowns";
import { CreateReference } from "../services/Mutations/apis";

export const store = configureStore({
  reducer: {
    [CreateReference.reducerPath]: CreateReference.reducer,
  },
  // middleware: (gdm) => gdm().concat(getDropDownData.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
