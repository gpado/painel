const organizeData = (rows, headers) => {
  let organizedData = [];
  rows.forEach((row) => {
    let organizedRow = {};
    row.forEach((column, index) => {
      organizedRow[headers[index].id] = column;
    });
    organizedData.push(organizedRow);
  });
  
  console.log(organizedData);

  return organizedData;
};

export default organizeData;
