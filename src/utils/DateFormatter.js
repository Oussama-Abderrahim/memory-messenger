class DateFormatter {
  /**
   * @param timestamp in miliseconds
   * @return {String} date string in own format
   */
  static formatDate(timestamp) {
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    // const MONTHS = [
    //   "Janvier",
    //   "Fevrier",
    //   "Mars",
    //   "Avril",
    //   "Mai",
    //   "Juin",
    //   "Juillet",
    //   "Aout",
    //   "Septembre",
    //   "Octobre",
    //   "Novembre",
    //   "Decembre",
    // ];
    let date = new Date(timestamp);

    return `${DAYS[date.getDay()]} ${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}

module.exports = DateFormatter;
