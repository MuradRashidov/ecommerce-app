"use client"
import ProductImage from "@/components/ProductImage";
//import ProductImage from "@/components/ProductImage";
import { Dialog } from "@headlessui/react";
import {StarIcon as StarIconOutline} from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useParams,useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
function Modal() {
    let [isOpen,setIsOpen] = useState(true)
    const id = useParams().id;
    const [product,setProduct] = useState<Product>()
    const router = useRouter();
    useEffect(()=>{
        async function fetchProduct(){
          let res = await fetch(`https://fakestoreapi.com/products/${id}`);
          let product = await res.json();
          console.log(product)

          setProduct(product);

        }
        fetchProduct()
    },[]);
    console.log(product?.rating.rate)
  return (
    <div>
         <Dialog open={isOpen} className="relative z-10" onClose={()=>setIsOpen(false)}>
         <div className="fixed inset-0 bg-black/30" aria-hidden="true" >

         <div className="flex min-h-full items-center justify-center p-4 text-center p-4">
         <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
                   <div className="flex gap-x-8 h-96">
                    {product?.image && (
                      <div className="relative w-72 h-full hidden md:inline">            
                         <ProductImage product={product} fill></ProductImage>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <h4 className="font-semibold">{product?.title}</h4>
                        <p className="font-medium text-sm">${product?.price}</p>
                        <div className="flex items-center text-sm my-4">
                          <p>{product?.rating?.rate}</p>
                          {
                            product?.rating?.rate && (
                              <div className="flex item-center mr-2 ml-5">
                                {
                                  Array.from({
                                    length:Math.floor(product?.rating.rate)},
                                    (_,i)=>(
                                      <StarIcon
                                       key={i}
                                       className="h-4 w-4 text-yellow-500"
                                       
                                       >

                                      </StarIcon>
                                    )
                                    )
                                }
                                {
                                  Array.from({
                                    length:5 - Math.floor(product?.rating.rate)},
                                    (_,i)=>(
                                      <StarIconOutline
                                       key={i}
                                       className="h-4 w-4 text-yellow-500"
                                       
                                       >

                                      </StarIconOutline>
                                    )
                                    )
                                }
                                 
                              </div>
                            )
                          }
                          <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                                   See all {product?.rating.count} reviews
                                 </p>
                          
                        </div>
                        <p className="line-clamp-5 text-sm">
                          {product?.description}
                        </p>
                      </div>
                      <div className="space-y-3 text-sm">
                    <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                      Add to bag
                    </button>
                    <Link href={`/product/${product?.id}`}>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                    >
                      View full details
                    </button>
                    </Link>
                  </div>
                    </div>
                   </div>
                  </Dialog.Panel>
         </div>
         </div>
         </Dialog>
    </div>
    
  )
}

export default Modal