import {
  TOGGLE_ITEM_STATUS,
  REMOVE_ITEM,
  UPDATE_ITEM,
  ADD_ITEM,
} from '../actions/types';
import { Item } from '../../types';
import { ListReducerAction } from '../../types/store';

const initState: Item[] = [];

export default (state = initState, { type, payload }: ListReducerAction) => {
  switch (type) {
    case ADD_ITEM: {
      return {
        ...state,
        payload,
      };
    }

    case UPDATE_ITEM: {
      return state.map((item) => (item.id === payload.id ? payload : item));
    }

    case TOGGLE_ITEM_STATUS: {
      return state.map((item) => {
        return item.id === payload ? { ...item, isPaid: !item.isPaid } : item;
      });
    }

    case REMOVE_ITEM: {
      return state.filter(({ id }) => id !== payload);
    }

    default:
      return state;
  }
};
