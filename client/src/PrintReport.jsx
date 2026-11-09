function PrintReport() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      className="print-report-btn"
      onClick={handlePrint}
    >
      Print Analysis
    </button>
  );
}

export default PrintReport;
