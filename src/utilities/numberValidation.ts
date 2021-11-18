const numberValidation = (value:string):boolean => {
  const validInp = /^[0-9]+$/;
  return value !== '' && !validInp.test(value);
};

export default numberValidation;
