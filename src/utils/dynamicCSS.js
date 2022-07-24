export const chatBubbleCSS = (isLead, type = "wrapper") => {
  //dynamic position based on customer/bot (lead key)
  if (isLead && type === "wrapper") {
    return "flex w-full justify-end";
  } else if (!isLead && type === "wrapper") {
    return "flex w-full justify-start";
  } else if (isLead && type === "wing_direction") {
    return "rounded-br-sm bg-primary text-primary_text";
  } else if (!isLead && type === "wing_direction") {
    return "rounded-bl-sm bg-bubblegray-light text-bubblegray-dark";
  }
};

export const setCSSVar = (cssObj)=>{
    //set theme properties to css vars using document object
    Object.keys(cssObj).map(propKey=>{
      let formattedPropKey = "--zi_"+propKey
      document.documentElement.style.setProperty(formattedPropKey, cssObj[propKey]);
    })
  
}
