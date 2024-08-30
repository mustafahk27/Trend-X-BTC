import requests
import pandas as pd
from datetime import datetime
import hmac
import hashlib
import time
import configparser
import os
from datetime import datetime, timedelta
from config import Binance_api_key, Binance_secret_key, News_sentiment_api_key
# Initialize the config parser



# Your API key and secret key from Binance
API_KEY = Binance_api_key
SECRET_KEY = Binance_secret_key
print(API_KEY)
print(SECRET_KEY)
print(News_sentiment_api_key)
# Base URL for Binance API
BASE_URL = 'https://api.binance.com'

# Function to fetch historical data (e.g., last 1000 1-minute candles)
def fetch_historical_data(symbol='BTCUSDT', interval='1m', limit=1000):
    endpoint = f'/api/v3/klines'
    params = {
        'symbol': symbol,
        'interval': interval,
        'limit': limit
    }
    url = BASE_URL + endpoint
    response = requests.get(url, params=params)
    data = response.json()

    df = pd.DataFrame(data, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume', 
                                     'close_time', 'quote_asset_volume', 'number_of_trades', 
                                     'taker_buy_base_asset_volume', 'taker_buy_quote_asset_volume', 'ignore'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    return df[['timestamp', 'open', 'high', 'low', 'close', 'volume']]

# Function to fetch real-time data (24hr ticker price change statistics)
def fetch_real_time_data(symbol='BTCUSDT'):
    endpoint = '/api/v3/ticker/24hr'
    params = {'symbol': symbol}
    url = BASE_URL + endpoint
    response = requests.get(url, params=params)
    data = response.json()

    df = pd.DataFrame([{
        'timestamp': datetime.now(),
        'symbol': symbol,
        'last_price': data['lastPrice'],
        'price_change': data['priceChange'],
        'price_change_percent': data['priceChangePercent'],
        'volume': data['volume'],
        'quote_volume': data['quoteVolume'],
        'high_price': data['highPrice'],
        'low_price': data['lowPrice'],
        'bid_price': data['bidPrice'],
        'ask_price': data['askPrice']
    }])
    return df


def get_news_sentiment(api_key, tickers=None, topics=None):
    # Define the base URL for the API request
    base_url = "https://www.alphavantage.co/query"
    
    # Set the function parameter for the API request
    function = "NEWS_SENTIMENT"
    
    # Calculate the date range for the past 10 years
    end_date = datetime.now()
    start_date = end_date - timedelta(days=10 * 365)  # Approximate 10 years
    
    # Convert dates to the required format: YYYYMMDDTHHMM
    time_from = start_date.strftime("%Y%m%dT%H%M")
    time_to = end_date.strftime("%Y%m%dT%H%M")
    
    # Prepare the parameters for the API request
    params = {
        "function": function,
        "apikey": api_key,
        "time_from": time_from,
        "time_to": time_to,
        "sort": "EARLIEST",  # Retrieve data starting from the earliest date
        "limit": 1000  # Set a high limit to retrieve as much data as possible
    }
    
    # Add optional filters if provided
    if tickers:
        params["tickers"] = ",".join(tickers)
    if topics:
        params["topics"] = ",".join(topics)
    
    # Make the API request
    response = requests.get(base_url, params=params)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        
        # Extract data and convert it to a DataFrame
        if "feed" in data:
            news_data = data["feed"]
            df = pd.DataFrame(news_data)
            return df
        else:
            print("No data found.")
            return pd.DataFrame()  # Return an empty DataFrame if no data found
    else:
        # Handle errors
        print(f"Error: {response.status_code}")
        return pd.DataFrame()  # Return an empty DataFrame in case of an error


from binance.client import Client

def fetch_and_clean_binance_data(symbol, start_date, end_date, interval):

    client = Client(API_KEY, SECRET_KEY)
    
    # Fetching historical candlestick data
    klines = client.get_historical_klines(symbol, interval, start_date, end_date)
    
    # Creating a DataFrame
    df = pd.DataFrame(klines, columns=['Open time', 'Open', 'High', 'Low', 'Close', 'Volume',
                                       'Close time', 'Quote asset volume', 'Number of trades',
                                       'Taker buy base asset volume', 'Taker buy quote asset volume', 'Ignore'])
    
    # Convert timestamp to readable date
    df['Open time'] = pd.to_datetime(df['Open time'], unit='ms')
    df['Close time'] = pd.to_datetime(df['Close time'], unit='ms')
    
    # Convert numeric values to float
    for col in ['Open', 'High', 'Low', 'Close', 'Volume', 'Quote asset volume',
                'Taker buy base asset volume', 'Taker buy quote asset volume']:
        df[col] = df[col].astype(float)
    
    # Data cleaning
    # Drop columns that are not required (e.g., 'Ignore')
    df.drop(columns=['Ignore', 'Close time'], inplace=True)
    
    # Handling missing values by forward filling
    df.ffill(inplace=True)
    
    return df

# Example usage
symbol = 'BTCUSDT'  # Bitcoin to USD Tether
start_date = "1 Jan, 2014"
end_date = "1 Jan, 2024"
interval = Client.KLINE_INTERVAL_1DAY  # Daily intervals

# btc_data = fetch_and_clean_binance_data(symbol, start_date, end_date, interval)
# print(btc_data.head())


#FUNCTION FOR GETTING DATA FOR 10 YEARS (3 TIMES API CALLS)

def Binance_Data_For_10_Years(symbol='BTCUSDT', interval='1d'):
    client = Client(API_KEY, SECRET_KEY)
    
    # Define the time range for the API calls
    end_date = datetime.now()
    start_date_3rd = end_date - timedelta(days=365 * 10)
    start_date_2nd = end_date - timedelta(days=365 * 7)
    start_date_1st = end_date - timedelta(days=365 * 4)
    
    # Fetch data in 3 segments
    data_1 = fetch_and_clean_binance_data(symbol, start_date_3rd.strftime("%d %b, %Y"), start_date_2nd.strftime("%d %b, %Y"), interval)
    print("Binace data1")
    print(data_1.shape[0])
    data_2 = fetch_and_clean_binance_data(symbol, start_date_2nd.strftime("%d %b, %Y"), start_date_1st.strftime("%d %b, %Y"), interval)
    print("Binace data2")
    print(data_2.shape[0])

    data_3 = fetch_and_clean_binance_data(symbol, start_date_1st.strftime("%d %b, %Y"), end_date.strftime("%d %b, %Y"), interval)
    print("Binace data3")
    print(data_3.shape[0])

    # Combine all data into one DataFrame
    full_data = pd.concat([data_1, data_2, data_3], ignore_index=True)
    print("Binace data overall")
    print(full_data.shape[0])
    return full_data

# Fetch news data by making 3 API calls and concatenating the results
def get_full_news_sentiment(api_key, tickers=None, topics=None):
    base_url = "https://www.alphavantage.co/query"
    function = "NEWS_SENTIMENT"
    
    # Define date ranges for 3 segments
    end_date = datetime.now()
    start_date_3rd = end_date - timedelta(days=365 * 10)
    start_date_2nd = end_date - timedelta(days=365 * 7)
    start_date_1st = end_date - timedelta(days=365 * 4)
    
    # Fetch data in 3 segments
    params_1 = {
        "function": function,
        "apikey": api_key,
        "time_from": start_date_3rd.strftime("%Y%m%dT%H%M"),
        "time_to": start_date_2nd.strftime("%Y%m%dT%H%M"),
        "sort": "EARLIEST",
        "limit": 1000
    }
    params_2 = {
        "function": function,
        "apikey": api_key,
        "time_from": start_date_2nd.strftime("%Y%m%dT%H%M"),
        "time_to": start_date_1st.strftime("%Y%m%dT%H%M"),
        "sort": "EARLIEST",
        "limit": 1000
    }
    params_3 = {
        "function": function,
        "apikey": api_key,
        "time_from": start_date_1st.strftime("%Y%m%dT%H%M"),
        "time_to": end_date.strftime("%Y%m%dT%H%M"),
        "sort": "EARLIEST",
        "limit": 1000
    }
    
    if tickers:
        params_1["tickers"] = ",".join(tickers)
        params_2["tickers"] = ",".join(tickers)
        params_3["tickers"] = ",".join(tickers)
    if topics:
        params_1["topics"] = ",".join(topics)
        params_2["topics"] = ",".join(topics)
        params_3["topics"] = ",".join(topics)
    
    # Fetch the data
    response_1 = requests.get(base_url, params=params_1)
    response_2 = requests.get(base_url, params=params_2)
    response_3 = requests.get(base_url, params=params_3)
    
    # Check if all requests were successful and combine the data
    if response_1.status_code == 200 and response_2.status_code == 200 and response_3.status_code == 200:
        data_1 = response_1.json().get("feed", [])
        data_2 = response_2.json().get("feed", [])
        data_3 = response_3.json().get("feed", [])
        
        # Combine all news data
        full_data = pd.DataFrame(data_1 + data_2 + data_3)
        print("News data overall")
        print(full_data.shape[0])
        return full_data
    else:
        print(f"Error fetching news data: {response_1.status_code}, {response_2.status_code}, {response_3.status_code}")
        return pd.DataFrame()

# Example usage
#2017-08-17 this is the starting date of the data in the binance
btc_full_data = Binance_Data_For_10_Years()
news_full_data = get_full_news_sentiment(News_sentiment_api_key, tickers=['BTC'], topics=['crypto'])
news_data=get_news_sentiment(News_sentiment_api_key, tickers=['BTC'], topics=['crypto'])
print(btc_full_data.describe())

