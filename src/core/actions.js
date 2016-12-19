import {
  SHORTEN_URL_SUCCEEDED
} from './constants';

export function shortenURLSuccessful(longURL, shortUrl) {
  return { type: SHORTEN_URL_SUCCEEDED, longURL, shortUrl };
}

export function shortenURL(longURL) {
  return (dispatch) => {
    fetch('/api/shorten_url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: longURL
      })
    })
    .then((response) => response.json())
    .then(({ shortUrl }) => {
      dispatch(shortenURLSuccessful(longURL, shortUrl));
    });
  };
}
