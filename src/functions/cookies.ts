const read_cookies = document.cookie;
const date = new Date();

export const setCookies = (key: string, value: string) => {
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${value};expires=${date.toUTCString()}`;
};

export const getCookies = () => {
  try {
    const userCookies: string = read_cookies.split('=')[1];

    return JSON.parse(userCookies);
  } catch (e: unknown) {
    const Err = (e as TypeError).message;

    console.log(Err);
  }
};

export const deleteCookies = (key: string, value: string) => {
  date.setTime(date.getTime());
  document.cookie = `${key}=${value};expires=${date.toUTCString()}`;
};
