import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Input from '../particles/input';
import {useAppDispatch, useAppSelector} from '../../store';
import {getProducts} from '../../store/actions/products.actions';
import ProductCard from '../particles/product-card';
import {ProductType} from '../../store/types/products.types';
import {useNavigation} from '@react-navigation/native';

type FlatListProps = {
  item: ProductType;
  index: number;
};

const Home = () => {
  const dispatch = useAppDispatch();
  const {products, products_get_pending} = useAppSelector(
    state => state.products,
  );
  const [text, setText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const renderProducts = useCallback(
    (item: FlatListProps) => {
      return (
        <ProductCard
          onPress={() => {
            console.log(item.item);
          }}
          imageSource={item.item.image.file}
          marginLeft={item.index % 2 === 1 ? 16 : 0}
          name={item.item.name}
          saleDate={item.item.sale_date}
          price={item.item.price}
          pending={products_get_pending}
        />
      );
    },
    [products_get_pending],
  );

  const filtredData = useMemo(() => {
    if (text === '') {
      return products;
    }
    return products?.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );
  }, [products, text]);

  const handleAddNavigation = useCallback(() => {
    navigation.navigate('AddProduct');
  }, [navigation]);

  console.log(filtredData);

  const separator = () => <View style={styles.separator} />;
  return (
    <View style={styles.pageView}>
      <View style={styles.header}>
        <Text style={styles.pageName}>Produtos</Text>
        {products_get_pending ? (
          <View style={styles.productsLengthSkeleton} />
        ) : (
          <Text style={styles.productsLength}>
            {filtredData?.length} produtos
          </Text>
        )}
      </View>
      <View style={styles.inputBox}>
        <Input
          placeholder="Buscar produto"
          onChangeText={(e: string) => setText(e)}
          value={text}
          isSearch
        />
        <TouchableOpacity
          onPress={handleAddNavigation}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.crossCircle,
            opacity: products_get_pending ? 0.4 : 1,
          }}>
          <Image
            source={require('../../assets/cross.png')}
            width={16}
            height={16}
          />
        </TouchableOpacity>
      </View>
      {filtredData?.length === 0 && (
        <View style={styles.emptyResult}>
          <Image
            source={require('../../assets/package.png')}
            style={styles.package}
          />
          <Text style={styles.emptyResultText}>Nenhum produto encontrado.</Text>
        </View>
      )}
      <FlatList
        ItemSeparatorComponent={separator}
        data={filtredData}
        numColumns={2}
        keyExtractor={i => i.id}
        renderItem={renderProducts}
      />
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
  pageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A181B',
  },
  productsLength: {
    fontSize: 12,
    color: '#3E3A40',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  crossCircle: {
    backgroundColor: '#034748',
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  separator: {
    height: 16,
  },
  productsLengthSkeleton: {
    backgroundColor: '#D9D8DA',
    height: 12,
    width: 80,
    borderRadius: 100,
  },
  emptyResult: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: '#D9D8DA',
    borderRadius: 6,
  },
  emptyResultText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#3E3A40',
    marginLeft: 16,
  },
  package: {
    height: 18,
    width: 18,
  },
});

export default Home;
