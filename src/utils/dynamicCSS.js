export const chatBubbleCSS = (isLead, type = "wrapper") => {
  //dynamic position based on customer/bot (lead key)
  if (isLead && type === "wrapper") {
    return "flex w-full justify-end";
  } else if (!isLead && type === "wrapper") {
    return "flex w-full justify-start";
  } else if (isLead && type === "wing_direction") {
    return "rounded-br-sm";
  } else if (!isLead && type === "wing_direction") {
    return "rounded-bl-sm";
  }
};
