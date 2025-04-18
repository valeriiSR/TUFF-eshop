import './CloseBtn.css'

const CloseBtn = ({handleClick}) => {
  return (
  <button className='close closeModal' onClick={handleClick}>
    <svg className='closeModal' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className='closeModal' d="M1.375 1.375L12.625 12.625" stroke="#576067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path className='closeModal' d="M1.375 12.625L12.625 1.375" stroke="#576067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
  )
};

export default CloseBtn;