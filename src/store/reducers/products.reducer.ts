import {
  ProductsActionsTypes,
  ProductsPayloadTypes,
  ProductsState,
} from '../types/products.types';

const INITIAL_STATE: ProductsState = {
  products: null,
  products_get_pending: false,
  products_get_id_pending: false,

  save_product_pending: false,
  delete_product_pending: false,
  edit_product_pending: false,

  product_edit: null,
  product_edit_pending: false,
};

const ProductsReducer = (
  state = INITIAL_STATE,
  action: ProductsPayloadTypes,
): ProductsState => {
  switch (action.type) {
    case ProductsActionsTypes.GET_PRODUCTS:
      return {
        ...state,
        products_get_pending: true,
      };
    case ProductsActionsTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        products_get_pending: false,
      };
    case ProductsActionsTypes.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products_get_pending: false,
      };
    case ProductsActionsTypes.GET_PRODUCT_BY_ID:
      return {
        ...state,
        products_get_id_pending: true,
      };
    case ProductsActionsTypes.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product_edit: action.payload,
        products_get_id_pending: false,
      };
    case ProductsActionsTypes.GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        products_get_id_pending: false,
      };
    case ProductsActionsTypes.SAVE_PRODUCT:
      return {
        ...state,
        save_product_pending: true,
      };
    case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        save_product_pending: false,
      };
    case ProductsActionsTypes.SAVE_PRODUCT_FAILURE:
      return {
        ...state,
        save_product_pending: false,
      };
    case ProductsActionsTypes.DELETE_PRODUCT:
      return {
        ...state,
        delete_product_pending: true,
      };
    case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        delete_product_pending: false,
      };
    case ProductsActionsTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        delete_product_pending: false,
      };
    case ProductsActionsTypes.EDIT_PRODUCT:
      return {
        ...state,
        edit_product_pending: true,
      };
    case ProductsActionsTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        edit_product_pending: false,
      };
    case ProductsActionsTypes.EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        edit_product_pending: false,
      };
    default: {
      return state;
    }
  }
};

export default ProductsReducer;
