import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [{ id: 1, text: 'Test text' }],
  show: false,
  showTitle: true,
  step: 1,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    putTodo: (state, action) => {
      return {
        ...state,
        todo: action.payload.text
          ? [...state.todo, { id: new Date().toString(), ...action.payload }]
          : [...state.todo],
      };
    },
    deleteTodo: (state, action) => {
      return {
        ...state,
        todo: state.todo.filter((elem) => elem.id !== action.payload),
      };
    },
    showTutorial: (state, action) => {
      return {
        ...state,
        show: action.payload,
      };
    },
    changeShowTitle: (state, action) => {
      return {
        ...state,
        showTitle: action.payload,
      };
    },
    changeStep: (state, action) => {
      return {
        ...state,
        step: action.payload,
      };
    },
  },
});

export const {
  putTodo,
  deleteTodo,
  showTutorial,
  changeShowTitle,
  changeStep,
} = todoSlice.actions;

export default todoSlice.reducer;
