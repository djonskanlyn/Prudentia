import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

const PrReviewsGrid = () => {
  const [rowData, setRowData] = useState([]);

  const gridOptions = {
    columnDefs: [
      { field: 'id', filter: true, floatingFilter: true },
      { field: 'institutionId', filter: true, floatingFilter: true },
      { field: 'institution', filter: true, floatingFilter: true },
      { field: 'reportingPeriod', filter: true, floatingFilter: true },
      { field: 'submissionDate', filter: true, floatingFilter: true },
      { field: 'isCurrent', filter: true, floatingFilter: true },
      { field: 'version', filter: true, floatingFilter: true },
      { field: 'submittedBy', filter: true, floatingFilter: true },
    ],
    pagination: true,
    paginationPageSize: 500,
  };

  useEffect(() => {
    const data = [
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100001, institutionId: 64950, institution: "ABC Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100002, institutionId: 33850, institution: "BCD Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
			{ id: 100003, institutionId: 29600, institution: "CDE Institution", reportingPeriod: "2024-06-30", submissionDate: "2024-07-31", isCurrent: 1, version: 1, submittedBy: "Mary" },
    ];
    setRowData(data);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={gridOptions.columnDefs}
        pagination={gridOptions.pagination}
        paginationPageSize={gridOptions.paginationPageSize}
      />
    </div>
  );
};

export default PrReviewsGrid;