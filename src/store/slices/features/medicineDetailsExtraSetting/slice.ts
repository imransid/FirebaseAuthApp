import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { MEDICINE_DETAILS_EXTRA_SETTING } from './constants';
import {
  type IMedicineDetailsExtraSettingType,
  type IMedicineReminder,
  type InstrucTion,
  type ITreatmentDuration
} from './types';

const medicineDetailsExtraSettingData: IMedicineDetailsExtraSettingType = {
  storeInstrucTionList: [],
  storeTreatmentDuration: [],
  storeMedicineReminder: []
};

export const medicineDetailsExtraSettingSlice = createSlice({
  name: MEDICINE_DETAILS_EXTRA_SETTING,
  initialState: medicineDetailsExtraSettingData,
  reducers: {
    // setExtraInstrucTion: (
    //   state: IMedicineDetailsExtraSettingType,
    //   payload: PayloadAction<InstrucTion[]>
    // ) => {
    //   state.storeInstrucTionList = [...state.storeInstrucTionList, ...payload.payload];
    // },
    setExtraInstrucTion: (
  state: IMedicineDetailsExtraSettingType,
  payload: PayloadAction<InstrucTion[]>
) => {
  // Create a map to ensure unique instructions by `medicineLocalId`
  const updatedMap = new Map(
    state.storeInstrucTionList.map(item => [item.medicineLocalId, item])
  );

  // Update the map with new instructions, replacing duplicates
  payload.payload.forEach(newItem => {
    updatedMap.set(newItem.medicineLocalId, newItem);
  });

  // Convert the map back to an array and update the state
  state.storeInstrucTionList = Array.from(updatedMap.values());
},

    setExtraTreatmentDuration: (
      state: IMedicineDetailsExtraSettingType,
      payload: PayloadAction<ITreatmentDuration[]>
    ) => {
      state.storeTreatmentDuration = [...state.storeTreatmentDuration, ...payload.payload];
    },


    // setExtraTreatmentDuration: (
    //   state: IMedicineDetailsExtraSettingType,
    //   payload: PayloadAction<ITreatmentDuration[]>
    // ) => {
    //   const updatedMap = new Map(
    //     state.storeTreatmentDuration.map(item => [item.medicineLocalId, item])
    //   );
    //   payload.payload.forEach(newItem => {
    //     updatedMap.set(newItem.medicineLocalId, newItem);
    //   });
    //   state.storeTreatmentDuration = Array.from(updatedMap.values());
    // },

    


    setExtraMedicineReminder: (
      state: IMedicineDetailsExtraSettingType,
      payload: PayloadAction<IMedicineReminder[]>
    ) => {
      state.storeMedicineReminder = [...state.storeMedicineReminder, ...payload.payload];
    },
    clearExtraMedicineDetails: (state: IMedicineDetailsExtraSettingType) => {
      state.storeInstrucTionList = [];
      state.storeMedicineReminder = [];

      
      state.storeTreatmentDuration = [];
    }
  }
});

export const {
  setExtraInstrucTion,
  setExtraTreatmentDuration,
  setExtraMedicineReminder,
  clearExtraMedicineDetails
} = medicineDetailsExtraSettingSlice.actions;

export const medicineDetailsExtraSettingReducer = medicineDetailsExtraSettingSlice.reducer;



