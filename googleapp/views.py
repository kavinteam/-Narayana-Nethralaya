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

from .kcbal import doctor_creation,archived_review,dashboard

# Create your views here.
def index(request):
    return render(request,'index.html')



#Rajajinagar
#ChIJ441Kr5I9rjsRm-EYn-cfOhE
#Electronic City
#ChIJE19us1FtrjsRh17InKNqHv0
#Indiranagar
#ChIJxdkpGioXrjsR-rB9aegF3bc
#Bannerghatta Rd, Hulimavu,
#ChIJv2Jfcs1qrjsRTzMHGwDuE3U
OUTSCRAPER_API_KEY = 'OWFmNDJjMjNiYjc4NDc2ZGE1ODQ0YmE3YzA2Y2FkNjF8ZDExZjgyODg5Mw'
PLACE_IDS = ["ChIJ441Kr5I9rjsRm-EYn-cfOhE", "ChIJxdkpGioXrjsR-rB9aegF3bc","ChIJv2Jfcs1qrjsRTzMHGwDuE3U","ChIJE19us1FtrjsRh17InKNqHv0"]
client = ApiClient(OUTSCRAPER_API_KEY)



def fetch_and_store_reviews(request):
    all_reviews = []

    # Timestamp for 1 days ago
    three_days_ago_timestamp = int(time.time()) - 3 * 24 * 3600

    for place_id in PLACE_IDS:
        results = client.google_maps_reviews(
            [place_id],
          #  reviews_limit=4,  # Limit to the latest 2 reviews
            sort='newest',     # Sort by newest reviews
            cutoff=three_days_ago_timestamp,  # Get only reviews from the last 3 days
            language='en'
        )

        for place in results:
            reviews_data = place.get('reviews_data', [])

            with connection.cursor() as cursor:
                for review in reviews_data:
                    try:
                        author_name = review.get('author_title', 'Unknown')
                        rating = review.get('review_rating', 0)
                        review_text = review.get('review_text', '')
                        review_datetime_utc = review.get('review_datetime_utc', '')
                        review_link = review.get('review_link', '')
                        review_id = review.get('review_id', '') 

                        # Convert review date string to a datetime object with the correct format
                        review_date = datetime.strptime(review_datetime_utc, '%m/%d/%Y %H:%M:%S')

                        # Retrieve the last 'fld_rn' and 'fld_rf_id' values
                        Rn = Trn_tbl_new_review.objects.all().values_list('fld_rn', flat=True).order_by('fld_rn').last()
                        Rfid = Trn_tbl_new_review.objects.all().values_list('fld_rf_id', flat=True).order_by('fld_rf_id').last()
                        review_sw_id = Trn_tbl_new_review.objects.all().values_list('fld_review_sw_id', flat=True).order_by('fld_review_sw_id').last()
                        
                        # Determine the next 'fld_review_sw_id' value
                        if review_sw_id is None:
                            sw_id = '0001'
                        else:
                            sw_id = str(int(review_sw_id) + 1).zfill(4)
                      
                        # Determine the next 'fld_rn' and 'fld_rf_id' values
                        Rn = 1 if Rn is None else int(Rn) + 1
                        Rfid = 1 if Rfid is None else int(Rfid) + 1

                       

                        if place_id=='ChIJ441Kr5I9rjsRm-EYn-cfOhE':
                            place="Rajajinagar"
                        elif place_id=='ChIJxdkpGioXrjsR-rB9aegF3bc':
                            place="Indiranagar"
                        elif place_id=='ChIJv2Jfcs1qrjsRTzMHGwDuE3U':
                            place="Bannerghatta"
                        else:
                            place="Bommasandra"

                        # Check for duplicate review
                        review_duplicate = Trn_tbl_new_review.objects.filter(fld_review_id=review_id).exists()

                        # Insert the latest reviews into the database if not duplicate
                        if not review_duplicate:
                            cursor.execute("""
                                INSERT INTO trn_tbl_new_review (
                                    fld_rn, fld_rf_id, fld_review_sw_id, fld_review_id, fld_place_id, fld_place_name,
                                    fld_author_name, fld_rating, fld_review_text, fld_review_date, fld_review_link,fld_is_postd_arch,
                                    fld_is_active,fld_system_inserted_datetime, fld_modified_no
                                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                            """, [
                                Rn, Rfid, sw_id, review_id, place_id, place, author_name, rating,
                                review_text, review_date, review_link,'1','1', review_date, '0'
                            ])

                        all_reviews.append(review)

                    except Exception as e:
                        print("Error executing query:", e)
                        return JsonResponse({'status': 'error', 'message': 'Database insertion failed', 'details': str(e)})

    return JsonResponse({'status': 'success', 'reviews': all_reviews})


