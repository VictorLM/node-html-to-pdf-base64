import express from 'express';
import htmlToPDF from './html-to-pdf.js';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', async (req, res) => {
  const { html } = req.body;

  if (!html) {
    res.status(400).send('html field required');
    return;
  }

  const pdfBase64 = await htmlToPDF(html);

  res.contentType('application/pdf');
  res.send(pdfBase64);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
