import React, {useCallback, useState} from 'react';
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

type FormData = {
  name: string;
  value: string;
  sellDate: string;
  image: string | null;
};

const AddProduct = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [image, setImage] = useState<string | null | undefined>(null);
  const buttonWidth = width - 32;
  console.log(image);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = (data: any) => console.log(data);

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
            <TextInput
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
            <TextInput
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
      </View>
      <View style={styles.spacing} />
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{...styles.addProduct, width: buttonWidth}}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
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
});

export default AddProduct;