# login for the web user based on the username and password method POST
@csrf_exempt    
def web_login(request):
    Qid = ''
    FormCode = ''
    valid = ''
    IsFullyProcessed = ''
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
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'web_login')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('web_login')  # getting the webservice code
                if request_json_validation and apikey_validation and parameters_validation and webservice_code != '':
                    userid = json_request['userid']
                    password = json_request['password']
                    synceddatetime = json_request['synceddatetime']
                    FormCode = json_request['FormCode']
                    ApiKey = json_request['ApiKey']
                    AppTypeNo = json_request['AppTypeNo']
                    AppVersion = json_request['AppVersion']
                    jsonData_database = str(json.dumps(json_request))
                    receivedDate = api_custom_functions.current_date_time_in_format()
                    Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, api_custom_functions.current_date_time_in_format(), synceddatetime)
                    # if userid == 'admin'
                    query = f"SELECT * FROM master_tbl_user where fld_user_id='{userid}' and fld_password='{password}' and fld_is_active='1' and fld_is_deleted='0'"
                    cursor = connection.cursor()
                    cursor.execute(query)
                    result = cursor.fetchall()
                    # Retrieve user data from the database
                    login_user_data = api_custom_functions.getting_data_in_dictionary_format(
                        f"SELECT * FROM master_tbl_user WHERE fld_user_id='{userid}' AND fld_password='{password}' AND fld_is_active=1 AND fld_is_deleted=0;")
                    if not result:
                        valid = 0
                        IsFullyProcessed = 0
                        IsPartiallyProcessed = 1                    
                        ReturnStatus = 2
                        ReturnJson_response = {
                            "status": ReturnStatus,
                            "responsemessage": "Failed",
                            "serverdatetime": api_custom_functions.current_date_time_in_format(),
                        }
                    else:
                        # Safely remove the password from the user data dictionary
                        # login_user_data.pop('fld_password')
                        valid = 1
                        ReturnStatus = 1
                        IsFullyProcessed = 1
                        IsPartiallyProcessed = 0
                        ReturnJson_response = {
                            "status": '1',
                            "responsemessage": "Loged In Successfully",
                            "loged_in_details": login_user_data,
                            "serverdatetime": api_custom_functions.current_date_time_in_format(),
                        }
                    stringResponse = str(json.dumps(ReturnJson_response))
                    api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,
                                            ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                    return JsonResponse(ReturnJson_response)
                else:
                    if parameters_validation is False:
                        Json_response = json.dumps(json_body)
                        ReturnError_response = {
                            "error_level": "2",
                            "error_message": 'Parameter validation went wrong',
                            "error_file": "views.py",
                            "serverdatetime": api_custom_functions.current_date_time_in_format(),
                        }
                        stringResponse = str(json.dumps(ReturnError_response))
                        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,
                                            ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                        api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,
                                                        'sp_error_log_detials', 'web_login', '1', ReturnStatus, '1')
                    return JsonResponse(ReturnError_response)
            else:
                if not request_json_validation:
                    error_json = json.dumps(json_body)
                error_status = 4
                eroor_code = 4
                ReturnError_response = {
                    "error_level": "4",
                    "error_message": 'Invalid Json Request',
                    "error_file": "views.py",
                    "serverdatetime": api_custom_functions.current_date_time_in_format()
                }
                stringResponse = str(json.dumps(error_json))
                Qid = api_custom_functions.inserQtable_data(FormCode, error_json, api_custom_functions.current_date_time_in_format(), api_custom_functions.current_date_time_in_format())
                api_custom_functions.error_log_insert(str(json.dumps(error_json)), Qid, FormCode,'sp_error_log_detials', 'get_role_details_and_mapping_location', '1', error_status, eroor_code)
                api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
                return JsonResponse(ReturnError_response)
    except Exception as e:
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
        api_custom_functions.error_log_insert(stringResponse, Qid, FormCode,
                                            'sp_error_log_detials', 'web_login', '1', ReturnStatus, '1')
        api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed,
                                          ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)

    # Return the constructed error response
    return JsonResponse(ReturnError_response)


