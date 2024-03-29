import React, { useEffect, useState } from 'react'
import CoinCard from './CoinCard'
import CurrencyFormat from 'react-currency-format';
import Title from './Title';
import SkeletonLoad from './SkeletonLoad';
import {useGetCryptosQuery} from '../Reducer/cryptoApi';
import { useGetNewsQuery } from '../Reducer/newsApi';
import NewsCard from './NewsCard';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
    Title("cryptomania | home")

    const {data: result, isFetching} = useGetCryptosQuery(200)
    const {data: high} = useGetCryptosQuery(200)
    const {data: low} = useGetCryptosQuery(200)

    let {data:newsresult ,isFetching:newsFetching } = useGetNewsQuery({ type:"crypto", count:10 })

    let priceBtc = result && result.filter(results => results.symbol.toLowerCase().includes("btc"))

    let highSort =  high && high.slice().sort((a, b) => b['price_change_percentage_24h'] - a['price_change_percentage_24h'])
    let lowSort =  low?.slice().sort((a, b) =>  a['price_change_percentage_24h'] - b['price_change_percentage_24h'] )    
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000
      };

    return (
         <div className="container md:mx-auto mt-5 md:mb-10 px-3 py-5 overflow-x-hidden mb-20">
           <div className="mx-auto w-full md:w-5/6 px-4 py-5 border rounded-md bg-green-500 text-white">
            <h2 className=" font-bold text-center text-xl lg:text-3xl">Selamat Datang Di CryptoMania</h2>
                <p className=" font-semibold text-center text-base lg:text-xl mt-2">Harga BTC hari ini : <CurrencyFormat value={result && priceBtc[0].current_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></p>
           </div>

        <Slider {...settings} className="w-full md:w-5/6 lg:w-full mx-auto mb-0 cursor-pointer ">
        <div>
        <div className="w-full lg:w-5/6 mx-auto px-1 md:px-4 py-5 border rounded-md bg-green-500 text-white mt-10 relative z-10">
           <h2 className=" font-bold text-center text-base lg:text-2xl mb-3">Top 5 high change price</h2>

            <div className="w-full lg:w-5/6 mx-auto mt-6 rounded-md  bg-white px-2 md:px-4 py-3">
                {
                    isFetching && <SkeletonLoad limit={6} />
                }

                {
                    result && highSort.slice(0,5).map((datas) => (
                        <CoinCard key={datas.id} id={datas.id} image={datas.image} rank={datas.market_cap_rank} name={datas.name} symbol={datas.symbol} price={datas.current_price} priceChange={datas.price_change_percentage_24h} volume={datas.total_volume}/>
                    ))
                }
            </div>
        </div>
        </div>
          <div>
          <div className="w-full lg:w-5/6 mx-auto px-1 md:px-4 py-5 border rounded-md bg-green-500 text-white mt-10">
           <h2 className=" font-bold text-center text-base lg:text-2xl mb-3">Top 5 minus change price</h2>

            <div className="w-full lg:w-5/6 mx-auto mt-6 rounded-md  bg-white px-2 md:px-4 py-3">
                {
                    isFetching && <SkeletonLoad limit={6} />
                }

                {
                    result && lowSort.slice(0,5).map((datas) => (
                        <CoinCard key={datas.id} id={datas.id} image={datas.image} rank={datas.market_cap_rank} name={datas.name} symbol={datas.symbol} price={datas.current_price} priceChange={datas.price_change_percentage_24h} volume={datas.total_volume}/>
                    ))
                }
            </div>
        </div>
        </div>
        </Slider>
                
        <div className="flex mx-auto w-full md:w-5/6  flex-wrap mt-16 rounded-md bg-green-500 px-4 py-3 text-white flex-col ">
            <h2 className=" font-bold text-center text-base lg:text-2xl mb-3">latest news</h2>

            {
                newsFetching && 
                <SkeletonLoad limit={4} image={false} />
            }
            {
                newsresult && newsresult["value"].map(newsres => (
                <NewsCard key={newsres.url} title={newsres.name} desc={newsres.description} url={newsres.url} creator={newsres["provider"][0]["name"]} img={newsres.thumbnail}  date={newsres.datePublished}/>
                ))
            }
        </div>

          
        {/* <div className="w-full lg:w-5/6 mx-auto px-1 md:px-4 py-5 border rounded-md bg-green-500 text-white mt-10">
        <h2 className=" font-bold text-center text-base lg:text-2xl mb-3">Top 5 high change price</h2>

            <div className="w-full lg:w-5/6 mx-auto mt-6 rounded-md  bg-white px-4 py-3">
                {
                    isFetching && <SkeletonLoad limit={6} />
                }

                {
                    result && highSort.slice(0,5).map((datas) => (
                        <CoinCard key={datas.id} id={datas.id} image={datas.image} rank={datas.market_cap_rank} name={datas.name} symbol={datas.symbol} price={datas.current_price} priceChange={datas.price_change_percentage_24h} volume={datas.total_volume}/>
                    ))
                }
            </div>
        </div>
        <div className="w-full lg:w-5/6 mx-auto px-1 md:px-4 py-5 border rounded-md bg-green-500 text-white mt-10">
        <h2 className=" font-bold text-center text-base lg:text-2xl mb-3">Top 5 minus change price</h2>

            <div className="w-full lg:w-5/6 mx-auto mt-6 rounded-md  bg-white px-4 py-3">
                {
                    isFetching && <SkeletonLoad limit={6} />
                }

                {
                    result && lowSort.slice(0,5).map((datas) => (
                        <CoinCard key={datas.id} id={datas.id} image={datas.image} rank={datas.market_cap_rank} name={datas.name} symbol={datas.symbol} price={datas.current_price} priceChange={datas.price_change_percentage_24h} volume={datas.total_volume}/>
                    ))
                }
            </div>
        </div> */}

        </div>
    )
}

export default Home
