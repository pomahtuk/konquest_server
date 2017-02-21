const generatePrivateKey = (length = 10) =>
  String.fromCodePoint(...Array.from({ length }, () => Math.floor(Math.random() * 57) + 65));

export default generatePrivateKey;
