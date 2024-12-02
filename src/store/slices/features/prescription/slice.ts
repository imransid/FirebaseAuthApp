import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { PRESCRIPTION } from './constants';
import { type IImageAssets, type IPrescriptionType } from './types';

const prescriptionInitialData: IPrescriptionType = {
  ImageFile: []
};

export const prescriptionSlice = createSlice({
  name: PRESCRIPTION,
  initialState: prescriptionInitialData,
  reducers: {
    setPrescriptionAction: (state, action: PayloadAction<IImageAssets>) => {
      console.log(action.payload, 'Action Payload'); // Debug log
      if (action.payload?.assets) {
        state.ImageFile = [...state.ImageFile, ...action.payload.assets];
      }
    }
  }
});

export const { setPrescriptionAction } = prescriptionSlice.actions;

export const prescriptionReducer = prescriptionSlice.reducer;
