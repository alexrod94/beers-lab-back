const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let beers = [
  {
    _id: uuidv4(),
    name: "Pale Ale",
    tagline: "Crisp & hoppy",
    description: "A refreshing pale ale with citrus notes.",
    image_url: "https://ideogram.ai/g/8K6bDw6rTXKvNS7ZrYUm6A/0",
    first_brewed: "04/2012",
    brewers_tips: "Serve cold in a nonic pint glass.",
    attenuation_level: 75,
    contributed_by: "Ironhack Student",
  },
  {
    _id: uuidv4(),
    name: "Stout",
    tagline: "Dark & creamy",
    description: "A rich stout with notes of chocolate and coffee.",
    image_url: "https://ideogram.ai/g/8K6bDw6rTXKvNS7ZrYUm6A/2",
    first_brewed: "10/2015",
    brewers_tips: "Pair with oysters or dessert.",
    attenuation_level: 80,
    contributed_by: "Ironhack Student",
  },
];

// GET all beers
app.get("/", (req, res) => {
  res.json(beers);
});

// GET beer by id
app.get("/:id", (req, res) => {
  const beer = beers.find((b) => b._id === req.params.id);
  if (!beer) return res.status(404).json({ error: "Beer not found" });
  res.json(beer);
});

// GET random beer
app.get("/random", (req, res) => {
  const randomBeer = beers[Math.floor(Math.random() * beers.length)];
  res.json(randomBeer);
});

// POST new beer
app.post("/new", (req, res) => {
  const {
    name,
    tagline,
    description,
    image_url,
    first_brewed,
    brewers_tips,
    attenuation_level,
    contributed_by,
  } = req.body;

  const newBeer = {
    _id: uuidv4(),
    name,
    tagline,
    description,
    image_url,
    first_brewed,
    brewers_tips,
    attenuation_level: Number(attenuation_level),
    contributed_by,
  };

  beers.push(newBeer);
  res.json({ message: "New beer successfully saved to database!" });
});

// SEARCH beers by name
app.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const results = beers.filter((b) => b.name.toLowerCase().includes(q));
  res.json(results);
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`🍻 Local Beer API running on http://localhost:${PORT}`)
);
