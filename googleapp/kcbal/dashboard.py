import time
from outscraper import ApiClient
from django.http import JsonResponse
from django.db import connection
from datetime import datetime, timedelta
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from googleapp.api_custom_functions import api_custom_functions
import json
from googleapp.models import *
import uuid
import traceback
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from decimal import Decimal
import decimal
from django.http import JsonResponse

# Helper function to convert Decimal to float
def convert_decimal_to_float(data):
    if isinstance(data, list):
        return [convert_decimal_to_float(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_decimal_to_float(value) for key, value in data.items()}
    elif isinstance(data, decimal.Decimal):
        return float(data)  # Convert decimal to float
    else:
        return data




@csrf_exempt
def graph_dashboard_data(request):     
    try:
        outputjson = {}
        Qid = ''
        formcode = ''
        valid = 0
        IsFullyProcessed = 0
        IsPartiallyProcessed = 1                    
        ReturnStatus = 2
        ReturnError_response = {}
        ReturnJson_response = {}
        stringResponse = ''
        ApiKey = ''
        AppTypeNo = ''
        AppVersion = ''
        if request.method == 'POST':
            json_body = request.body
            request_json_validation = api_custom_functions.json_validation(json_body)  # Validating if the JSON is valid
            
            if request_json_validation == True: # if the json is valid
                Json_request = json.loads(request.body)
                apikey_validation = api_custom_functions.apikey_validation(Json_request) # Validation the
                parameters_validation = api_custom_functions.parameters_validation(Json_request, 'dashboard') # validation th
                webservice_code = api_custom_functions.web_service_code('dashboard')  # getting the webservice code
                # if the json is valid and parameters and valid and webservice code is not empty
            if apikey_validation == True and parameters_validation == True and webservice_code !='':
                Json_request = json.loads(request.body)
                datetime_obj_to_str_array = ['fld_sys_inserted_datetime','fld_form_start_time','fld_form_end_time']
                # get the json data
                Json_request = json.loads(request.body)
                #role_code = Json_request['role_code']
                #login_user_id = Json_request['login_user_id']
                requested_tables = Json_request['requesttable']
                FormCode = Json_request['FormCode']
                ApiKey = Json_request['ApiKey']
                AppTypeNo = Json_request['AppTypeNo']
                AppVersion = Json_request['AppVersion']
                synceddatetime= Json_request['synceddatetime']
                FormCode = ''
                jsonData_database = str(json.dumps(Json_request))
                Qid = api_custom_functions.inserQtable_data(webservice_code,jsonData_database,api_custom_functions.current_date_time_in_format(),synceddatetime)
                for tablenames in requested_tables:
                    outputjson[tablenames] = []
                    max_rn = requested_tables[tablenames]
                    master_or_transaction_tbl = tablenames.split('_')[0]
                    if tablenames == "total_review": 
                        # table_published_check = f"SELECT * FROM master_tbl_state "
                        table_data = api_custom_functions.getting_data_in_dictionary_format(f"""SELECT COUNT('fld_rf_id') as total_review FROM trn_tbl_new_review WHERE fld_is_active='1';""")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "total_doctor": 
                        # table_published_check = f"SELECT * FROM master_tbl_state "
                        table_data = api_custom_functions.getting_data_in_dictionary_format(f"""SELECT COUNT('fld_rf_id') as total_doctor FROM master_tbl_doctor WHERE fld_is_active='1';""")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "posted_review": 
                        table_data = api_custom_functions.getting_data_in_dictionary_format("SELECT COUNT(fld_rf_id) as total_posted_review FROM trn_tbl_new_review WHERE fld_is_postd_arch='2' and fld_is_active='1';")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "doctor_avg_ratings": 
                        table_data = api_custom_functions.getting_data_in_dictionary_format("SELECT AVG(fld_rating) AS average_rating FROM trn_tbl_posted_review WHERE fld_is_active='1';")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "month_wise_review": 
                        table_data = api_custom_functions.getting_data_in_dictionary_format("SELECT DATE_FORMAT(fld_review_date, '%M') AS month_year, SUM(CASE WHEN fld_is_active = '1' THEN 1 ELSE 0 END) AS month_wise_review FROM trn_tbl_new_review WHERE fld_is_active = '1' GROUP BY month_year ORDER BY STR_TO_DATE(month_year, '%M');")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "archived_posted_review_month_wise": 
                        table_data = api_custom_functions.getting_data_in_dictionary_format("SELECT DATE_FORMAT(fld_review_date, '%M') AS month_year, SUM(CASE WHEN fld_is_postd_arch = '2' THEN 1 ELSE 0 END) AS total_posted, SUM(CASE WHEN fld_is_postd_arch = '0' THEN 1 ELSE 0 END) AS total_archived FROM trn_tbl_new_review WHERE fld_is_active='1' GROUP BY month_year ORDER BY STR_TO_DATE(month_year, '%M');")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "place_wise_average": 
                        table_data = api_custom_functions.getting_data_in_dictionary_format("SELECT AVG(CASE WHEN fld_place_id = 'ChIJ441Kr5I9rjsRm-EYn-cfOhE' THEN fld_rating ELSE NULL END) AS Rajajinagar, AVG(CASE WHEN fld_place_id = 'ChIJxdkpGioXrjsR-rB9aegF3bc' THEN fld_rating ELSE NULL END) AS Indiranagar, AVG(CASE WHEN fld_place_id = 'ChIJv2Jfcs1qrjsRTzMHGwDuE3U' THEN fld_rating ELSE NULL END) AS Bannerghatta, AVG(CASE WHEN fld_place_id = 'ChIJE19us1FtrjsRh17InKNqHv0' THEN fld_rating ELSE NULL END) AS Bommasandra FROM trn_tbl_posted_review WHERE fld_is_active = '1';")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "docotr_star_rating_avg": 
                        table_data = api_custom_functions.getting_data_in_dictionary_format("SELECT fld_doc_name, AVG(fld_rating) AS average_rating FROM trn_tbl_posted_review WHERE fld_is_active = '1' GROUP BY fld_doc_name ORDER BY average_rating DESC;")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                    elif tablenames == "top_performing_branch": 
                        table_data = api_custom_functions.getting_data_in_dictionary_format("SELECT fld_place_name, average_rating FROM (SELECT fld_place_name, AVG(fld_rating) AS average_rating FROM trn_tbl_posted_review WHERE fld_is_active = '1' GROUP BY fld_place_name) AS avg_ratings WHERE average_rating = (SELECT MAX(average_rating) FROM (SELECT AVG(fld_rating) AS average_rating FROM trn_tbl_posted_review WHERE fld_is_active = '1' GROUP BY fld_place_name) AS avg_subquery) ORDER BY fld_place_name LIMIT 1;")
                        table_data = process_table_data(table_data)
                        outputjson[tablenames].extend(table_data)
                        # table_data = process_table_data(table_data)
                        # outputjson[tablenames].extend(table_data)
            valid = 1
            ReturnStatus = 1
            IsFullyProcessed = 1
            IsPartiallyProcessed = 0
            Json_response = {
                "status": "1",
                "responsemessage": outputjson,
                "serverdatetime": str(api_custom_functions.current_date_time_in_format())
            }
            # stringResponse = str(json.dumps(Json_response))
            api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
            return JsonResponse(Json_response)
        else:
            if request_json_validation == True:
                Json_request = json.dumps(json.loads(request.body), default=str) # convert the json to string
            else:
                Json_request = request.body # getting the json data
            Qid = api_custom_functions.inserQtable_data(webservice_code,str(Json_request),api_custom_functions.current_date_time_in_format(),'')
            Json_response ={
            "error_level": "2",
            "error_message": 'Invalid Json Request',
            "error_file": "views.py",
            "serverdatetime": api_custom_functions.current_date_time_in_format()
            }
            api_custom_functions.error_log_insert(str(Json_response),Qid,'','','graph_view_dashboar_bc_sec01_adolescent_enagement','1','1','2')
            api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
        return JsonResponse(Json_response)
    except Exception as e:
        if request_json_validation == True:
            Json_request = json.dumps(json.loads(request.body))
        else:
            Json_request = request.body
        # Qid = api_custom_functions.inserQtable_data(webservice_code,str(Json_request),api_custom_functions.current_date_time_in_format(),'')
        error_json ={
            "error_level": "1",                                     
            "error_message": str(e),
            "error_file": "views.py",
            "serverdatetime": api_custom_functions.current_date_time_in_format()
            }
        api_custom_functions.error_log_insert(str(json.dumps(error_json)),Qid,'','','graph_view_dashboar_bc_sec01_adolescent_enagement','1','1','1')
        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
    return HttpResponse(json.dumps(error_json), content_type="application/json")   


# Define datetime fields if any
datetime_obj_to_str_array = ['fld_sys_inserted_datetime', 'fld_form_start_time', 'fld_form_end_time']
# Helper function to convert Decimal and datetime objects
def process_table_data(table_data):
    for table_data_dict in table_data:
        # Convert Decimal objects to float for JSON serialization
        for key, value in table_data_dict.items():
            if isinstance(value, Decimal):
                table_data_dict[key] = float(value)
        # Convert datetime objects to string if necessary
        for datetime_obj_to_str in datetime_obj_to_str_array:
            if datetime_obj_to_str in table_data_dict:
                table_data_dict[datetime_obj_to_str] = str(table_data_dict[datetime_obj_to_str])
    return table_data