import axios from 'axios';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Layout from '../../components/Layout';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [countInStock, setCountInStock] = useState();

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
  console.log('imageSrc', imageSrc);
  console.log('uploadData', uploadData);

  const addProducts = async (e) => {
    e.preventDefault();
    try {
      //   const mediaURL = await imageUpload();
      const { data } = await axios.post(`/api/products`, {
        name,
        slug,
        brand,
        category,
        price,
        image: imageSrc,
        description,
        countInStock,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex ">
          <AdminLayout></AdminLayout>

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
            </p>

            <img src={imageSrc} />

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
          <form>
            {/* <img src={image ? URL.createObjectURL(image) : ''} /> */}
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
              <div
                className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md 
        "
              >
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Add Product
                </div>

                <div className="mt-10">
                  <form action="#">
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="name"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        Name:
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i className="fas fa-user text-blue-500"></i>
                        </div>

                        <input
                          id="name"
                          type="name"
                          name="name"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="flex flex-col mb-5">
                  <label
                    htmlFor="image"
                    className="mb-1 text-xs tracking-wide text-gray-600"
                  >
                    Image
                  </label>
                  <div className="relative">
                    <div
                      className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                    >
                      <i className="fas fa-user text-blue-500"></i>
                    </div>

                    <input
                      id="image"
                      type="file"
                      name="image"
                      className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                      placeholder="Upload image"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div> */}
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="category"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        Category
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                          id="category"
                          type="category"
                          name="category"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="price"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        Price
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                          id="price"
                          type="price"
                          name="price"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="slug"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        Slug
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                          id="slug"
                          type="slug"
                          name="slug"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your slug"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="countInStock"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        Stock
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                          id="countInStock"
                          type="countInStock"
                          name="countInStock"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your stocks"
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="brand"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        Brand
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                          id="brand"
                          type="brand"
                          name="brand"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your brand"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-6">
                      <label
                        htmlFor="description"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >
                        Description
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <span>
                            <i className="fas fa-lock text-blue-500"></i>
                          </span>
                        </div>

                        <input
                          id="description"
                          type="description"
                          name="description"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex w-full">
                      <button
                        // type="submit"
                        className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                        onClick={addProducts}
                      >
                        <span className="mr-2 uppercase">Add</span>
                        <span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex justify-center items-center mt-6">
                <a
                  href="#"
                  target="_blank"
                  className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
                ></a>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
