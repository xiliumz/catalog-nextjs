import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface catalogProps {
  id: string;
  title: string;
  desc?: string;
  img?: string;
}

export interface catalogContainerProps {
  id: string;
  title: string;
  desc?: string;
  catalogs: catalogProps[];
}

interface initialStateProps {
  catalogs?: catalogContainerProps[];
}

const initialState: initialStateProps = {
  catalogs: [],
};

export const catalogsSlice = createSlice({
  name: 'catalogs',
  initialState,
  reducers: {
    addCatalog: (state, action: PayloadAction<catalogContainerProps>) => {
      state.catalogs?.push(action.payload);
    },
    removeCatalog: (state, action: PayloadAction<string>) => {
      state.catalogs = state.catalogs?.filter((catalogContainer) => {
        return catalogContainer.id !== action.payload;
      });
    },
    editCatalog: (state, action: PayloadAction<Omit<catalogContainerProps, 'catalogs'>>) => {
      const id = action.payload.id;
    },
  },
});

export const { addCatalog, removeCatalog, editCatalog } = catalogsSlice.actions;
export default catalogsSlice.reducer;
