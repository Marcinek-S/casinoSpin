const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001; // Port dla backendu

// Umożliwia połączenia CORS
app.use(cors());

// Konfiguracja połączenia z bazą danych
const db = mysql.createConnection({
  host: "localhost", // Adres hosta (localhost dla lokalnej bazy)
  user: "root", // Użytkownik bazy danych
  password: "", // Hasło bazy danych
  database: "casino", // Nazwa bazy danych
});

// Połączenie z bazą danych
db.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych:", err);
    return;
  }
  console.log("Połączono z bazą danych MySQL");
});

// Endpoint do pobierania danych
app.get("/api/profile", (req, res) => {
  db.query("SELECT * FROM profile", (err, results) => {
    if (err) {
      console.error("Błąd zapytania do bazy danych:", err);
      res.status(500).send("Błąd zapytania do bazy danych");
      return;
    }
    console.log(results); // Wyświetlenie wyników w konsoli
    res.json(results); // Odesłanie wyników do frontendu
  });
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
