import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { App } from '../web/containers/App';

describe('<App />', () => {
  let app;
  beforeEach(() => {
    const urls = [
      'http://localhost:3000/123456',
      'http://localhost:3000/678910'
    ];
    app = shallow(<App {...{ urls, onSubmit: expect.createSpy() }} />);
  });

  it('should show a list of urls', () => {
    expect(app.find('ul').children().length).toEqual(2);
  });

  it('list item link href should display the correct url', () => {
    expect(app.find('ul').childAt(0).find('a').prop('href')).toEqual('http://localhost:3000/123456');
  });

  it('list item link should open in a new window', () => {
    expect(app.find('ul').childAt(0).find('a').prop('target')).toEqual('_blank');
  });
});
