import { Mediator } from "./mediator";
import { ColleagueCheckbox } from "./colleague-checkbox";
import { ColleagueTextField } from "./colleague-textfield";
import { ColleagueButton } from "./colleague-button";

export class LoginFrame implements Mediator {
  checkGuest!: ColleagueCheckbox;
  checkLogin!: ColleagueCheckbox;
  textUser!: ColleagueTextField;
  textPass!: ColleagueTextField;
  buttonOk!: ColleagueButton;
  buttonCancel!: ColleagueButton;

  private checkboxGroup: ColleagueCheckbox[] = [];

  constructor(private title: string) {
    this.createColleagues();
    this.colleagueChanged();
  }

  createColleagues(): void {
    // Checkbox
    this.checkGuest = new ColleagueCheckbox("Guest", this.checkboxGroup, true);
    this.checkLogin = new ColleagueCheckbox("Login", this.checkboxGroup, false);

    // TextField
    this.textUser = new ColleagueTextField("", 10);
    this.textPass = new ColleagueTextField("", 10);

    // Button
    this.buttonOk = new ColleagueButton("OK");
    this.buttonCancel = new ColleagueButton("Cancel");

    // Mediatorを設定する
    this.checkGuest.setMediator(this);
    this.checkLogin.setMediator(this);
    this.textUser.setMediator(this);
    this.textPass.setMediator(this);
    this.buttonOk.setMediator(this);
    this.buttonCancel.setMediator(this);
  }

  colleagueChanged(): void {
    if (this.checkGuest.getState()) {
      // ゲストログイン
      this.textUser.setColleagueEnabled(false);
      this.textPass.setColleagueEnabled(false);
      this.buttonOk.setColleagueEnabled(true);
    } else {
      // ユーザログイン
      this.textUser.setColleagueEnabled(true);
      this.userpassChanged();
    }
  }

  private userpassChanged(): void {
    if (this.textUser.getText().length > 0) {
      this.textPass.setColleagueEnabled(true);
      if (this.textPass.getText().length > 0) {
        this.buttonOk.setColleagueEnabled(true);
      } else {
        this.buttonOk.setColleagueEnabled(false);
      }
    } else {
      this.textPass.setColleagueEnabled(false);
      this.buttonOk.setColleagueEnabled(false);
    }
  }
}
