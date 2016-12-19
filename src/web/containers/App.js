import React from 'react';
import { connect } from 'react-redux';
import { shortenURL } from '../../core/actions';

let longURL = '';

export const App = ({ onSubmit, urls }) => (
  <div>
    <form onSubmit={onSubmit}>
      <input
        type="url"
        onChange={(event) => { longURL = event.target.value; }}
        placeholder="Please enter a URL to shorten"
      />
      <button type="submit">Shorten URL</button>
    </form>
    <ul>
      {urls.map((url, key) =>
        <li {...{ key }}>
          <a href={url} target="_blank">
            {url}
          </a>
        </li>
      )}
    </ul>
  </div>
);

const mapStateToProps = (state) => {
  const urls = state.global.urls;
  return {
    urls
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(shortenURL(longURL));
  }
});

App.propTypes = {
  onSubmit: React.PropTypes.func,
  urls: React.PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
