import { useState, useEffect } from 'react'
const url="https://supermind-staging.vercel.app/api/test/listing";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [coinItems, setCoinItems] = useState([]);
  const [tabs, setTabs]=useState([]);

  const paginate = (newCoin) => {
    const itemsPerPage = 10
    const numberOfPages = Math.ceil(newCoin.length / itemsPerPage)
  
    const newCoins= Array.from({ length: numberOfPages }, (_, index) => {
      const start = index * itemsPerPage
      return newCoin.slice(start, start + itemsPerPage)
    })
  
    return newCoins;
  }
  const allTabs=(coinItems)=>{
    let setItems=new Set();
       for(let j=0; j<coinItems.length;j++){
      for(let i=0;i<coinItems[j].tags.length;i++){
      setItems.add(coinItems[j].tags[i]);
      }
    }
    return setItems;
  }

  const fetchCoins = async () => {
    const response = await fetch(url);
    const newCoins= await response.json();
    const alltabs=allTabs(newCoins);
    setTabs([...alltabs]);
    setCoinItems(newCoins);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins()
  }, []);

  return { loading, coinItems, tabs, paginate }
}
