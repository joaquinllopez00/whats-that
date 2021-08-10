export const extractContent = (s) => {
  let span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent;
};
