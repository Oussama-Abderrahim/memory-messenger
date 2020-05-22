class DateFormatter {
  /**
   * @param timestamp in miliseconds
   * @return {String} date string in own format
   */
  static formatDate(timestamp) {
    const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const MONTHS = [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ];
    let date = new Date(timestamp);

    return `${DAYS[date.getDay()]} ${date.getDate()} ${
      MONTHS[date.getMonth()]
    } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}

module.exports = DateFormatter;
