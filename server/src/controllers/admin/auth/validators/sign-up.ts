const signUpRules = {
    email: "required|email",
    password: "required|string|min:8|confirmed",
  };
  
  export default signUpRules;
  