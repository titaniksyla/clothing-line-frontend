import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Products.scss'

function Products(){

  const[productsData, setProductsData] = useState([]);
  const[filteredProductData, setFilteredProductData] = useState(productsData);

  const[brandsData, setBrandsData] = useState([]);
  const[brandValue, setBrandValue] = useState('all');

  const[categoriesData, setCategoriesData] = useState([]);
  const[categoryValue, setCategoryValue] = useState('all');
  
  function handleSearchProduct(e){
    const {value} = e.target;
    if (value) {
      setFilteredProductData(
        productsData.filter( product => product.product_name.toLowerCase().includes(e.target.value.toLowerCase()))
      )
    } else {
      console.log(productsData)
      setFilteredProductData(productsData)
    }
    
  }

  function handleBrandSelector(e){
    setBrandValue(e.target.value);
  }

  function handleCategorySelector(e){
    setCategoryValue(e.target.value);
  }

  function activeBox(key){
    for(let i=1; i<=key;i++){
      switch(key){
        case i:
          return i;
        break;
      }
    }
  }

  useEffect(() => {
    if(brandValue == 'all' && categoryValue == 'all'){
      setFilteredProductData(productsData);
    }
    else if(brandValue != 'all' && categoryValue == 'all' ){
      setFilteredProductData(
        productsData.filter( product => product.brand_id == brandValue)
      )
    }
    else if(brandValue == 'all' && categoryValue != 'all'){
      setFilteredProductData(
        productsData.filter( product => product.category_id == categoryValue)
      )
    }
    else if(brandValue != 'all' && categoryValue != 'all'){
      setFilteredProductData(
        productsData.filter( product => product.brand_id == brandValue && product.category_id == categoryValue )
      )
    }
  }, [brandValue, categoryValue]);


  // console.log('brand value', brandValue, '| category value', categoryValue)

  useEffect(() => {
    try {
      axios.get('http://localhost:8080/product')
      .then( data => {
        console.log(data.data);
        setProductsData(data.data.allProducts);
        setFilteredProductData(data.data.allProducts);
        setBrandsData(data.data.allBrands);
        setCategoriesData(data.data.allCategories);
      })  
    } catch (error) {
      console.log(error);
    }
  },[])
  return (
    <div className='products-container'>
      <div className="products-filter">
        <form className='filter-form'>
          <div className="search-container">
            <input type="text" placeholder='Kerkoni produktin..' onChange={handleSearchProduct}/>
          </div>
          <div className="brands-filter">
            <label htmlFor="brands">Brands:</label>
            <select name="brands" id="brands" onChange={handleBrandSelector}>
              <option value='all'>All</option>
              {brandsData.map(brand => {
                return(
                  <option key={brand.id} value={brand.id}>{brand.brand_name}</option>
                )
              })}
            </select>
          </div>

          <div className="category-filter">
            <label htmlFor="category">Category:</label>
            <select name="category" id="category" onChange={handleCategorySelector}>
            <option value='all'>All</option>
              {categoriesData.map(category => {
                return(
                  <option key={category.id} value={category.id}>{category.category_name}</option>
                )
              })}
            </select>
          </div>

        </form>
      </div>
      <div className="products-boxes">        
        {filteredProductData.map(({price, id, product_name, product_image}) => {
          return(
            <div key={id} className='prod'>
              <div className="abs-container">
                    <p className='cmimi'>${price}</p>
                    <p className='zbritja'>-20%</p>
              </div>
              <div className="producti-container" >
                <div className="product-img">
                  <img src={product_image} alt='logo'/>
                </div>
                <h4>{product_name}</h4>
                <div className="product-info">
                  <Link to={`/product/${activeBox(id)}`}>Shiko produktin</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default Products