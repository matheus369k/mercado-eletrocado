export const cookiesVariables = {
  read_cookies: document.cookie,
  date: new Date(),
  add: function ({ key, value }: { key: string; value: string }) {
    this.date.setTime(this.date.getTime() + 7 * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${value};expires=${this.date.toUTCString()}`;
  },
  get: function (key: string) {
    try {
      const allCookies: string[] = this.read_cookies.split('=');
      const cookieKeyIndex = allCookies.findIndex((value) => value === key);
      if (cookieKeyIndex < 0) throw new Error(`Not found cookie with name: ${key}`);

      return JSON.parse(allCookies[cookieKeyIndex + 1].split(';')[0]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
  delete: function (key: string) {
    try {
      const allCookies: string[] = this.read_cookies.split('=');
      const cookieKeyIndex = allCookies.findIndex((value) => value === key);
      if (cookieKeyIndex < 0) throw new Error(`Not found cookie with name: ${key}`);
      this.date.setTime(this.date.getTime());
      document.cookie = allCookies
        .map((value, index) => {
          if (cookieKeyIndex + 1 === index) {
            return `${allCookies[key + 1]};expires=${this.date.toUTCString()}`;
          }
          return value;
        })
        .toString()
        .replace(';,', '; ')
        .replace(',', '=');
    } catch (error) {
      console.log(error.message);
    }
  },
};
