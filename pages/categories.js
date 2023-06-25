import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {

    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedCategory, setDeletedCategory] = useState(null);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    };

    async function saveCategory(event) {
        event.preventDefault();
        const data = {
            name, 
            parentCategory, 
            properties: properties.map(p => ({
                name:p.name, 
                values:p.values.split(','),
            })),
        };
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }
        setName('');
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    };

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setProperties(
            category.properties.map(({name, values}) => ({
                name,
                values: values.join(',')
            }))
        );
        if (!category.parent) {
            setParentCategory('');
        } else {
            setParentCategory(category.parent?._id);
        }
    };

    function confirmCategory(category) {
        setDeletedCategory(category);
        setDeleteModal(true);
    };

    async function deleteCategory() {
        await axios.delete('/api/categories?id='+ deletedCategory._id);
        setDeletedCategory(null);
        setDeleteModal(false);
        fetchCategories();
    };

    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }]
        })
    };

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    };

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    };

    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((property, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    };

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1 flex-wrap">
                    <input 
                    className="w-full"
                    type="text" 
                    placeholder="Category name" 
                    onChange={event => setName(event.target.value)}
                    value={name} />
                    <select className="w-full" onChange={(event) => setParentCategory(event.target.value)} value={parentCategory}>
                        <option value=''>
                            No parent category
                        </option>
                        {categories.length > 0 && categories.map((category) => (
                        <option value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button 
                    type='button' 
                    onClick={addProperty}
                    className="btn-default text-sm mb-2"
                    >Add new property</button>
                    {properties.length > 0 && properties.map((property, index) => (
                        <div className="flex gap-2 mb-2">
                            <input 
                            type="text" 
                            className="mb-0"
                            value={property.name}
                            onChange={event => handlePropertyNameChange(index, property, event.target.value)}
                            placeholder="Property name (example: Color)"/>
                            <input 
                                type="text" 
                                className="mb-0"
                                onChange={event => handlePropertyValuesChange(index, property, event.target.value)}
                                value={property.values} 
                                placeholder="Values, comma separated"/>
                            <button 
                                type='button'
                                onClick={() => removeProperty(index)} 
                                className="btn-default">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    {editedCategory && (
                        <button 
                            type="button" 
                            onClick={() => {
                                setEditedCategory(null);
                                setName('');
                                setParentCategory('');
                                setProperties([]);
                            }}
                            className="btn-default">
                            Cancel
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="btn-primary">
                        Save
                    </button>
                </div>
                

            </form>
            {!editedCategory && (
                <table className="tCategories basic mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map((category) => (
                    <tr>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <div className="flex gap-2">
                                <button 
                                onClick={() => editCategory(category)} 
                                className="tableLink">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                onClick={() => confirmCategory(category)}
                                className="tableLink">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
            {deleteModal && <div>
                    <div className="fixed inset-1/3 bg-white z-10 w-2/6 h-52 rounded-lg flex justify-center flex-col gap-4 px-8">
                        <h1>Delete Category</h1>
                        Are you sure you want to delete "{deletedCategory.name}"?
                        <div className="flex gap-12 w-full justify-between">
                            <button onClick={() => deleteCategory()} className="btn-red">Delete</button>
                            <button onClick={() => setDeleteModal(false)} className="btn-default">Cancel</button>
                        </div>
                        
                    </div>
                    <div 
                    onClick={() => setDeleteModal(false)}
                    className="fixed bg-gray-800 w-screen h-screen top-0 right-0 opacity-40 z-0">
                    </div>
            </div>}
        </Layout>
    );
};