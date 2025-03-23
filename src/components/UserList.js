import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap"; // React Bootstrap pour un meilleur design
import "./UserList.css"; // Importation du fichier CSS pour un style personnalisé

const UserList = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setListOfUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="title">Liste des Utilisateurs</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Chargement...</p>
        </div>
      ) : (
        <div className="row">
          {listOfUsers.map((user) => (
            <div key={user.id} className="col-md-4 mb-3">
              <Card className="custom-card shadow-lg">
                <Card.Body>
                  <Card.Title className="user-name">{user.name}</Card.Title>
                  <Card.Subtitle className="user-email">{user.email}</Card.Subtitle>
                  <Card.Text className="user-info">
                    <strong>📍 Adresse :</strong> {user.address.street}, {user.address.city}
                  </Card.Text>
                  <Card.Text className="user-info">
                    <strong>📞 Téléphone :</strong> {user.phone}
                  </Card.Text>
                  <Card.Text className="user-info">
                    <strong>🌐 Site Web :</strong>{" "}
                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
