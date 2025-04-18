import { useSelector } from 'react-redux';
import styles from './SearchResults.module.css';
import SearchResultItem from './SearchResultItem';

export default function SearchResults() {
  const { findBySearch } = useSelector(({products}) => products);

  return (
    <section className={styles.search}>
      <h1 className={styles.title}>Search Results</h1>
      {!findBySearch ? <p>No results</p> : (
        findBySearch.map(item => (
          <SearchResultItem item={item} />
        ))
      )}
    </section>
    
  )
}
