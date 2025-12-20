import { describe, it, expect } from 'vitest';
import { LoginFrame } from '../../lib/mediator/login-frame';

describe('Mediator: LoginFrame', () => {
  describe('初期状態（Guest選択時）', () => {
    it('Guestがチェックされている', () => {
      const frame = new LoginFrame('Test');
      expect(frame.checkGuest.getState()).toBe(true);
      expect(frame.checkLogin.getState()).toBe(false);
    });

    it('Username/Passwordは無効', () => {
      const frame = new LoginFrame('Test');
      expect(frame.textUser.isEnabled()).toBe(false);
      expect(frame.textPass.isEnabled()).toBe(false);
    });

    it('OKボタンは有効、Cancelボタンも有効', () => {
      const frame = new LoginFrame('Test');
      expect(frame.buttonOk.isEnabled()).toBe(true);
      expect(frame.buttonCancel.isEnabled()).toBe(true);
    });
  });

  describe('Login選択時', () => {
    it('Usernameが有効になる', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.colleagueChanged();

      expect(frame.textUser.isEnabled()).toBe(true);
    });

    it('Username未入力ではPasswordは無効', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.colleagueChanged();

      expect(frame.textPass.isEnabled()).toBe(false);
    });

    it('Username未入力ではOKボタンは無効', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.colleagueChanged();

      expect(frame.buttonOk.isEnabled()).toBe(false);
    });
  });

  describe('Login選択時 - Username入力後', () => {
    it('Passwordが有効になる', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.textUser.setText('user');
      frame.colleagueChanged();

      expect(frame.textPass.isEnabled()).toBe(true);
    });

    it('Password未入力ではOKボタンは無効', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.textUser.setText('user');
      frame.colleagueChanged();

      expect(frame.buttonOk.isEnabled()).toBe(false);
    });
  });

  describe('Login選択時 - Username/Password両方入力後', () => {
    it('両方4文字以上でOKボタンが有効になる', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.textUser.setText('user');
      frame.textPass.setText('pass');
      frame.colleagueChanged();

      expect(frame.buttonOk.isEnabled()).toBe(true);
    });

    it('Usernameが3文字以下ではOKボタンは無効', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.textUser.setText('usr');
      frame.textPass.setText('pass');
      frame.colleagueChanged();

      expect(frame.buttonOk.isEnabled()).toBe(false);
    });

    it('Passwordが3文字以下ではOKボタンは無効', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.textUser.setText('user');
      frame.textPass.setText('pas');
      frame.colleagueChanged();

      expect(frame.buttonOk.isEnabled()).toBe(false);
    });

    it('両方3文字以下ではOKボタンは無効', () => {
      const frame = new LoginFrame('Test');
      frame.checkLogin.setState(true);
      frame.textUser.setText('usr');
      frame.textPass.setText('pas');
      frame.colleagueChanged();

      expect(frame.buttonOk.isEnabled()).toBe(false);
    });
  });

  describe('GuestからLoginに切り替え、再度Guestに戻す', () => {
    it('Username/Passwordが再び無効になり、OKが有効になる', () => {
      const frame = new LoginFrame('Test');
      
      // Login選択
      frame.checkLogin.setState(true);
      frame.colleagueChanged();
      expect(frame.textUser.isEnabled()).toBe(true);
      
      // Guest選択に戻す
      frame.checkGuest.setState(true);
      frame.checkLogin.setState(false);
      frame.colleagueChanged();
      
      expect(frame.textUser.isEnabled()).toBe(false);
      expect(frame.textPass.isEnabled()).toBe(false);
      expect(frame.buttonOk.isEnabled()).toBe(true);
    });
  });
});
