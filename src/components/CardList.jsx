import Card from './Card'
import Search from './Search';
import Button from './Button'
import React, { useState, useEffect } from "react";

const CardList = ({ data }) => {

  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset)


  useEffect(() => {
  
  setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);


 const filterTags = (tagQuery) => {
  const filtered = data.filter(product => {

    // If no tag entered → return all products
    if (!tagQuery) return product;

    // Check if product.tags contains a tag with matching title
    return product.tags.find(tag => tag.title === tagQuery);
  
  });
  setOffset(0)
  setProducts(filtered)
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">

        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" handleClick={()=>setOffset(offset - limit)} />
        <Button text="Next" handleClick={()=>setOffset(offset + limit)} />
      </div>
    </div>
  )
};

export default CardList;