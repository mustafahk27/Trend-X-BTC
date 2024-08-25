import requests
import pandas as pd
from datetime import datetime
import hmac
import hashlib
import time
import configparser
import os
# Initialize the config parser
config = configparser.ConfigParser()

# Get the current directory of the script
script_dir = os.path.dirname(os.path.realpath(__file__))

# Build the full path to the config file
config_path = os.path.join(script_dir, 'config.ini')

# Initialize the config parser
config = configparser.ConfigParser()

# Read the config file
files_read = config.read(config_path)
if not files_read:
    print("Failed to read the config file.")
# Access the variables
api_key = config['binance']['api_key']
secret_key = config['binance']['secret_key']

print(f"API Key: {api_key}")
print(f"Secret Key: {secret_key}")

# Your API key and secret key from Binance
API_KEY = api_key 
SECRET_KEY = secret_key

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

# Fetch historical data
historical_df = fetch_historical_data()
print("Historical Data:")
print(historical_df.shape[0])

# Fetch real-time data
real_time_df = fetch_real_time_data()
print("\nReal-Time Data:")
print(real_time_df)