import { renderComponent, expect } from '../test_helper';
import Footer from '../../app/components/Footer';
// import Footer from '../../src/components/app';

// Use 'describe' to group together similar tests
describe('Footer', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Footer);
  });

  it('should exist', () => {
    expect(component.to.exist);
  });

  it('shows a comment list', () => {
    // expect(component.find('.comment-list')).to.exist;
  });
});
