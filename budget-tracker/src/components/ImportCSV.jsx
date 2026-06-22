function ImportCSV({ onImport }) {
 
  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
 
    const text = await file.text();
 
    const rows = text
      .trim()
      .split("\n")
      .map(line => line.split(","));
 
    if (rows.length < 2) {
      alert("CSV file has no data rows.");
      e.target.value = "";
      return;
    }
 
    const headers = rows[0].map(h => h.trim().toLowerCase());
 
    const data = rows.slice(1)
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = row[i]?.trim();
        });
 
        const amount = Number(obj.amount);
 
        return {
          id: crypto.randomUUID(),
          date: obj.date,
          description: obj.description,
          amount,
          category: obj.category || "Uncategorized",
        };
      })
      // drop rows missing required fields or with an unparseable amount
      .filter(t => t.date && t.description && !isNaN(t.amount));
 
    const skipped = rows.length - 1 - data.length;
 
    if (data.length === 0) {
      alert("No valid rows found. Check that your CSV has date, description, and amount columns.");
    } else if (skipped > 0) {
      alert(`Imported ${data.length} transaction(s). Skipped ${skipped} row(s) with missing or invalid data.`);
    }
 
    if (data.length > 0) {
      onImport(data);
    }
 
    // reset so the same file can be re-selected if needed
    e.target.value = "";
  }
 
  return (
    <div>
      <h2>Import CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <p style={{ fontSize: "0.85em", color: "#666" }}>
        Expected columns: date, description, amount, category (optional)
      </p>
    </div>
  );
}
 
export default ImportCSV;
 