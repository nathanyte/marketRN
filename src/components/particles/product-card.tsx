import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

interface ProductCardProps {
  imageSource: string;
  name: string;
  saleDate: string;
  price: string;
  marginLeft?: number;
  pending: boolean;
  onPress: () => void;
}

const ProductCard = ({
  imageSource,
  name,
  saleDate,
  price,
  marginLeft,
  pending,
  onPress,
}: ProductCardProps) => {
  const {width} = useWindowDimensions();
  const cardWidth = (width - 48) / 2;
  return (
    <TouchableOpacity
      disabled={pending}
      onPress={onPress}
      style={{...styles.productBox, width: cardWidth, marginLeft}}>
      <TouchableOpacity style={styles.trashIcon} onPress={() => {}}>
        <Image
          source={require('../../assets/trash.png')}
          style={styles.trashImage}
        />
      </TouchableOpacity>
      {pending ? (
        <>
          <View style={styles.imageSkeleton} />
          <View style={styles.productData}>
            <View style={styles.mediumTextSkeleton} />
            <View style={styles.smallTextSkeleton} />
            <View style={styles.bigTextSkeleton} />
            <View style={styles.smallTextSkeleton} />
            <View style={styles.bigTextSkeleton} />
          </View>
        </>
      ) : (
        <>
          <Image
            source={{uri: `data:image/jpeg;base64,${imageSource}`}}
            style={styles.images}
          />
          <View style={styles.productData}>
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productInfoTitle}>Preço:</Text>
            <Text style={styles.productPrice}>{price}</Text>
            <Text style={styles.productInfoTitle}>Data de venda:</Text>
            <Text style={styles.productSellDate}>{saleDate}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productBox: {
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D9D8DA',
  },
  images: {
    height: 122,
    width: 'auto',
  },
  productData: {
    paddingVertical: 12,
    paddingLeft: 12,
    borderTopColor: '#D9D8DA',
    borderTopWidth: 1,
  },
  productName: {
    fontSize: 16,
    color: 'black',
    marginBottom: 12,
    fontWeight: '700',
  },
  productInfoTitle: {
    marginBottom: 4,
    color: '#5F5B62',
    fontWeight: '400',
    fontSize: 14,
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
    marginBottom: 12,
    fontWeight: '700',
  },
  productSellDate: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  imageSkeleton: {
    height: 122,
    width: 'auto',
    backgroundColor: '#D9D8DA',
  },
  mediumTextSkeleton: {
    backgroundColor: '#D9D8DA',
    height: 12,
    width: '50%',
    borderRadius: 100,
    marginBottom: 12,
  },
  smallTextSkeleton: {
    backgroundColor: '#D9D8DA',
    height: 12,
    width: '40%',
    borderRadius: 100,
    marginBottom: 6,
  },
  bigTextSkeleton: {
    backgroundColor: '#D9D8DA',
    height: 12,
    width: '80%',
    borderRadius: 100,
    marginBottom: 10,
  },
  trashIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#D9D8DA',
    borderWidth: 1,
    borderColor: '#9F9BA1',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 4,
    right: 4.5,
    zIndex: 1,
  },
  trashImage: {
    height: 22,
    width: 22,
  },
});

export default ProductCard;
