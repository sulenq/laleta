const useFormatNumber = (num: number) => {
  let formattedNum;
  // console.log(num)
  if (num !== 0) {
    formattedNum = num?.toLocaleString("id-ID");
  } else {
    formattedNum = "0";
  }

  return formattedNum;
};

export default useFormatNumber;
