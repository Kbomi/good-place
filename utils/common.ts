export const setCookie = (name: string, value: string, days?: number) => {
  let cookie_value = value;
  if (days) {
    const date = new Date();
    cookie_value += `;expires= ${date.toUTCString()};`;
  }

  document.cookie = name + "=" + cookie_value;
};

export const getCookie = (name: string): string => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? unescape(value[2]) : "";
};
