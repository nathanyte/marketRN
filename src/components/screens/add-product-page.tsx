import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch, useAppSelector} from '../../store';
import {
  editProduct,
  getProductById,
  getProducts,
  saveProduct,
} from '../../store/actions/products.actions';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/routesParams';
import {NavigatorRoutes} from '../../navigation/routes';
import MaskInput, {Masks} from 'react-native-mask-input';

const schema = yup
  .object({
    name: yup.string().required(),
    value: yup.string().required(),
    sellDate: yup.string().required(),
    image: yup.string().required(),
  })
  .required();

type FormData = {
  name: string;
  value: string;
  sellDate: string;
  image: string;
};

type AddProductProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorRoutes.ADD_PRODUCT
>;

const AddProduct = ({route}: AddProductProps) => {
  const {itemId} = route.params || '';
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {edit_product_pending, product_edit} = useAppSelector(
    state => state.products,
  );
  const [image, setImage] = useState<string | null | undefined>(null);
  const buttonWidth = width - 32;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: itemId ? product_edit?.name : '',
      value: itemId ? product_edit?.price : '',
      sellDate: itemId ? product_edit?.sale_date : '',
      image: itemId ? product_edit?.image.file : '',
    },
  });

  useEffect(() => {
    if (itemId) {
      setImage(product_edit?.image.file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = (data: any) => {
    const productData = {
      name: data.name,
      image: data.image,
      price: data.value,
      sale_date: data.sellDate,
    };
    console.log({data});
    if (itemId) {
      dispatch(
        editProduct(productData, () => {
          dispatch(getProducts());
          navigation.navigate(NavigatorRoutes.HOME);
        }),
      );
    } else {
      dispatch(
        saveProduct(productData, () => {
          dispatch(getProducts());
          navigation.navigate(NavigatorRoutes.HOME);
        }),
      );
    }
  };

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          return console.log('User cancelled image picker');
        } else if (response.errorCode || response.errorMessage) {
          return console.log('ImagePicker Error: ');
        } else if (response.assets !== undefined) {
          return setImage(response.assets[0].base64);
        }
      },
    );
  };

  return (
    <View style={styles.pageView}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require('../../assets/vector-left.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adicionar produto</Text>
        <View />
      </View>
      <Text style={styles.addTitle}>Nome do produto</Text>
      <View style={styles.textInputBox}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              maxLength={40}
              placeholder="Nome do produto"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
      </View>
      {errors.name && <Text>This is required.</Text>}
      <View style={styles.spacing} />
      <Text style={styles.addTitle}>Valor</Text>
      <View style={styles.textInputBox}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <MaskInput
              mask={Masks.BRL_CURRENCY}
              keyboardType="numeric"
              placeholder="Valor"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="value"
        />
      </View>
      {errors.name && <Text>This is required.</Text>}
      <View style={styles.spacing} />
      <Text style={styles.addTitle}>Data de venda</Text>
      <View />
      <View style={styles.textInputBox}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <MaskInput
              keyboardType="number-pad"
              mask={Masks.DATE_MMDDYYYY}
              placeholder="Data de venda"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="sellDate"
        />
      </View>
      {errors.name && <Text>This is required.</Text>}
      <View style={styles.spacing} />
      <View style={styles.spacing} />
      <View style={styles.picBox}>
        <View style={styles.photoHeader}>
          <Text style={styles.productPicText}>Foto do produto</Text>
          <View style={styles.accessDataButtons}>
            <TouchableOpacity
              style={styles.accessDataClip}
              onPress={openImagePicker}>
              <Image
                source={require('../../assets/clip.png')}
                style={styles.clipImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accessDataCamera}
              onPress={() => {}}>
              <Image
                source={require('../../assets/camera.png')}
                style={styles.cameraImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.defaultImageBox}>
          {image !== '' ? (
            <Image
              source={{uri: `data:image/jpeg;base64,${image}`}}
              style={styles.image64}
            />
          ) : (
            <Image
              source={require('../../assets/default-image.png')}
              style={styles.defaultImage}
            />
          )}
        </View>
      </View>
      <View style={styles.spacing} />
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{...styles.addProduct, width: buttonWidth}}>
        <Text style={styles.buttonText}>
          {itemId ? 'Editar Produto' : 'Adicionar Produto'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#EDECEE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 10,
    height: 16,
  },
  headerText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
  addTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
    color: 'black',
  },
  textInputBox: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#D9D8DA',
    backgroundColor: 'white',
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacing: {
    height: 16,
  },
  picBox: {
    height: 385,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#D9D8DA',
    backgroundColor: 'white',
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D8DA',
  },
  productPicText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  accessDataClip: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#D9D8DA',
    borderWidth: 1,
    borderColor: '#9F9BA1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessDataCamera: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#D9D8DA',
    borderWidth: 1,
    borderColor: '#9F9BA1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessDataButtons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  clipImage: {
    height: 17,
    width: 16,
  },
  cameraImage: {
    height: 22,
    width: 22,
  },
  addProduct: {
    backgroundColor: '#034748',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 343,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  defaultImageBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
  },
  defaultImage: {
    height: 128,
    width: 176,
  },
  image64: {
    height: 335,
    width: '100%',
  },
});

export default AddProduct;
