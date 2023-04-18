const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.X_API_KEY;

app.post('/search-and-inventory', async (req, res) => {
  try {
    const { displayName, displayNameCode } = req.body; // Extract displayName and displayNameCode from request body

    const searchResponse = await axios.post(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/All/`, {
      displayName,
      displayNameCode
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${apiKey}`
      }
    });

    const searchResponseData = searchResponse.data.Response;
    const membershipData = searchResponseData.find(item => item.applicableMembershipTypes.length > 0);

    if (!membershipData) {
      res.status(404).json({ error: 'No applicable membership found' });
      return;
    }

    const { membershipType, membershipId } = membershipData;

    const characterResponse = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${apiKey}`
      }
    });

    const characterData = characterResponse.data.Response.characters.data;
    const characterIds = Object.keys(characterData);
///
    const inventoryResponse = await Promise.all(characterIds.map(characterId => {
      return axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=205`, {
        headers: {
          'X-API-Key': `${apiKey}`
        }
      });
    }));
    
    const inventoryData = inventoryResponse.map(response => response.data.Response);
    const items = inventoryData.map(character => character.equipment.data.items);
    
    const itemDetailsResponse = await Promise.all(
      items.flat().map(item => {
        return axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${item.itemHash}/`, {
          headers: {
            'X-API-Key': `${apiKey}`
          }
        });
      })
    );
    
    const itemDetailsData = itemDetailsResponse.map(response => response.data.Response);
    
    const itemsWithDetails = items.map(characterItems => {
      return characterItems.map(item => {
        const itemDetails = itemDetailsData.find(details => details.hash === item.itemHash);
        return {
          ...item,
          itemDetails
        };
      });
    });
    
    const inventory = characterIds.reduce(async (accPromise, cur, index) => {
      const acc = await accPromise;
      acc[cur] = { items: {} };
    
      for (let i = 0; i < itemsWithDetails[index].length; i++) {
        const item = itemsWithDetails[index][i];
    
        acc[cur].items[i] = {
          itemHash: item.itemHash,
          itemInstanceId: item.itemInstanceId,
          itemDetails: item.itemDetails
        };
    
        const { itemInstanceId } = item;
        const itemInstanceResponse = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${itemInstanceId}/?components=302`, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': `${apiKey}`
          }
        });
        const itemInstanceData = itemInstanceResponse.data.Response;
    
        acc[cur].items[i].itemInstanceData = itemInstanceData;
      }
    
      return acc;
    }, {});
    
    res.json({ characters: characterData, inventory: await inventory });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
