import { nanoid, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: "",
  userId:"",
  users: [],
  items: []
};

export const lostfoundSlice = createSlice({
  name: "lostfound",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: nanoid(),
        item_name: action.payload[0],
        date: action.payload[1],
        place: action.payload[2],
        foundby: action.payload[3],
        phoneno: action.payload[4]
      };
      state.items.push(newItem);
    },
    addUser: (state, action) => {
      const newUser = {
        id: nanoid(),
        username: action.payload.username,
        password: action.payload.password,
        phoneno: action.payload.phoneno,
      };
      state.users.push(newUser);
    },
    currUser: (state, action) => {
      state.currentUser = action.payload[0];
      state.userId=action.payload[1]
    },
  }
});

export const { addItem, addUser, currUser } = lostfoundSlice.actions;
export default lostfoundSlice.reducer;
