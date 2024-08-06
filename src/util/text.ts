export function truncateText(text: string, length: number) {
  return text.length > length ? text.slice(0, length - 3) + "..." : text;
}

/** concatenates list together, but if an item is causing the string to exceed
 * `maxCharLength`, it will just say "and x more" */
export function truncateListText(listItems: string[], maxCharLength: number) {
  let str = "";

  let i = 0;
  for (; i < listItems.length; i++) {
    const item = listItems[i];
    if (str.length + item.length > maxCharLength) {
      break;
    }

    str += item;
    if (i !== listItems.length - 1) {
      str += ", ";
    }
  }

  if (i < listItems.length) {
    // remove last comma if any
    if (str.endsWith(", ")) {
      str = str.slice(0, -2);
      str += " ";
    }

    str += `+ ${listItems.length - i}`;
  }
  return str;
}