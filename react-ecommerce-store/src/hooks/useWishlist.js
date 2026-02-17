import { useSelector, useDispatch } from 'react-redux';
import { 
  addToWishlist, 
  removeFromWishlist, 
  toggleWishlist,
  clearWishlist,
  selectWishlistItems 
} from '../store/slices/wishlistSlice';
import { toast } from 'react-toastify';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const addItem = (product) => {
    dispatch(addToWishlist(product));
    toast.success(`${product.name} added to wishlist!`, {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const removeItem = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.info('Removed from wishlist', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const toggleItem = (product) => {
    const isInList = wishlistItems.some(item => item.id === product.id);
    dispatch(toggleWishlist(product));
    
    if (isInList) {
      toast.info('Removed from wishlist', {
        position: 'bottom-right',
        autoClose: 2000
      });
    } else {
      toast.success(`${product.name} added to wishlist!`, {
        position: 'bottom-right',
        autoClose: 2000
      });
    }
  };

  const clearAll = () => {
    dispatch(clearWishlist());
    toast.info('Wishlist cleared', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return {
    wishlistItems,
    addItem,
    removeItem,
    toggleItem,
    clearAll,
    isInWishlist
  };
};
