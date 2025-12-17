import { describe, it, expect, vi } from 'vitest';
import { PageMaker } from '../../lib/facade/page-maker';

describe('Facade: PageMaker', () => {
  it('creates welcome page and logs result', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    PageMaker.makeWelcomePage('hyuki@example.com', 'welcome.html');

    expect(logSpy).toHaveBeenCalledWith(
      'welcome.html is created for hyuki@example.com (Hiroshi Yuki)'
    );

    logSpy.mockRestore();
  });
});
