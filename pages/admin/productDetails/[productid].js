import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import Product from '../../../models/Product';
import db from '../../../utils/db';

export default function Update(props) {
  const { product } = props;
  console.log('product', product);

  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const [rating, setRating] = useState(product.rating);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(`/api/products/${product._id}`, {
        name,
        slug,
        category,

        price,
        brand,
        rating,

        countInStock,
        description,
      });
    } catch (err) {
      alert(err);
    }
  };

  const submitImageHandler = async (e) => {
    e.preventDefault();
    try {
      //   console.log("imageSrcp",imageSrc)
      const { data } = await axios.put(`/api/products/${product._id}`, {
        image: imageSrc,
      });
    } catch (err) {
      alert(err);
    }
  };
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/nextstoredata/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }
  return (
    <>
      <Layout>
        <div className="flex flex-col mt-8">
          <Link href="/admin">
            <a className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded d-inline">
              Back to Dashboard
            </a>
          </Link>
          <div className="flex">
            <div className="w-2/3 px-4 py-2 bg-gray-200 ">
              <h3 className="text-2xl text-black font-bold">Product Details</h3>
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-700 shadow sm:rounded-lg">
                <form className="min-w-full my-4" onSubmit={submitHandler}>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="name"
                      >
                        Product Name:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="slug"
                      >
                        Slug:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="slug"
                        name="slug"
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <select
                    className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="grid-state"
                    name="category"
                    onChange={(e)=>e.target.value}>
                    <option>Select Category</option>
                    {categories.map(item => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select> */}
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Category:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="brand"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Brand:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="brand"
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Price:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Count In Stock:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="countInStock"
                        onChange={(e) => setCountInStock(e.target.value)}
                        value={countInStock}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Rating:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="rating"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Description:
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <textarea
                        className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center">
                    <div className="md:w-1/3" />
                    <div className="md:w-2/3">
                      <button
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <form
              method="post"
              onChange={handleOnChange}
              onSubmit={handleOnSubmit}
            >
              <p>
                <input type="file" name="file" />
                <button type="submit" className=" bg-green-600 ">
                  Upload Files
                </button>
                <button className=" bg-cyan-600 " onClick={submitImageHandler}>
                  Save Image
                </button>
              </p>

              <img src={product.image} alt="image" />

              {/* {imageSrc && !uploadData && (
                                    <p>
                                      <button type='submit'>Upload Files</button>
                                    </p>
                                  )} */}

              {uploadData && (
                <code>
                  <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                </code>
              )}
            </form>

            {/* <div className="w-1/3 py-2 my-2 mx-auto overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ">
                    <div className="container  mx-auto">
                      <h1 className="text-2xl text-center  text-black font-bold">
                        This will be image
                       </h1>
                        <div className="w-full rounded"></div>
                      </div>
            */}
            {/* <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                              <label
                                className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="inline-full-name"
                              >
                                Image:
                              </label>
                            </div>
                            <div className="md:w-2/3">
                              <input
                                className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="file"
                                name="image"
                                value={product.image}
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                            </div> */}
            {/* <div className="flex ">
              <button
                // disabled={!imageFile}
                // onClick={handleUpdateImage}
                className="shadow mx-auto bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Update Image
              </button>
            </div> */}

            {/* </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const { productid } = params;
  console.log('productid', productid);
  await db.connect();
  const product = await Product.findById(productid).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
