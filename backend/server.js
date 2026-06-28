import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

let descriptions = [
  { id: 1, prodName: "Organic Coffee Bean", ingredients: "Arabica", weight: "500g", features: "Dark Roast", outputCopy: "Premium Marketplace Copywriting Asset:\n\nDiscover the standout qualities of our Organic Coffee Bean." },
  { id: 2, prodName: "Wireless Mouse", ingredients: "Plastic, Electronics", weight: "150g", features: "Ergonomic, Bluetooth", outputCopy: "Premium Marketplace Copywriting Asset:\n\nDiscover the standout qualities of our Wireless Mouse." }
];

app.get('/api/descriptions', (req, res) => {
  res.status(200).json(descriptions);
});

app.get('/api/descriptions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const found = descriptions.find(item => item.id === id);
  if (!found) {
    return res.status(404).json({ error: "Item not found with that specific identifier." });
  }
  res.status(200).json(found);
});

app.post('/api/descriptions', (req, res) => {
  const { prodName, ingredients, weight, features } = req.body;
  
  if (!prodName) {
    return res.status(400).json({ error: "Validation failed: Product Name is required." });
  }

  const generatedText = `Premium Marketplace Copywriting Asset:\n\nDiscover the standout qualities of our newly optimized ${prodName}. Meticulously sourced incorporating choice components like ${ingredients || 'premium traits'}. Delivered in exact ${weight || 'specified'} batch quantities with distinctive ${features || 'characteristic'} details.`;

  const newDescription = {
    id: descriptions.length ? descriptions[descriptions.length - 1].id + 1 : 1,
    prodName,
    ingredients,
    weight,
    features,
    outputCopy: generatedText
  };

  descriptions.push(newDescription);
  res.status(201).json(newDescription);
});

app.put('/api/descriptions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = descriptions.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Cannot update. Description not found." });
  }

  const { prodName, ingredients, weight, features } = req.body;
  
  if (prodName) descriptions[index].prodName = prodName;
  if (ingredients) descriptions[index].ingredients = ingredients;
  if (weight) descriptions[index].weight = weight;
  if (features) descriptions[index].features = features;
  
  descriptions[index].outputCopy = `Premium Marketplace Copywriting Asset:\n\nDiscover the standout qualities of our newly optimized ${descriptions[index].prodName}. Meticulously sourced incorporating choice components like ${descriptions[index].ingredients || 'premium traits'}. Delivered in exact ${descriptions[index].weight || 'specified'} batch quantities with distinctive ${descriptions[index].features || 'characteristic'} details.`;

  res.status(200).json(descriptions[index]);
});

app.delete('/api/descriptions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = descriptions.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Cannot delete. Description not found." });
  }

  descriptions.splice(index, 1);
  res.status(204).send();
});

app.get('/api/descriptions/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  const filtered = descriptions.filter(item => 
    item.prodName.toLowerCase().includes(query) || 
    (item.features && item.features.toLowerCase().includes(query))
  );
  res.status(200).json(filtered);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error occurred inside engine room." });
});

app.listen(PORT, () => {
  console.log(`Backend engine operational on port http://localhost:${PORT}`);
});