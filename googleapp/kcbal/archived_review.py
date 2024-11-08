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

@csrf_exempt
def review_archived_updation(request):
    Qid = ''
    FormCode = ''
    valid = ''
    IsFullyProcessed = ''
    IsPartiallyProcessed = ''
    ReturnStatus = ''
    ReturnError_response = {}
    ReturnJson_response = {}
    stringResponse = ''
    ApiKey = ''
    AppTypeNo = ''
    AppVersion = ''
    receivedDate = api_custom_functions.current_date_time_in_format()
    try:
        if request.method == 'POST':
            json_body = request.body.decode('utf-8')
            request_json_validation = api_custom_functions.json_validation(json_body)  # Validating the Json
        if not request_json_validation:
            json_data = json.dumps(json_body)
            synceddatetime = api_custom_functions.current_date_time_in_format()
            Qid = api_custom_functions.inserQtable_data(FormCode,json_data,receivedDate, synceddatetime)
            ReturnError_response = {
                "error_level": "2",
                "error_message": 'Invalid Json Request',
                "error_file": "views.py",                       
                "serverdatetime": api_custom_functions.current_date_time_in_format()
            }
            stringResponse = json_data
            api_custom_functions.error_log_insert(str(json.dumps(stringResponse)), Qid, FormCode,'sp_error_log_detials', 'mpr_fc_section_17_insert', '1', ReturnStatus, '1')
            api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
            return JsonResponse(ReturnError_response)
        else:
            json_request = json.loads(json_body)
            if "trn_tbl_new_review" in json_request:
                # Extract the list of dictionaries
                json_database = json_request['trn_tbl_new_review']
                json_data = json.dumps(json_database)
                # Validate the API key
                apikey_validation = api_custom_functions.apikey_validation(json_request) # validate the API key is present in the json or not
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'archived_review')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('archived_review')  # getting the webservice code
                synceddatetime = receivedDate
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
                FormCode = json_request['FormCode']
                synceddatetime = json_request['synceddatetime']
                Qid = api_custom_functions.inserQtable_data(FormCode,json_data,receivedDate, synceddatetime)
                if apikey_validation and parameters_validation and webservice_code !='':
                    for json_request in json_database:
                        fld_rf_id = json_request['fld_rf_id']
                        review_sw_id = json_request['fld_review_sw_id']
                        review_id = json_request['fld_review_id']
                        review_date = json_request['fld_review_date']
                        place_id = json_request['fld_place_id']
                        place_name = json_request['fld_place_name']
                        author_name = json_request['fld_author_name']
                        rating = json_request['fld_rating']
                        review_text = json_request['fld_review_text']
                        review_link = json_request['fld_review_link']
                        is_postd_arch = json_request['fld_is_postd_arch']
                        loggedin_user_id = json_request['fld_loggedin_user_id']
                        fld_system_inserted_datetime = json_request['fld_system_inserted_datetime']
                    
                        cursor = connection.cursor()
                        query = """CALL sp_archived_review(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                        values_need_to_insert = (
                            fld_rf_id,review_sw_id,review_id,review_date,place_id,place_name,author_name,rating,review_text,review_link,is_postd_arch,loggedin_user_id,fld_system_inserted_datetime
                        )
                        result=cursor.execute(query, values_need_to_insert)
                    if result:
                        IsFullyProcessed = "1"
                        IsPartiallyProcessed = "0"
                        ReturnStatus = "1"
                        valid = "1"
                        ReturnJson_response = {
                            "status": ReturnStatus,
                            "responsemessage": f"Review archived succesfully ",
                            "serverdatetime": receivedDate,
                        }
                        stringResponse = str(json.dumps(ReturnJson_response))
                        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                        return JsonResponse(ReturnJson_response)
                    else:
                        IsFullyProcessed = "2"
                        IsPartiallyProcessed = "1"
                        ReturnStatus = "2"
                        valid = "0"
                        ReturnJson_response = {
                            "status": ReturnStatus,
                            "responsemessage": f"Review has failed to archive.",
                            "serverdatetime": receivedDate,
                        }
                        stringResponse = str(json.dumps(ReturnJson_response))
                        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                    return JsonResponse(ReturnJson_response)
                else:
                    json_data = json.loads(json_body)
                    ReturnError_response = {
                        "error_level": "3",
                        "error_message": 'Parameter validation went wrong',
                        "error_file": "views.py",
                        "serverdatetime": api_custom_functions.current_date_time_in_format(),
                    }
                    stringResponse = json_data
                    api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                    api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,'sp_error_log_detials', 'mpr_fc_section_17_insert', '1', ReturnStatus, '1')
                    return JsonResponse(ReturnError_response)
    except Exception as e:
        error_data = str(traceback.print_exc())
        error_data = traceback.format_exc()
        code_error = str(print("An error occurred:", error_data))
        json_request = json.loads(json_body)
        valid = 1
        FormCode = json_request['FormCode'] if 'FormCode' in json_request else '' # Use get method to avoid KeyError
        ApiKey = json_request['ApiKey'] if 'FormCode' in json_request else ''
        AppTypeNo = json_request['AppTypeNo'] if 'AppType' in json_request else ''
        AppVersion = json_request['AppVersion'] if 'AppVersion' in json_request else ''
        IsFullyProcessed = 0
        IsPartiallyProcessed = 1
        ReturnStatus = 3
        # Construct error response
        ReturnError_response = {
            "error_level": "3",
            "error_message": str(e),
            "error_file": "views.py",
            "serverdatetime": api_custom_functions.current_date_time_in_format(),
        }
        stringResponse = str(json.dumps(ReturnError_response))
        # Log error details
        api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,'sp_error_log_detials', 'mpr_fc_section_17_insert', '1', ReturnStatus, '1')
        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
        # Return the constructed error response
    return JsonResponse(ReturnError_response)



@csrf_exempt
#@api_custom_functions.retry_on_deadlock    
def get_review_by_doctor_id(request):
    Qid = ''
    FormCode = ''
    valid = ''
    IsFullyProcessed = ''
    IsPartiallyProcessed = ''
    ReturnStatus = ''
    ReturnError_response = {}
    ReturnJson_response = {}
    stringResponse = ''
    ApiKey = ''
    AppTypeNo = ''
    AppVersion = ''
    receivedDate = api_custom_functions.current_date_time_in_format()
    try:
        if request.method == 'POST':
            json_body = request.body.decode('utf-8')
            request_json_validation = api_custom_functions.json_validation(json_body)  # Validating the Json
            if request_json_validation:
                json_request = json.loads(json_body)
                apikey_validation = api_custom_functions.apikey_validation(json_request)  # Validation the apikey
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'get_doctor_id')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('get_doctor_id')  # getting the webservice code
            if apikey_validation and parameters_validation and webservice_code != '':
               
                #userid = json_request['userid']
                synceddatetime = json_request['synceddatetime']
                FormCode = json_request['FormCode']
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
                fld_doc_id = json_request['fld_doc_id']
              
                jsonData_database = str(json.dumps(json_request))
                Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, receivedDate, synceddatetime)
               
                #table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor where fld_is_active='1' and fld_practice_location_id='{practice_location_id}';")
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM trn_tbl_posted_review WHERE fld_doc_id='{fld_doc_id}' and fld_is_active='1';")
                IsFullyProcessed = 1,
                IsPartiallyProcessed = 0,                   
                ReturnStatus = 1,
                ReturnJson_response = {
                    "status": "1",
                    "responsemessage": list(table_data),
                    "serverdatetime": api_custom_functions.current_date_time_in_format(),
                }
                stringResponse = str(json.dumps(ReturnJson_response))
                api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                return JsonResponse(ReturnJson_response)
            else:
                if not parameters_validation:
                    Json_response = json.dumps(json_body)
                    ReturnError_response = {
                        "error_level": "2",
                        "error_message": 'Parameter validation went wrong',
                        "error_file": "views.py",
                        "serverdatetime": api_custom_functions.current_date_time_in_format(),
                    }
                    stringResponse = str(json.dumps(ReturnError_response))
                    api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                    api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,'sp_error_log_detials', 'get_district', '1', ReturnStatus, '1')
                return JsonResponse(ReturnError_response)
        else:
            if request_json_validation:
                ReturnError_response = json.dumps(json_body)
                ReturnError_response = {
                    "error_level": "2",
                    "error_message": 'Invalid Json Request',
                    "error_file": "views.py",
                    "serverdatetime": api_custom_functions.current_date_time_in_format(),
                }
            stringResponse = str(json.dumps(ReturnError_response))
            api_custom_functions.error_log_insert(str(json.dumps(ReturnError_response)), Qid, FormCode, 'sp_error_log_detials', 'get_district', '1', ReturnStatus, '1')
            api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,
                                ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
            return JsonResponse(ReturnError_response)
    except Exception as e:
        valid = 1,
        FormCode = json_request['FormCode'] if 'FormCode' in json_request else '', # Use get method to avoid KeyError
        ApiKey = json_request['ApiKey'] if 'FormCode' in json_request else '',
        AppTypeNo = json_request['AppTypeNo'] if 'AppType' in json_request else '',
        AppVersion = json_request['AppVersion'] if 'AppVersion' in json_request else '',
        IsFullyProcessed = 0,
        IsPartiallyProcessed = 1,
        ReturnStatus = 3,
        # Construct error response
        ReturnError_response = {
            "error_level": "3",
            "error_message": str(e),
            "error_file": "views.py",
            "serverdatetime": api_custom_functions.current_date_time_in_format(),
        }
        stringResponse = str(json.dumps(ReturnError_response))
        # Log error details
        api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,'sp_error_log_detials', 'get_district', '1', ReturnStatus, '1')
        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed, ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)

    # Return the constructed error response
    return JsonResponse(ReturnError_response)


@csrf_exempt
#@api_custom_functions.retry_on_deadlock    
def get_review_by_place_id(request):
    Qid = ''
    FormCode = ''
    valid = ''
    IsFullyProcessed = ''
    IsPartiallyProcessed = ''
    ReturnStatus = ''
    ReturnError_response = {}
    ReturnJson_response = {}
    stringResponse = ''
    ApiKey = ''
    AppTypeNo = ''
    AppVersion = ''
    receivedDate = api_custom_functions.current_date_time_in_format()
    try:
        if request.method == 'POST':
            json_body = request.body.decode('utf-8')
            request_json_validation = api_custom_functions.json_validation(json_body)  # Validating the Json
            if request_json_validation:
                json_request = json.loads(json_body)
                apikey_validation = api_custom_functions.apikey_validation(json_request)  # Validation the apikey
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'get_review_by_place')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('get_review_by_place')  # getting the webservice code
            if apikey_validation and parameters_validation and webservice_code != '':
               
                #userid = json_request['userid']
                synceddatetime = json_request['synceddatetime']
                FormCode = json_request['FormCode']
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
                place_id = json_request['fld_place_id']
              
                jsonData_database = str(json.dumps(json_request))
                Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, receivedDate, synceddatetime)
               
                #table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor where fld_is_active='1' and fld_practice_location_id='{practice_location_id}';")
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM trn_tbl_posted_review WHERE fld_place_id='{place_id}' and fld_is_active='1' and fld_posted_as_id IN('1','3');")
                IsFullyProcessed = 1,
                IsPartiallyProcessed = 0,                   
                ReturnStatus = 1,
                ReturnJson_response = {
                    "status": "1",
                    "responsemessage": list(table_data),
                    "serverdatetime": api_custom_functions.current_date_time_in_format(),
                }
                stringResponse = str(json.dumps(ReturnJson_response))
                api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                return JsonResponse(ReturnJson_response)
            else:
                if not parameters_validation:
                    Json_response = json.dumps(json_body)
                    ReturnError_response = {
                        "error_level": "2",
                        "error_message": 'Parameter validation went wrong',
                        "error_file": "views.py",
                        "serverdatetime": api_custom_functions.current_date_time_in_format(),
                    }
                    stringResponse = str(json.dumps(ReturnError_response))
                    api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                    api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,'sp_error_log_detials', 'get_district', '1', ReturnStatus, '1')
                return JsonResponse(ReturnError_response)
        else:
            if request_json_validation:
                ReturnError_response = json.dumps(json_body)
                ReturnError_response = {
                    "error_level": "2",
                    "error_message": 'Invalid Json Request',
                    "error_file": "views.py",
                    "serverdatetime": api_custom_functions.current_date_time_in_format(),
                }
            stringResponse = str(json.dumps(ReturnError_response))
            api_custom_functions.error_log_insert(str(json.dumps(ReturnError_response)), Qid, FormCode, 'sp_error_log_detials', 'get_district', '1', ReturnStatus, '1')
            api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,
                                ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
            return JsonResponse(ReturnError_response)
    except Exception as e:
        valid = 1,
        FormCode = json_request['FormCode'] if 'FormCode' in json_request else '', # Use get method to avoid KeyError
        ApiKey = json_request['ApiKey'] if 'FormCode' in json_request else '',
        AppTypeNo = json_request['AppTypeNo'] if 'AppType' in json_request else '',
        AppVersion = json_request['AppVersion'] if 'AppVersion' in json_request else '',
        IsFullyProcessed = 0,
        IsPartiallyProcessed = 1,
        ReturnStatus = 3,
        # Construct error response
        ReturnError_response = {
            "error_level": "3",
            "error_message": str(e),
            "error_file": "views.py",
            "serverdatetime": api_custom_functions.current_date_time_in_format(),
        }
        stringResponse = str(json.dumps(ReturnError_response))
        # Log error details
        api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,'sp_error_log_detials', 'get_district', '1', ReturnStatus, '1')
        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed, ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)

    # Return the constructed error response
    return JsonResponse(ReturnError_response)