export const validateInput = (data = "", type) => {
  if (type.toLowerCase() === "email") {
    return String(data)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  } else if (type.toLowerCase() === "phone") {
    return String(data).trim().length == 10;
  }
};
