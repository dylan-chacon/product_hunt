import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../firebase';
import Product from '../components/layout/Product';

const Search = () => {
    const router = useRouter();
    const { query: { q } } = router;

    // state
    const [products, setProducts] = useState([]);
    const [result, setResult] = useState([]);

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
    }, []);

    useEffect(() => {
        const search = q.toLowerCase();
        const searched = products.filter(p => p.name.toLowerCase().includes(search));
        setResult(searched);
    }, [q, products]);

    return (
        <div>
            <Layout>
                <div className="listado-productos">
                <div className="contenedor">
                    <ul className="bg-white">
                    {result.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                    </ul>
                </div>
                </div>
            </Layout>
        </div>
    );
}
 
export default Search;
