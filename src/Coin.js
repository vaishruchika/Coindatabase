import React from 'react'

const Coin = ({ id, name, fullName, price, handleClick1,tags }) => {

  return (
          <article key={id} className='coin-item'>
            <div className="coin-btn">
                <h3>{name}</h3>
                <button id="btn1" onClick={()=>handleClick1(name)}>Graph</button>       
            </div>
            <div className='item-info'>
              <header>
                <h4>{fullName}</h4>
                <h4 className='price'>${price}</h4>
              </header>
            </div>
          </article>
  );
}

export default Coin