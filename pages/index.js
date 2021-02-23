import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { FirebaseContext } from '../firebase';
import Product from '../components/layout/Product';

export default function Home() {
  // state
  const [products, setProducts] = useState([]);

  //context
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      firebase.db.collection('products').orderBy('createdAt', 'desc').get()
        .then((snapshot) => {
          const products = [];
          snapshot.forEach((doc) => {
            const product = {
              ...doc.data(),
              id: doc.id,
            };
            products.push(product);
          });
          setProducts(products);
        });
    }
    getProducts();
  }, [])

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {products.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
