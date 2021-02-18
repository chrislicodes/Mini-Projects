const formatDate = function (date) {
  const dateFormat = new Intl.DateTimeFormat(this._lang, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);

  return dateFormat;
};

const formatTime = function (date) {
  const timeFormat = new Intl.DateTimeFormat(this._lang, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return timeFormat;
};

const formatToValidDateString = (date, time) => new Date(date + "T" + time);
