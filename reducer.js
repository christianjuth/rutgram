import { dispatch } from 'redux';

import {
  FEED_LOADING,
  FEED_LOADED,
  FEED_UPDATE,
  LIKES_LOADING,
  LIKES_LOADED
} from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case FEED_LOADING:
      return {
        ...state,
        feedLoading: true
      };
    case FEED_LOADED:
      return {
        ...state,
        feedLoading: false,
        feed: action.payload
      };
    case FEED_UPDATE:
      return {
        ...state,
        feed: action.payload
      };
    case LIKES_LOADING:
      return {
        ...state,
        likesLoading: true
      };
    case LIKES_LOADED:
      return {
        ...state,
        likesLoading: false,
        likes: action.payload
      };
    default:
      return state;
  }
}

export const initialState = {
  username: 'christianjuth',
  feed: [],
  feedLoading: false,
  likes: [],
  likesLoading: false
};
