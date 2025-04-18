import './MainBunner.css';
import mainBunnerImage from '../../images/main-bunner.png';
import mainBunnerSubImage_1 from '../../images/bunner-part_1.png'
import mainBunnerSubImage_2 from '../../images/bunner-part_2.png'
import { Link } from 'react-router-dom';

export default function MainBunner() {
  return (
    <div className='main-bunner'>
      <div className="main-bunner__left">
        <p className="main-bunner__sub-title">NEW YEAR</p>
        <p className="main-bunner-title">SALE</p>
        <Link to="/" className="btn-big">See more</Link>
        <img className='main-bunner__image_1' src={mainBunnerSubImage_1} alt="" />
        <img className='main-bunner__image_2' src={mainBunnerSubImage_2} alt="" />
      </div>
      <div className="main-bunner__right" style={{  backgroundImage: `url(${mainBunnerImage})`}}>
        <p className='main-bunner__desc'>save up to <span className='text-violet'>50%</span>  off</p>
      </div>
    </div>
  )
}
