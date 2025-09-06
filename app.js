const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample in-memory "beer rooms" store
let beerRooms = [
  { id: 1, name: "IPA Lovers", description: "Hop lovers unite!" },
  { id: 2, name: "Stout Central", description: "Dark and bold" },
];

// GET all beer rooms
app.get("/api/beerRooms", (req, res) => {
  res.json(beerRooms);
});

// GET one beer room
app.get("/api/beerRooms/:id", (req, res) => {
  const room = beerRooms.find((r) => r.id === parseInt(req.params.id, 10));
  if (room) res.json(room);
  else res.status(404).json({ error: "Not found" });
});

// POST create new beer room
app.post("/api/beerRooms", (req, res) => {
  const { name, description } = req.body;
  const id = beerRooms.length ? beerRooms[beerRooms.length - 1].id + 1 : 1;
  const newRoom = { id, name, description };
  beerRooms.push(newRoom);
  res.status(201).json(newRoom);
});

// DELETE a beer room
app.delete("/api/beerRooms/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  beerRooms = beerRooms.filter((r) => r.id !== id);
  res.status(204).end();
});

app.listen(PORT, () =>
  console.log(`Express API listening at http://localhost:${PORT}`)
);
