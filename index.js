import express from "express";
import axios from "axios";

const app = express();
const porta = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/pokedex", async (req, res) => {
  const IdOuNome = req.query.Pokemon.toLocaleLowerCase();
  try {
    const response = await axios.get(`${API_URL}/${IdOuNome}`);
    const pokemon = response.data;
    res.render("pokedex.ejs", { pokemon: pokemon });
  } catch (error) {
    res.status(404).render("pokedex.ejs", {pokemon: ""});
  }
});

app.listen(porta, () => {
  console.log(`Aplicação rodando em https://localhost:${porta}`);
});
