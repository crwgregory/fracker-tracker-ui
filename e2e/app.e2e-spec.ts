import { FrackerTrackerUiPage } from './app.po';

describe('fracker-tracker-ui App', () => {
  let page: FrackerTrackerUiPage;

  beforeEach(() => {
    page = new FrackerTrackerUiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
