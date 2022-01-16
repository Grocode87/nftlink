import axios from 'axios';
const handler = async (req, res) => {

    const address = req.body.address
    
    const { data, error } = await axios.get(`https://ethereum-api.rarible.org/v0.1/nft/items/byOwner?owner=${address}&size=10`)
    
    const nfts = data.items

    const nftList = []
    let index = 0
    
    for (let index = 0; index < nfts.length; index++) {
        const nft = nfts[index];
        
        const collectionAddress = nft.contract

        const { data, error } = await axios.get(`https://ethereum-api.rarible.org/v0.1/nft/collections/${collectionAddress}`)

        nftList.push({
            id: nft.id,
            name: nft.meta.name,
            image: nft.meta.image?.url.PREVIEW || "",
            collection: data.name,
            price: 0,
            auctionLive: false,
        })
        index += 1;
    }

    res.send({ nfts: nftList });
};
  
export default handler;
  