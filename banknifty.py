# package import statement
from SmartApi import SmartConnect #or from SmartApi.smartConnect import SmartConnect
import pyotp
from logzero import logger
import requests
import pandas as pd
from datetime import date
import datetime
import numpy as np
# from fastai.structured import  add_datepart # type: ignore
# api-endpoint
URL = "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
 
api_key = 'SkTPA1AV'
username = 'A51149665'
pwd = '4565'
smartApi = SmartConnect(api_key)
try:
    token = "WDD66JAEYKVV57ZCU3YIHSLKVA"
    totp = pyotp.TOTP(token).now()
except Exception as e:
    logger.error("Invalid Token: The provided token is not valid.")
    raise e

correlation_id = "abcde"
data = smartApi.generateSession(username, pwd, totp)

if data['status'] == False:
    logger.error(data)
    
else:
    # login api call
    # logger.info(f"You Credentials: {data}")
    authToken = data['data']['jwtToken']
    refreshToken = data['data']['refreshToken']
    # fetch the feedtoken
    feedToken = smartApi.getfeedToken()
    
    # sending get request and saving the response as response object
    # r = requests.get(url = URL)
    # today = datetime.datetime.now()
    # print(today.day) # day of month
    # print(today.strftime("%A")) # Day of week
    # bf_search = 'BANKNIFTY' + '27' + 'MAR24'  
    # extracting data in json format
    # data = r.json()
    # columns = ['symbol','token','name','expiry']
    # candledata = pd.DataFrame(data,columns=columns)
    # candledata = candledata.reset_index(drop=False)
    # result = candledata[candledata['symbol'] == 'BANKNIFTY10APR2448200CE'] #74200CALL - 858629 ,74200PUT - 858678 
    # print(result) #s BANKNIFTY47600CE = 54004 BANKNIFTY47700PE = 54009
    #Historic api
    profit = 0
    try:
        historicParam={
        "exchange": "NSE",
        "symboltoken": "99926000",
        "interval": "ONE_HOUR",
        "fromdate": "2024-04-05 09:15", 
        "todate": "2024-04-05 15:30"
        }
        banknifty = smartApi.getCandleData(historicParam)['data']
        columns = ['time','open','high','low','close','volume']
        banknifty_data = pd.DataFrame(banknifty,columns=columns)
        banknifty_data['open'] = banknifty_data['open'].astype(int)
        banknifty_data['open'] = pd.to_numeric(banknifty_data['open'], errors='coerce')
        banknifty_data['close'] = pd.to_numeric(banknifty_data['close'], errors='coerce')
        banknifty_data['close'] = banknifty_data['close'].astype(int)
        banknifty_data['time'] = pd.to_datetime(banknifty_data['time'])
        print(banknifty_data)
    except Exception as e:
        logger.exception(f"Historic Api failed: {e}")
    
    # candledata[candledata['symbol'] == 'BANKNIFTY' & candledata['expiry'] == '20MAR2024']

