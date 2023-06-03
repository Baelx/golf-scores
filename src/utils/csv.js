import { Parser } from '@json2csv/plainjs';

export const convertJsonToCsv = (jsonData) => {
    let csvData = '';

    try {
        const opts = {};
        const parser = new Parser(opts);
        csvData = parser.parse(jsonData);
    } catch (err) {
        console.error(err);
    }

    return csvData;
}

export const prepareStateJsonForCsvConversion = (jsonData, courseName) => {
    const today = new Date().toDateString();

    // Set up JSON so each golfer has their own row in the CSV.
    const csvFormattedJson = [
        {
            golfer: "Player 1",
            date: today,
            course: courseName,
        },
        {
            golfer: "Player 2",
            date: today,
            course: courseName,
        }
    ];

    jsonData.forEach((hole, originalDataIndex) => {
        csvFormattedJson.forEach((row, csvFormatIndex) => {
            const holeNumber = `h${originalDataIndex + 1}`;
            row[`${holeNumber}par`] = 3;
            if (csvFormatIndex === 0) {
                row[`${holeNumber}putts`] = Number(hole.p1putt);
                row[`${holeNumber}total`] = Number(hole.p1total);
            }
            if (csvFormatIndex === 1) {
                row[`${holeNumber}putts`] = Number(hole.p2putt);
                row[`${holeNumber}total`] = Number(hole.p2total);
            }
        })
    });

    return csvFormattedJson;
}

export const downloadCsv = (csvData) => {
    const today = new Date().toISOString();
    const tempAnchor = document.createElement('a');

    tempAnchor.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`);
    tempAnchor.setAttribute('download', `golfscores-${today}.csv`);
    tempAnchor.click();
}