import {AppThunk} from '..';
import api from '../../services/api';
import {
  EditProductType,
  ProductsActionsTypes,
  SaveProductType,
} from '../types/products.types';

const idCandidato = 2028;

export const getProducts = (): AppThunk => async dispatch => {
  dispatch({
    type: ProductsActionsTypes.GET_PRODUCTS,
  });
  try {
    const response = await api.get(
      `/getAllProducts.php?idcandidato=${idCandidato}`,
    );
    dispatch({
      type: ProductsActionsTypes.GET_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: ProductsActionsTypes.GET_PRODUCTS_FAILURE,
    });
  }
};

export const saveProduct =
  (product: SaveProductType, onSuccessCallback: () => void): AppThunk =>
  async dispatch => {
    dispatch({
      type: ProductsActionsTypes.SAVE_PRODUCT,
    });
    try {
      await api.post('/saveProduct.php', product);
      dispatch({
        type: ProductsActionsTypes.SAVE_PRODUCT_SUCCESS,
      });
      onSuccessCallback?.();
    } catch (e) {
      dispatch({
        type: ProductsActionsTypes.SAVE_PRODUCT_FAILURE,
      });
    }
  };

export const deleteProduct =
  (id: string, onSuccessCallback: () => void): AppThunk =>
  async dispatch => {
    dispatch({
      type: ProductsActionsTypes.DELETE_PRODUCT,
    });
    try {
      await api.delete(
        `/deleteProduct.php?idcandidato=${idCandidato}&idproduto=${id}`,
      );
      dispatch({
        type: ProductsActionsTypes.DELETE_PRODUCT_SUCCESS,
      });
      onSuccessCallback?.();
    } catch (e) {
      dispatch({
        type: ProductsActionsTypes.DELETE_PRODUCT_FAILURE,
      });
    }
  };

export const editProduct =
  (product: EditProductType, onSuccessCallback: () => void): AppThunk =>
  async dispatch => {
    dispatch({
      type: ProductsActionsTypes.EDIT_PRODUCT,
    });
    try {
      await api.post('setEditProduct.php ', product);
      dispatch({
        type: ProductsActionsTypes.EDIT_PRODUCT_SUCCESS,
      });
      onSuccessCallback?.();
    } catch (e) {
      dispatch({
        type: ProductsActionsTypes.EDIT_PRODUCT_FAILURE,
      });
    }
  };
