import React from 'react'
import './LandCategoriesList.css'
import LandCategoriesPreview from '../LandCategoriesPreview/LandCategoriesPreview'
import Loading from '../Loading/Loading'

export default function LandCategoriesList({ title = "", amount = 5, list: categories, isLoading}) {

  return (
    <section className='container products-list'>
      <h4 className='products-list__title'>{ title }</h4>
      <div className="products-list__wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          categories.slice(0, amount).map(category => (
            <LandCategoriesPreview key={category.id} {...category} />
          ))
        )}
      </div>
    </section>
  )
}