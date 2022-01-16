import axios from 'axios';
const handler = async (req, res) => {

    const address = req.body.address
    
    const { data, error } = await axios.get(`https://ethereum-api.rarible.org/v0.1/nft/items/byOwner?owner=${address}&size=10`)
    
    res.send({ nfts: data.items });
};
  
export default handler;
  