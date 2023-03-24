export const initialState = {
  formData: {},
  errors: {},
  authData: {},
  formSubmitted: false,
  cosignerCheckbox: false,
  showToast: false,
  toastMessage: "",
  settingid: "",
  toastType: "",
  offers: [],
  loanId: "",
  globalStep: null,
  currentStep: null,
  signature: null,
  selectLoanPopup: false,
  emailPhonePopup: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "Set_setting_id":
      let data1 = action.payload;
      return {
        ...state,
        settingid: data1,
      };

    
    default:
      return state;
  }
};
