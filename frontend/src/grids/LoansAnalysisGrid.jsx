import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import { formatData } from '../components/FormatFunctions';
import { useReturnId } from '../pages/ReturnsDetailPage'; 



const LoanAnalysisGrid = () => {
  const { themeClass } = useTheme();
  const returnId = useReturnId();  // Get returnId from context
  const [dataSourceMaturity, setDataSourceMaturity] = useState([]);
  const [dataSourceCategory, setDataSourceCategory] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataSource = async () => {
    if (!returnId) return;  // Ensure returnId is available before fetching
      try {

        // Set the API endpoint variables
        const endpoint1 = `data/outstanding-loan-maturity-fact/?returnId=${returnId}`;
        const endpoint2 = `data/outstanding-loan-category-fact/?returnId=${returnId}`;
        const endpoint3 = `data/advanced-loan-maturity-fact/?returnId=${returnId}`;
        const endpoint4 = `data/advanced-loan-category-fact/?returnId=${returnId}`;

        // Fetch data from the API
        const data1 = await fetchData(endpoint1);
        const data2 = await fetchData(endpoint2);
        const data3 = await fetchData(endpoint3);
        const data4 = await fetchData(endpoint4);

        // Format the data using formatData
        const formattedData1 = data1.map(item => formatData(item));
        const formattedData2 = data2.map(item => formatData(item));
        const formattedData3 = data3.map(item => formatData(item));
        const formattedData4 = data4.map(item => formatData(item));

        const dataSourceMaturity = [
          {
            key: '1',
            dim: 'Under 1 yr',
            no: findFormattedValue1(formattedData1, '1', 'numberOutstandingMaturity'),
            ao: findFormattedValue1(formattedData1, '1', 'amountOutstandingMaturity'),
            na: findFormattedValue3(formattedData3, '1', 'numberAdvancedMaturity'),
            aa: findFormattedValue3(formattedData3, '1', 'amountAdvancedMaturity')
          },
          {
            key: '2',
            dim: '1 to 3 yrs',
            no: findFormattedValue1(formattedData1, '2', 'numberOutstandingMaturity'),
            ao: findFormattedValue1(formattedData1, '2', 'amountOutstandingMaturity'),
            na: findFormattedValue3(formattedData3, '2', 'numberAdvancedMaturity'),
            aa: findFormattedValue3(formattedData3, '2', 'amountAdvancedMaturity')
          },
          {
            key: '3',
            dim: '3 to 5 yrs',
            no: findFormattedValue1(formattedData1, '3', 'numberOutstandingMaturity'),
            ao: findFormattedValue1(formattedData1, '3', 'amountOutstandingMaturity'),
            na: findFormattedValue3(formattedData3, '3', 'numberAdvancedMaturity'),
            aa: findFormattedValue3(formattedData3, '3', 'amountAdvancedMaturity')
          },
          {
            key: '4',
            dim: '5 to 10 yrs',
            no: findFormattedValue1(formattedData1, '4', 'numberOutstandingMaturity'),
            ao: findFormattedValue1(formattedData1, '4', 'amountOutstandingMaturity'),
            na: findFormattedValue3(formattedData3, '4', 'numberAdvancedMaturity'),
            aa: findFormattedValue3(formattedData3, '4', 'amountAdvancedMaturity')
          },
          {
            key: '5',
            dim: '10 to 25 yrs',
            no: findFormattedValue1(formattedData1, '5', 'numberOutstandingMaturity'),
            ao: findFormattedValue1(formattedData1, '5', 'amountOutstandingMaturity'),
            na: findFormattedValue3(formattedData3, '5', 'numberAdvancedMaturity'),
            aa: findFormattedValue3(formattedData3, '5', 'amountAdvancedMaturity')
          },
          {
            key: '6',
            dim: 'Over 25 yrs',
            no: findFormattedValue1(formattedData1, '6', 'numberOutstandingMaturity'),
            ao: findFormattedValue1(formattedData1, '6', 'amountOutstandingMaturity'),
            na: findFormattedValue3(formattedData3, '6', 'numberAdvancedMaturity'),
            aa: findFormattedValue3(formattedData3, '6', 'amountAdvancedMaturity')
          },
          {
            key: '7',
            dim: 'Total',
            no: findFormattedValue1(formattedData1, '7', 'numberOutstandingMaturity'),
            ao: findFormattedValue1(formattedData1, '7', 'amountOutstandingMaturity'),
            na: findFormattedValue3(formattedData3, '7', 'numberAdvancedMaturity'),
            aa: findFormattedValue3(formattedData3, '7', 'amountAdvancedMaturity'),
            className: 'grey-background'
          }
        ];
        
        const dataSourceCategory = [
          {
            key: '1',
            dim: 'Personal',
            no: findFormattedValue2(formattedData2, '1', 'numberOutstandingCategory'),
            ao: findFormattedValue2(formattedData2, '1', 'amountOutstandingCategory'),
            na: findFormattedValue4(formattedData4, '1', 'numberAdvancedCategory'),
            aa: findFormattedValue4(formattedData4, '1', 'amountAdvancedCategory')
          },
          {
            key: '2',
            dim: 'House',
            no: findFormattedValue2(formattedData2, '2', 'numberOutstandingCategory'),
            ao: findFormattedValue2(formattedData2, '2', 'amountOutstandingCategory'),
            na: findFormattedValue4(formattedData4, '2', 'numberAdvancedCategory'),
            aa: findFormattedValue4(formattedData4, '2', 'amountAdvancedCategory')
          },
          {
            key: '3',
            dim: 'Commercial',
            no: findFormattedValue2(formattedData2, '3', 'numberOutstandingCategory'),
            ao: findFormattedValue2(formattedData2, '3', 'amountOutstandingCategory'),
            na: findFormattedValue4(formattedData4, '3', 'numberAdvancedCategory'),
            aa: findFormattedValue4(formattedData4, '3', 'amountAdvancedCategory')
          },
          {
            key: '4',
            dim: 'Community',
            no: findFormattedValue2(formattedData2, '4', 'numberOutstandingCategory'),
            ao: findFormattedValue2(formattedData2, '4', 'amountOutstandingCategory'),
            na: findFormattedValue4(formattedData4, '4', 'numberAdvancedCategory'),
            aa: findFormattedValue4(formattedData4, '4', 'amountAdvancedCategory')
          },
          {
            key: '5',
            dim: 'Other',
            no: findFormattedValue2(formattedData2, '5', 'numberOutstandingCategory'),
            ao: findFormattedValue2(formattedData2, '5', 'amountOutstandingCategory'),
            na: findFormattedValue4(formattedData4, '5', 'numberAdvancedCategory'),
            aa: findFormattedValue4(formattedData4, '5', 'amountAdvancedCategory')
          },
          {
            key: '6',
            dim: 'Total',
            no: findFormattedValue2(formattedData2, '6', 'numberOutstandingCategory'),
            ao: findFormattedValue2(formattedData2, '6', 'amountOutstandingCategory'),
            na: findFormattedValue4(formattedData4, '6', 'numberAdvancedCategory'),
            aa: findFormattedValue4(formattedData4, '6', 'amountAdvancedCategory'),
            className: 'grey-background'
          }
        ];

        setDataSourceMaturity(dataSourceMaturity);
        setDataSourceCategory(dataSourceCategory);
      } catch (err) {
        setError('Failed to fetch data');
      }
  };

  // Use useEffect to call the API when the component mounts
  useEffect(() => {
    fetchDataSource();
  }, [returnId]);

  // Helper function to find formatted value based on dimension
  const findFormattedValue1 = (data1, dim, key) => {
    const entry = data1.find(item => item.loanMaturityDim === dim);  // Find the matching entry
    return entry ? entry[key] : 'N/A';  // Return the value or 'N/A' if not found
  };

  const findFormattedValue2 = (data2, dim, key) => {
    const entry = data2.find(item => item.loanCategoryDim === dim);  // Find the matching entry
    return entry ? entry[key] : 'N/A';  // Return the value or 'N/A' if not found
  };

  const findFormattedValue3 = (data3, dim, key) => {
    const entry = data3.find(item => item.loanMaturityDim === dim);  // Find the matching entry
    return entry ? entry[key] : 'N/A';  // Return the value or 'N/A' if not found
  };

  const findFormattedValue4 = (data4, dim, key) => {
    const entry = data4.find(item => item.loanCategoryDim === dim);  // Find the matching entry
    return entry ? entry[key] : 'N/A';  // Return the value or 'N/A' if not found
  };

  const tableMaturity = (
    <table id="loans-analysis-table" className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '20%', textAlign: 'left' }}>LOAN ANALYSIS BY MATURITY</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of advanced loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of advanced loans</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
        </tr>
      </thead>
      <tbody>
        {dataSourceMaturity.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.no}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.ao}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.na}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.aa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const tableCategory = (
    <table className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '20%', textAlign: 'left' }}>LOAN ANALYSIS BY CATEGORY</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of advanced loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of advanced loans</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
        </tr>
      </thead>
      <tbody>
        {dataSourceCategory.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.no}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.ao}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.na}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.aa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '700px', margin: '0 auto' }}>
      {error && <div>Error: {error}</div>}
      {!error && tableMaturity}
      {!error && tableCategory}
    </div>
  );
};

export default LoanAnalysisGrid;