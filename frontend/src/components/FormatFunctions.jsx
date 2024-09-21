// Formatting functions

// Function to format numbers with commas and no decimal places
export const formatNumber = (number) => {
  return Number(number).toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
};

// Function to format data using formatNumber function
export const formatData = (data) => {
  const formattedData = {};

  Object.keys(data).forEach(key => {
    // Only format numeric values, skip non-numeric fields like 'returnId' and 'depositsInvestmentsDim'
    if (!isNaN(data[key])) {
      formattedData[key] = formatNumber(data[key]);
    } else {
      formattedData[key] = data[key];  // Keep non-numeric fields as is
    }
  });

  return formattedData;
};

