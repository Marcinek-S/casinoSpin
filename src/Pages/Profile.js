import React, {useState } from "react";
const mysql = require("mysql2");

const Profile = () => {
  const [profiles, setProfiles] = useState([]);

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

  db.query("SELECT * FROM profile", (err, results) => {
    if (err) {
      console.error("Błąd zapytania do bazy danych:", err);
      return;
    }
    console.log(results); // Wyświetlenie wyników w konsoli
  
  });

  return (
    <div className="accWrapper">
      <h2>Profil</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} - {profile.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
