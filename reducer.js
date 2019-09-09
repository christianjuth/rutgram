import { dispatch } from 'redux';

import {
  RESET,
  SET_PROFILE_ID,
  FEED_REFRESH,
  FEED_LOADED,
  FEED_UPDATE,
  LIKES_LOADING,
  LIKES_LOADED,
  PROFILE_LOADING,
  PROFILE_LOADED
} from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_PROFILE_ID:
      return {
        ...state,
        profileId: action.payload
      };
    case PROFILE_LOADED:
      return {
        ...state,
        profileLoading: false,
        profile: action.payload
      };
    case FEED_REFRESH:
      return {
        ...state,
        feedRefreshing: true
      };
    case FEED_LOADED:
      return {
        ...state,
        feedLoaded: false,
        feedRefreshing: false,
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
    case PROFILE_LOADING:
      return {
        ...state,
        profileRefreshing: true
      };
    case PROFILE_LOADED:
      return {
        ...state,
        profileLoading: false,
        profileRefreshing: false,
        profile: action.payload
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export const initialState = {
  profileId: '',
  username: '',
  feed: [],
  feedLoaded: true,
  feedRefreshing: false,
  likes: null,
  likesLoading: false,
  profile: {},
  profileLoading: true,
  profileRefreshing: false
};
