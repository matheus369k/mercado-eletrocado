export const formatter = {
  CorrectedDateFormat: function (date: string) {
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    if (isoRegex.test(date)) return date;
    return new Date(date).toISOString();
  },
  dateDefault: function (date: string) {
    const dateFormatted = this.CorrectedDateFormat(date);
    return new Intl.DateTimeFormat().format(new Date(dateFormatted));
  },
};
