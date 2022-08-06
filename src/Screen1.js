import React from 'react'
import { useState, useEffect } from 'react';
import Coin from './Coin';
import { useFetch } from './useFetch';
import './index.css';

const Screen1 = ({handleClick1}) => {
  const {loading, coinItems, tabs, paginate } = useFetch()
  const [page, setPage] = useState(0)
  const [newCoins, setNewCoins] = useState([])
  const [tab, setTab]=useState('');
  const [filterCoins,setFilterCoins]=useState({});
  const [click, setClick]=useState(false);


  let tagF=(item,tag)=>{
    let flag=false;
    if(item.tags){
      for(let i=0; i<item.tags.length; i++){
        if(item.tags[i]===tag) {flag=true; break;}
      }
    }
    return flag;
    }
  
  const filterItems = (tag) => {
    const newItems = coinItems.filter((item) => tagF(item,tag));
    setFilterCoins(newItems);
    console.log(filterCoins);
  };

  useEffect(()=>{
  setNewCoins(paginate(filterCoins)[page]);
 },[page,tab]);
 
 

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > paginate(filterCoins).length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = paginate(filterCoins).length - 1
      }
      return prevPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }
  
    return (
        <main>
        <div className='title'>
        <h1>{loading ? 'Loading...' : 'Coins'}</h1>
      </div>
          {/* tabs */}
          <div className="btn-container">
        {tabs.map((tag, index) => {
          return (
            <button
              type="button"
              className="filter-btn"
              key={index}
              onClick={()=>{
                filterItems(tag);
                setTab(tag);
                setClick(true);
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

          {/* coins */}
          {click ?
      <section className='newCoins'>
        <div className='container'>
          {newCoins && newCoins.map((coin) => {
            return <Coin handleClick1={handleClick1} key={coin.id} {...coin} />
          })}
        </div>
      
        
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {paginate(filterCoins).map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        
        </section>
        :
        <p className="optional">Please click any of the Tabs above as per Tags</p>}
        </main>

  )
}

export default Screen1;