import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface catalogProps {
  id: string;
  title: string;
  desc?: string;
  img?: string;
}

interface initialStateProps {
  catalogs?: catalogProps[];
}

const initialState: initialStateProps = {
  catalogs: [],
};

export const catalogsSlice = createSlice({
  name: 'catalogs',
  initialState,
  reducers: {
    addCatalog: (state, action: PayloadAction<catalogProps>) => {
      state.catalogs?.push(action.payload);
    },
    removeCatalog: (state, action: PayloadAction<string>) => {
      state.catalogs = state.catalogs?.filter((catalog) => {
        return catalog.id !== action.payload;
      });
    },
    editCatalog: (state, action: PayloadAction<catalogProps>) => {
      state.catalogs = state.catalogs?.map((catalog) => {
        return catalog.id === action.payload.id ? action.payload : catalog;
      });
    },
  },
});

export const { addCatalog, removeCatalog, editCatalog } = catalogsSlice.actions;
export default catalogsSlice.reducer;
