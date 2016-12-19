import {
  SHORTEN_URL_SUCCEEDED
} from './constants';

const initialState = {
  urls: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHORTEN_URL_SUCCEEDED:
      return {
        ...state,
        urls: state.urls.concat(action.shortUrl)
      };
    default:
      return state;
  }
}
