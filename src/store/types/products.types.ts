export enum ProductsActionsTypes {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE',

  SAVE_PRODUCT = 'SAVE_PRODUCT',
  SAVE_PRODUCT_SUCCESS = 'SAVE_PRODUCT_SUCCESS',
  SAVE_PRODUCT_FAILURE = 'SAVE_PRODUCT_FAILURE',

  DELETE_PRODUCT = 'DELETE_PRODUCT',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE',

  EDIT_PRODUCT = 'EDIT_PRODUCT',
  EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
  EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE',
}

export type ProductType = {
  id: string;
  image: {
    extension: string;
    file: string;
  };
  name: string;
  sale_date: string;
  price: string;
};

export type SaveProductType = {
  name: string;
  image: string;
  price: string;
  sale_date: string;
  idCandidato: string;
};

export type EditProductType = {
  id: string;
  name: string;
  image: string;
  price: string;
  sale_date: string;
  idCandidato: string;
};

export type ProductsState = {
  products: ProductType[] | null;
  products_get_pending: boolean;

  save_product_pending: boolean;
  delete_product_pending: boolean;
  edit_product_pending: boolean;
};

type GetProductsAction = {
  type: ProductsActionsTypes.GET_PRODUCTS;
  payload: never;
};

type GetProductsSuccessAction = {
  type: ProductsActionsTypes.GET_PRODUCTS_SUCCESS;
  payload: ProductType[];
};

type GetProductsFailureAction = {
  type: ProductsActionsTypes.GET_PRODUCTS_FAILURE;
  payload: never;
};

type SaveProductAction = {
  type: ProductsActionsTypes.SAVE_PRODUCT;
  payload: never;
};

type SaveProductSuccessAction = {
  type: ProductsActionsTypes.SAVE_PRODUCT_SUCCESS;
  payload: never;
};

type SaveProductFailureAction = {
  type: ProductsActionsTypes.SAVE_PRODUCT_FAILURE;
  payload: never;
};

type DeleteProductAction = {
  type: ProductsActionsTypes.DELETE_PRODUCT;
  payload: never;
};

type DeleteProductSuccessAction = {
  type: ProductsActionsTypes.DELETE_PRODUCT_SUCCESS;
  payload: never;
};

type DeleteProductFailureAction = {
  type: ProductsActionsTypes.DELETE_PRODUCT_FAILURE;
  payload: never;
};
type EditProductAction = {
  type: ProductsActionsTypes.EDIT_PRODUCT;
  payload: never;
};

type EditProductSuccessAction = {
  type: ProductsActionsTypes.EDIT_PRODUCT_SUCCESS;
  payload: never;
};

type EditProductFailureAction = {
  type: ProductsActionsTypes.EDIT_PRODUCT_FAILURE;
  payload: never;
};

export type ProductsPayloadTypes =
  | GetProductsAction
  | GetProductsSuccessAction
  | GetProductsFailureAction
  | SaveProductAction
  | SaveProductSuccessAction
  | SaveProductFailureAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | DeleteProductFailureAction
  | EditProductAction
  | EditProductSuccessAction
  | EditProductFailureAction;
