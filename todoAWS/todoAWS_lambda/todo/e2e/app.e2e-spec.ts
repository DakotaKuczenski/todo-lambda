import { AppPage } from './app.po';

describe('todo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome!');
  });
});
