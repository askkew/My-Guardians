const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/search', async (req, res) => {
  try {
    const { displayName, displayNameCode } = req.body; // Extract displayName and displayNameCode from request body

    const response = await axios.post(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/All/`, {
      displayName,
      displayNameCode
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '61d53d163f7f43a8b31062b55180d23a'
      }
    });

    // const data = response.data;
    // res.json(data);

    const responseData = response.data.Response;

    // Find the first item that has an applicableMembershipTypes array of length greater than zero
    const membershipData = responseData.find(item => item.applicableMembershipTypes.length > 0);

    // If no such item is found, return a 404 error
    if (!membershipData) {
      res.status(404).json({ error: 'No applicable membership found' });
      return;
    }

    // Extract the membershipType and membershipId from the membershipData object
    const { membershipType, membershipId } = membershipData;

    res.json({ membershipType, membershipId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/characters/:membershipType/:membershipId', async (req, res) => {
  try {
    const { membershipType, membershipId } = req.params;
    const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '61d53d163f7f43a8b31062b55180d23a'
      }
    });
    const characterData = response.data.Response.characters.data;
    res.json(characterData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/inventory/:membershipId/:membershipType/:characterId', async (req, res) => {
  try {
    const { membershipId, membershipType, characterId } = req.params;
    const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=205`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '61d53d163f7f43a8b31062b55180d23a'
      }
    });
    const characterInventoryData = response.data.Response.characters.data; //WIP
    res.json(characterInventoryData);
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