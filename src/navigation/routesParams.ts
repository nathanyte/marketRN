import {NavigatorRoutes} from './routes';

export type AddProductRoutesParams = {
  itemId?: string;
};

export type RootStackParamList = {
  [NavigatorRoutes.HOME]: undefined;
  [NavigatorRoutes.ADD_PRODUCT]: AddProductRoutesParams;
};
