const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/search/:membershipType', async (req, res) => {
  try {
    const { displayName, displayNameCode } = req.body; // Extract displayName and displayNameCode from request body
    const membershipType = req.params.membershipType;

    const response = await axios.post(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/${membershipType}/`, {
      displayName,
      displayNameCode
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '61d53d163f7f43a8b31062b55180d23a'
      }
    });

    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// app.get('/request', async (req, res) => {
//   try {
//     const response = await axios.get('https://www.bungie.net/Platform/Destiny2/2/Profile/4611686018428494348/Character/2305843010124404029/?components=205', {
//       headers: {
//         'X-API-Key': '61d53d163f7f43a8b31062b55180d23a'
//       }
//     });

//     const data = response.data;

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });