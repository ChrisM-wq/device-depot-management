import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductForm({
    _id, 
    title: exisingTitle, 
    description: exisingDescription, 
    price:exisingPrice, images, 
    category:exisingCategory,
    properties: exisingProperties
}) {

    const [title, setTitle] = useState(exisingTitle || '');
    const [category, setCategory] = useState(exisingCategory || '');
    const [productProperties, setProductProperties] = useState(exisingProperties || {});
    const [description, setDescription] = useState(exisingDescription || '');
    const [price, setPrice] = useState(exisingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [categories, setCategories] = useState([]);

    const router = useRouter();
    
    // Get the categories
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }, []);

    // Save new/updated product
    async function saveProduct(event) {
        event.preventDefault();
        const data = { 
            title, 
            description, 
            price, 
            category, 
            properties: productProperties,
        };
        if (_id) {
            await axios.put('/api/products', { _id, ...data });
        } else {
            await axios.post('/api/products', data); 
        };
        setGoToProducts(true);
    }

    // Redirect to /products
    if (goToProducts) router.push('/products');

    // Upload Image to API handler
    async function uploadImages(event) {
        const files = event.target?.files;
        if (files.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data, {
                headers: {"Content-Type": 'multipart/form-data'}
            });
            console.log(res.data);
        };
    };

    // Save updates to product properties
    function changeProductProperties(propertyName, value) {
        setProductProperties(prev => {
            const newProductProperties =  { ...prev };
            newProductProperties[propertyName] = value;
            return newProductProperties;
        });
    };

    // Checks properties from category and all parent categories
    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let categoryInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...categoryInfo.properties);
        while (categoryInfo?.parent?._id) {
            const parentCategory = categories.find(({ _id }) => _id === categoryInfo?.parent?._id);
            propertiesToFill.push(...parentCategory.properties);
            categoryInfo = parentCategory;
        };
    };

    return (
        <>
            <form onSubmit={saveProduct} className="flex flex-col">

                {/* Name */}
                <label htmlFor="name">Product name</label>
                <input 
                    id='name' 
                    type={'text'} 
                    placeholder="Product name" 
                    value={title} 
                    onChange={(event) => setTitle(event.target.value)}/>

                {/* Categories */}
                <label>Category</label>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Properties */}
                {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                    <div>
                        <label>{p.name}</label>
                        <div>
                            <select 
                                className="w-full"
                                value={productProperties[p.name]}
                                onChange={(event) => changeProductProperties(p.name, event.target.value)}>
                                {p.values.map(v => (
                                    <option value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                ))}

                {/* Photos */}
                <label>Photos</label>
                <div className="mb-2">
                    <label className="w-24 h-24 cursor-pointer border bg-gray-200 text-center flex flex-col items-center justify-center gap-1 text-sm rounded-lg bg-white text-gray-600 shadow-sm">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            class="w-6 h-6">
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload
                        </div>
                        <input 
                            type='file' 
                            onChange={uploadImages} 
                            className="hidden"/>
                    </label>
                    {!images?.length && (
                        <div>No photos in this product</div>
                    )}
                </div>

                {/* Description */}
                <label htmlFor="description">Description</label>
                <textarea 
                    id='description' 
                    placeholder="Description" 
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}>   
                </textarea>

                {/* Price */}
                <label htmlFor="price">Price</label>
                <input 
                    id='price' 
                    type={'number'} 
                    placeholder="Price" 
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}/>

                {/* Submit */}
                <button type={'submit'} className="btn-primary w-fit">Save</button>

            </form>
        </>
    )
};