@csrf_exempt
#@api_custom_functions.retry_on_deadlock    
def get_new_review(request):
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
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'get_new_review')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('get_new_review')  # getting the webservice code
            if apikey_validation and parameters_validation and webservice_code != '':
               
                userid = json_request['userid']
                synceddatetime = json_request['synceddatetime']
                FormCode = json_request['FormCode']
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
                reuest_type = json_request['reuest_type']
                
                jsonData_database = str(json.dumps(json_request))
                Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, receivedDate, synceddatetime)
                if reuest_type == '1':
                    table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM trn_tbl_new_review where fld_is_postd_arch='1' and fld_is_active='1';")
                elif reuest_type =='2':
                    table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM trn_tbl_new_review where fld_is_postd_arch='0' and fld_is_active='1';")
                else:
                    table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM trn_tbl_posted_review;")
                
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
def get_doctor(request):
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
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'get_doctor')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('get_doctor')  # getting the webservice code
            if apikey_validation and parameters_validation and webservice_code != '':
               
                userid = json_request['userid']
                synceddatetime = json_request['synceddatetime']
                FormCode = json_request['FormCode']
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
              
                jsonData_database = str(json.dumps(json_request))
                Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, receivedDate, synceddatetime)
               
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor where fld_is_active='1';")
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
def posted_review_insertion(request):
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
            if "trn_tbl_posted_review" in json_request:
                # Extract the list of dictionaries
                json_database = json_request['trn_tbl_posted_review']
                json_data = json.dumps(json_database)
                # Validate the API key
                apikey_validation = api_custom_functions.apikey_validation(json_request) # validate the API key is present in the json or not
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'posted_review')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('posted_review')  # getting the webservice code
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
                        fld_review_sw_id = json_request['fld_review_sw_id']
                        fld_review_id = json_request['fld_review_id']
                        #fld_review_status_id = json_request['fld_review_status_id']
                        #fld_review_status_name = json_request['fld_review_status_name']
                        fld_author_name = json_request['fld_author_name']
                        fld_review_date = json_request['fld_review_date']
                        fld_place_id = json_request['fld_place_id']
                        fld_place_name = json_request['fld_place_name']
                        fld_rating = json_request['fld_rating']
                        fld_review_text = json_request['fld_review_text']
                        fld_review_link = json_request['fld_review_link']
                        fld_posted_as_id = json_request['fld_posted_as_id']
                        fld_posted_as_name = json_request['fld_posted_as_name']
                        fld_doc_sw_id = json_request['fld_doc_sw_id']
                        fld_doc_id = json_request['fld_doc_id']
                        fld_doc_name = json_request['fld_doc_name']
                        
                            
                       
                        cursor = connection.cursor()
                        query = "CALL sp_posted_review(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"#15
                        values_need_to_insert = (fld_rf_id,fld_review_sw_id,fld_review_id,fld_author_name,fld_review_date,fld_place_id,fld_place_name,fld_rating,fld_review_text,fld_review_link,fld_doc_sw_id,fld_doc_id,fld_doc_name,fld_posted_as_id,fld_posted_as_name)# Count 18
                        result=cursor.execute(query, values_need_to_insert)
                    if result:
                        IsFullyProcessed = "1"
                        IsPartiallyProcessed = "0"
                        ReturnStatus = "1"
                        valid = "1"
                        ReturnJson_response = {
                            "status": ReturnStatus,
                            "responsemessage": f"Posted review data is saved succesfully ",
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
                            "responsemessage": f"Doctor data has failed to save. Please recheck the section and save it again.",
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

def image_upload(image_file):
    folder = 'doctor_images_uploads'
    fs = FileSystemStorage(location=f"{settings.MEDIA_ROOT}/{folder}")
    filename = fs.save(image_file.name, image_file)
    return fs.url(f"{folder}/{filename}")



#Inserting the mpr section 17
@csrf_exempt
def doctor_master_creation(request):
    return doctor_creation.doctor_master_insertion(request)

@csrf_exempt
def get_doctor_list(request):
    return doctor_creation.get_doctor_list_data(request)

@csrf_exempt
def get_edit_doctor_list(request):
    return doctor_creation.get_edit_doctor(request)

@csrf_exempt
def get_doctor_by_place(request):
    return doctor_creation.get_doctor_by_place_id(request)

@csrf_exempt
def doctor_deletion(request):
    return doctor_creation.doctor_delete(request)

@csrf_exempt
def review_archived_update(request):
    return archived_review.review_archived_updation(request)


@csrf_exempt
def get_doctor_by_id(request):
    return doctor_creation.get_doctoget_doctor_by_id_data(request)


@csrf_exempt
def get_review_by_doctor(request):
    return archived_review.get_review_by_doctor_id(request)

@csrf_exempt
def get_review_by_place(request):
    return archived_review.get_review_by_place_id(request)

@csrf_exempt
def admin_graph(request):
    return dashboard.graph_dashboard_data(request)


