import React from 'react'
import './LandProdustsList.css'
import ProductPreview from '../ProductPreview/ProductPreview'
import Loading from '../Loading/Loading'

export default function LandProdustsList({ title = "", amount = 5, list: products, isLoading }) {

  return (
    <section className='container products-list'>
      <h4 className='products-list__title'>{ title }</h4>
      <div className="products-list__wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          products.slice(0, amount).map(product => (
            <ProductPreview key={product.id} {...product} />
          ))
        )}
        
      </div>
      <div className="btn-big">See more</div>
    </section>
  )
}
