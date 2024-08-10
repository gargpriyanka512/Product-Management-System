import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../service/product.service';

const EditProduct = () => {
    const [product, setProduct] = useState({
        id: "",
        productName: "",
        description: "",
        price: "",
        status: "",
    });

    const navigate = useNavigate(); 
    const { id } = useParams();
    console.log(id);

    const [msg, setMsg] = useState("");

    useEffect(() => {
        ProductService.getProductById(id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    };

    const ProductUpdate = (e) => {
        e.preventDefault();

        ProductService
            .editProduct(product)
            .then((res) => {
                navigate("/"); // Navigate to home after successful update
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card'>
                            <div className="card-header fs-3 text-center">
                                Edit Product
                            </div>
                            {msg && <p className='fs-4 text-center text-success'>{msg}</p>}
                            <div className='card-body'>
                                <form onSubmit={ProductUpdate}>
                                    <div className='mb-3'>
                                        <label>Enter Product Name</label>
                                        <input type="text" name="productName" className="form-control" onChange={handleChange} value={product.productName} />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter Description</label>
                                        <input type="text" name="description" className="form-control" onChange={handleChange} value={product.description} />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter Price</label>
                                        <input type="text" name="price" className="form-control" onChange={handleChange} value={product.price} />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter Status</label>
                                        <input type="text" name="status" className="form-control" onChange={handleChange} value={product.status} />
                                    </div>
                                    <button className="btn btn-primary col-md-12">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
