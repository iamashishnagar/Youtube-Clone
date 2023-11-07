import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express(); // create express app
app.use(express.json()); // parse json bodies

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/process-video', (req, res) => {
  // TODO: get input and output file paths from request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  // check if input file exists
  if (!inputFilePath || !outputFilePath) {
    res.status(400).send('Input file path is required.');
    return;
  }

  // process video
  ffmpeg(inputFilePath).outputOptions('-vf', 'scale=-1:360')
    .on('end', () => {
      console.log('Video processing finished!');
      res.status(200).send('Video processing finished!');
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
      res.status(500).send('Error: ' + err.message);
    })
    .save(outputFilePath);
});

// start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started at http://localhost:' + port + '/');
});