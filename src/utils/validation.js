export const validateInput = (data = "", attributes) => {
  if (attributes.key === "email") {
    let isValidMail = String(data)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if(isValidMail && 'validateDomains' in attributes && ["gmail.com","yahoo.com"].includes(data.split("@")[1])){
        return { status: false, message: "please enter a bussiness mail" };
      }else if(!isValidMail){
        return { status: false, message: "please enter a valid email" }
      }
    return { status: true, message: "" };
  } else if (attributes.key === "phone") {
    return { status: true, message: "" };
  }
};
