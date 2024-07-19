const miliseconds = 1000;
const min_hour = 60;
const hoursDay = 24;

export const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = miliseconds * min_hour * min_hour * hoursDay;
    const day = Math.floor(diff / oneDay);
    return day;
};

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
};

export const scrollToElement = (ref) => {
  if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

