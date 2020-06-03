const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/
);
function checkPassword(Password) {
  let [isUppercase, isLowercase, isSpecialChar, isNumber] = [
    false,
    false,
    false,
    false,
  ];
  let str = Password + '0';
  let patt1 = /[0-9]/g;
  isNumber = str.match(patt1).length > 1;

  patt1 = /[!@#$%^&*(),.?":{}_|<>]/g;
  str = Password + '@';
  isSpecialChar = str.match(patt1).length > 1;

  for (let i = 0; i < Password.length; i++) {
    if (Password[i] === Password[i].toUpperCase()) {
      isUppercase = true;
    } else if (Password[i] === Password[i].toLowerCase()) {
      isLowercase = true;
    }
  }
  return isNumber || isUppercase || isLowercase;
}

export default class Validator {
  static validateUserName(value, context) {
    let valid = true;
    let errorMassage = '';
    if (!value) {
      errorMassage = 'Please enter a username';
      valid = false;
    }
    context.setState((prevState) => {
      prevState.formErrors.userNameError = errorMassage;
      return prevState;
    });
    return valid;
  }
  static validateDisplayName(value, context) {
    let valid = true;
    let errorMassage = '';
    if (!value) {
      errorMassage = 'Please enter a Display Name';
      valid = false;
    }
    context.setState((prevState) => {
      prevState.formErrors.displayNameError = errorMassage;
      return prevState;
    });
    return valid;
  }
  static validateCountry(value, context) {
    let valid = true;
    let errorMassage = '';
    if (!value) {
      errorMassage = 'Please select a Country';
      valid = false;
    }
    context.setState((prevState) => {
      prevState.formErrors.countryError = errorMassage;
      return prevState;
    });
    return valid;
  }

  static validateEmail(value, context) {
    let errorMassage = '';
    let valid = true;

    if (!value) {
      errorMassage = 'Please enter your email';
      valid = false;
    }
    if (!emailRegex.test(value)) {
      errorMassage = 'Invalid email address';
      valid = false;
    }
    context.setState((prevState) => {
      prevState.formErrors.EmailError = errorMassage;
      return prevState;
    });
    return valid;
  }

  static validatePassword(value, context) {
    let errorMassage = '';
    let valid = true;

    if (!value) {
      errorMassage = 'Please enter password';
      valid = false;
    } else if (value.length < 8) {
      errorMassage = 'Minimum 8 characters required';
      valid = false;
    } else if (value.length > 30) {
      errorMassage = 'Maximum 30 characters';
      valid = false;
    } else if (!checkPassword(value)) {
      errorMassage =
        'Password should contain uppercase , lowercase and a number ';
      valid = false;
    }
    context.setState((pervState) => {
      pervState.formErrors.PasswordError = errorMassage;
      return pervState;
    });
    return valid;
  }

  static validateConfirmPassword(value, context) {
    let errorMassage = '';
    let valid = true;
    if (value !== context.state.Password) {
      errorMassage = 'Invalid, Passwords do not match';
      valid = false;
    }
    context.setState((prevState) => {
      prevState.formErrors.ConfirmPasswordError = errorMassage;
      return prevState;
    });
    return valid;
  }
  static validateGender(selected, context) {
    let errorMassage = '';
    let valid = true;
    if (!selected) {
      errorMassage = 'Please select your gender';
      valid = false;
    }
    context.setState((prevState) => {
      prevState.formErrors.GenderError = errorMassage;
      return prevState;
    });
    return valid;
  }
  static validateBirthdata(year, month, day, context) {
    let errorMassage = '';
    let valid = true;
    if (!(year && month && day)) {
      errorMassage = 'Please select your birth date';
      valid = false;
    }
    context.setState((prevState) => {
      prevState.formErrors.BirthdataError = errorMassage;
      return prevState;
    });
    return valid;
  }

  static validateTerms(selected, context) {
    let errorMassage = '';
    if (!selected) {
      errorMassage = 'Please agree to the terms';
    }
    context.setState((prevState) => {
      prevState.formErrors.TermsError = errorMassage;
      return prevState;
    });
  }
}
