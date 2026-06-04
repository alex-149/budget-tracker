
function ImportCSV({ onImport }) {

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();

    const rows = text
      .trim()
      .split("\n")
      .map(line => line.split(","));

    const headers = rows[0];

    const data = rows.slice(1).map(row => {
      const obj = {};

      headers.forEach((h, i) => {
        obj[h.trim()] = row[i]?.trim();
      });

      return {
        id: crypto.randomUUID(),
        date: obj.date,
        description: obj.description,
        amount: Number(obj.amount),
        category: obj.category || "Uncategorized"
      };
    });

    onImport(data);
  }

  return (
    <div>
      <h2>Import CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
}

export default ImportCSV;