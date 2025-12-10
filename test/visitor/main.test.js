import { describe, it, expect, vi } from 'vitest';
import { Directory } from '../src/Directory';
import { File } from '../src/File';
import { ListVisitor } from '../src/ListVisitor';

describe('Visitor Pattern: ListVisitor', () => {
  it('prints correct structure for root entries', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const rootdir = new Directory('root');
    const bindir = new Directory('bin');
    const tmpdir = new Directory('tmp');
    const usrdir = new Directory('usr');

    rootdir.add(bindir);
    rootdir.add(tmpdir);
    rootdir.add(usrdir);

    bindir.add(new File('vi', 10000));
    bindir.add(new File('latex', 20000));

    rootdir.accept(new ListVisitor());

    expect(logSpy.mock.calls.map(call => call[0]).join('\n')).toBe(
      [
        '/root (30000)',
        '/root/bin (30000)',
        '/root/bin/vi (10000)',
        '/root/bin/latex (20000)',
        '/root/tmp (0)',
        '/root/usr (0)'
      ].join('\n')
    );

    logSpy.mockRestore();
  });

  it('prints correct structure after adding user entries', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // --- Making user entries ---
    const rootdir = new Directory('root');

    const bindir = new Directory('bin');
    bindir.add(new File('vi', 10000));
    bindir.add(new File('latex', 20000));

    const tmpdir = new Directory('tmp');
    const usrdir = new Directory('usr');

    rootdir.add(bindir);
    rootdir.add(tmpdir);
    rootdir.add(usrdir);

    // user subdirectories
    const yuki = new Directory('yuki');
    const hanako = new Directory('hanako');
    const tomura = new Directory('tomura');

    usrdir.add(yuki);
    usrdir.add(hanako);
    usrdir.add(tomura);

    yuki.add(new File('diary.html', 100));
    yuki.add(new File('Composite.java', 200));

    hanako.add(new File('memo.tex', 300));

    tomura.add(new File('game.doc', 400));
    tomura.add(new File('junk.mail', 500));

    rootdir.accept(new ListVisitor());

    expect(logSpy.mock.calls.map(call => call[0]).join('\n')).toBe(
      [
        '/root (31500)',
        '/root/bin (30000)',
        '/root/bin/vi (10000)',
        '/root/bin/latex (20000)',
        '/root/tmp (0)',
        '/root/usr (1500)',
        '/root/usr/yuki (300)',
        '/root/usr/yuki/diary.html (100)',
        '/root/usr/yuki/Composite.java (200)',
        '/root/usr/hanako (300)',
        '/root/usr/hanako/memo.tex (300)',
        '/root/usr/tomura (900)',
        '/root/usr/tomura/game.doc (400)',
        '/root/usr/tomura/junk.mail (500)'
      ].join('\n')
    );

    logSpy.mockRestore();
  });
});
