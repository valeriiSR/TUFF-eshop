import { useEffect } from 'react';
// import { useGetProductQuery } from '../../features/singleProduct/singleProductSliceAPI';
import { useNavigate, useParams } from "react-router-dom"
import { ROUTES } from '../../utils/routes';
import Loading from '../Loading/Loading';
import SingleProductViewer from '../SingleProductViewer/SingleProductViewer';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../features/singleProduct/singleProductSlice';

export default function SingleProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(state => state.singleProduct);

  // const { data: product, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  // useEffect(() => {
  //   if (!isFetching && !isLoading && !isSuccess) {
  //     navigate(ROUTES.HOME)
  //   }
   
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading, isFetching, isSuccess, product]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (product.error) {
    navigate(ROUTES.HOME);
  }

  if (product.isLoading) {
    return <Loading />
  }
  
  if (product.product.id) {
    return <SingleProductViewer product={product.product} />
  }
}
