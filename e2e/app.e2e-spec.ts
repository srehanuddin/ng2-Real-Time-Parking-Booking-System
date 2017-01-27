import { ClassifiedPage } from './app.po';

describe('classified App', function() {
  let page: ClassifiedPage;

  beforeEach(() => {
    page = new ClassifiedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
