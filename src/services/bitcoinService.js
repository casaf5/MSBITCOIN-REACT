import axios from 'axios'
export const bitcoinService={
    getRate,
    getMarketPrice,
    getAvgBlockSize,
    getTradeData,
}

async function getRate(amount){
    const rate=await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${amount}`)
    return rate.data    
}

async function getMarketPrice(){
    const marketData=await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
    const chartData= marketData.data.values.map(dayPrice=>dayPrice.y)
    return chartData
}

async function getAvgBlockSize(){
    const marketData=await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
    const chartData= marketData.data.values.map(dayPrice=>dayPrice.y)
    return chartData
}
async function getTradeData(){
    const marketData=await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
    const chartData= marketData.data.values.map(dayPrice=>dayPrice.y)
    return chartData
}