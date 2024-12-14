export const stableContract =
  "xion1chjxngkldm2vez5y7g8xqm8rvmz598jd8awg9t8fwt728nctqpas6ddcua";

export const protocolContract =
  "xion1ux89h8k45cnnra5mczh5wcuzdcx8ql29s3k79dmaddwrxzzwt3nsad0l87";

export const parseMantra = (value) => {
  let number = parseFloat(value);
  let scaledNumber = Math.round(number * 1e6);
  return parseInt(scaledNumber);
};
