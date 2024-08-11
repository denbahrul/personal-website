function getDurationTime(endDate, startDate) {
    let durationTime = new Date(endDate) - new Date(startDate);

    let miliSecond = 1000;
    let secondInDay = 86400;
    let dayInMonth = 30;
    let monthInYear =12;

    let durationTimeInDay = Math.floor(durationTime / (miliSecond * secondInDay));
    let durationTimeInMonth = Math.floor(durationTime / (miliSecond * secondInDay * dayInMonth));
    let durationTimeInYear = Math.floor(durationTime / (miliSecond * secondInDay * dayInMonth * monthInYear));

    let restOfMonthInYear = Math.floor((durationTime%(miliSecond * secondInDay * dayInMonth * monthInYear)) / (miliSecond * secondInDay * dayInMonth))

    if (durationTimeInYear > 0 ) {
        if (restOfMonthInYear > 0) {
            return `${durationTimeInYear} tahun ${restOfMonthInYear} bulan`;
        } else {
            return `${durationTimeInYear} tahun`;
        }
    } else if (durationTimeInMonth > 0 ) {
        return `${durationTimeInMonth} bulan`;
    } else {
        return `${durationTimeInDay} hari`
    }
}
