const handleSubmit = (cb, value) => (e) => {
  e.preventDefault();
  return cb(value);
};

export default handleSubmit;
