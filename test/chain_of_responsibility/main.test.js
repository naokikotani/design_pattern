import { describe, it, expect, vi } from 'vitest';

import { NoSupport } from '../../lib/chain_of_responsibility/no-support';
import { LimitSupport } from '../../lib/chain_of_responsibility/limit-support';
import { SpecialSupport } from '../../lib/chain_of_responsibility/special-support';
import { OddSupport } from '../../lib/chain_of_responsibility/odd-support';
import { Trouble } from '../../lib/chain_of_responsibility/trouble';

describe('Chain of Responsibility', () => {
  it('resolves troubles in correct order', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const alice = new NoSupport('Alice');
    const bob = new LimitSupport('Bob', 100);
    const charlie = new SpecialSupport('Charlie', 429);
    const diana = new LimitSupport('Diana', 200);
    const elmo = new OddSupport('Elmo');
    const fred = new LimitSupport('Fred', 300);

    // 連鎖の形成
    alice
      .setNext(bob)
      .setNext(charlie)
      .setNext(diana)
      .setNext(elmo)
      .setNext(fred);

    // トラブル発生
    for (let i = 0; i < 500; i += 33) {
      alice.support(new Trouble(i));
    }

    expect(logSpy.mock.calls.map(call => call[0])).toEqual([
      '[Trouble 0] is resolved by [Bob].',
      '[Trouble 33] is resolved by [Bob].',
      '[Trouble 66] is resolved by [Bob].',
      '[Trouble 99] is resolved by [Bob].',
      '[Trouble 132] is resolved by [Diana].',
      '[Trouble 165] is resolved by [Diana].',
      '[Trouble 198] is resolved by [Diana].',
      '[Trouble 231] is resolved by [Elmo].',
      '[Trouble 264] is resolved by [Fred].',
      '[Trouble 297] is resolved by [Elmo].',
      '[Trouble 330] cannot be resolved.',
      '[Trouble 363] is resolved by [Elmo].',
      '[Trouble 396] cannot be resolved.',
      '[Trouble 429] is resolved by [Charlie].',
      '[Trouble 462] cannot be resolved.',
      '[Trouble 495] is resolved by [Elmo].'
    ]);

    logSpy.mockRestore();
  });
});
