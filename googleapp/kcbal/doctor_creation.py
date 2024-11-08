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
import os.path

@csrf_exempt
def doctor_master_insertion(request):
    try:
        if request.method == 'POST':
            if 'fld_image_of_doctor' not in request.FILES:
                return JsonResponse({'error': 'Image file not provided.'}, status=400)

            image_file = request.FILES['fld_image_of_doctor']
            fld_rf_id = request.POST.get('fld_rf_id')
            fld_doc_sw_id = request.POST.get('fld_doc_sw_id')
            fld_date_of_registration = request.POST.get('fld_date_of_registration')
            fld_doc_name = request.POST.get('fld_doc_name')
            fld_designation = request.POST.get('fld_designation')
            fld_specialization = request.POST.get('fld_specialization')
            fld_work_experience = request.POST.get('fld_work_experience')
            fld_department_id = request.POST.get('fld_department_id')
            fld_department_Name = request.POST.get('fld_department_Name')
            fld_practice_location_id = request.POST.get('fld_practice_location_id')
            fld_practice_location_name = request.POST.get('fld_practice_location_name')
            fld_doc_availability = request.POST.get('fld_doc_availability')
            fld_description = request.POST.get('fld_description')
            fld_edu_training = request.POST.get('fld_edu_training')
            fld_achievment_awards = request.POST.get('fld_achievment_awards')
            fld_video_testimonials = request.POST.get('fld_video_testimonials')
            fld_loggedin_user_id = request.POST.get('fld_loggedin_user_id')
            doc_sw_id = Master_tbl_doctor.objects.all().values_list('fld_doc_sw_id', flat=True).order_by('fld_doc_sw_id').last()
            fld_doc_id =  Master_tbl_doctor.objects.all().values_list('fld_doc_id', flat=True).order_by('fld_doc_id').last()
          
            # Determine the next 'fld_review_sw_id' value
            if doc_sw_id is None:
                sw_id = '0001'
            else:
                sw_id = str(int(doc_sw_id) + 1).zfill(4)

            if fld_doc_id is None:
                doc_id = '0001'
            else:
                doc_id = str(int(fld_doc_id) + 1).zfill(4)


            folder = 'doctor_images_uploads'
            fs = FileSystemStorage(location=f"{settings.MEDIA_ROOT}/{folder}")

            filename = fs.save(image_file.name, image_file)
            image_url = fs.url(f"{folder}/{filename}")
            fld_image_of_doctor = 'df'

            cursor = connection.cursor()
            query = """CALL sp_doctor_master(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            values = (
                fld_rf_id, sw_id, doc_id, fld_date_of_registration, fld_doc_name, fld_designation, 
                fld_specialization, fld_work_experience, fld_department_id, fld_department_Name, 
                fld_practice_location_id, fld_practice_location_name, fld_doc_availability, fld_description, 
                fld_edu_training, fld_achievment_awards, fld_video_testimonials, image_url, fld_loggedin_user_id
            )

            cursor.execute(query, values)

            # Fetch all rows from the result
            results = cursor.fetchall()

            # Process results into a list of dictionaries
            processed_results = [
                {'column1': row[0], 'column2': row[1]}  # Adjust column names and indices as needed
                for row in results
            ]

            return JsonResponse({
                'status': 'success',
                'message': 'Doctor data and image uploaded successfully',
                'image_url': image_url,
                'results': processed_results  # Include results in the response
            }, status=201)

    except Exception as e:
        error_data = traceback.format_exc()
        return JsonResponse({'error': str(e), 'details': error_data}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)


#csrf_exempt
#ef doctor_master_insertionhh(request):
#   Qid = ''
#   FormCode = ''
#   valid = ''
#   IsFullyProcessed = ''
#   IsPartiallyProcessed = ''
#   ReturnStatus = ''
#   ReturnError_response = {}
#   ReturnJson_response = {}
#   stringResponse = ''
#   ApiKey = ''
#   AppTypeNo = ''
#   AppVersion = ''
#   receivedDate = api_custom_functions.current_date_time_in_format()
#
#   try:
#       if request.method == 'POST':
#           # Handle JSON body
#           json_body = request.POST.get('json_data', '')
#           if not json_body:
#               ReturnError_response = {
#                   "error_level": "2",
#                   "error_message": "No JSON data found in request.",
#                   "error_file": "views.py",
#                   "serverdatetime": receivedDate
#               }
#               return JsonResponse(ReturnError_response, status=400)
#
#           # Validate JSON
#           request_json_validation = api_custom_functions.json_validation(json_body)
#           if not request_json_validation:
#               json_data = json.dumps(json_body)
#               synceddatetime = api_custom_functions.current_date_time_in_format()
#               Qid = api_custom_functions.inserQtable_data(FormCode, json_data, receivedDate, synceddatetime)
#               ReturnError_response = {
#                   "error_level": "2",
#                   "error_message": 'Invalid JSON Request',
#                   "error_file": "views.py",
#                   "serverdatetime": api_custom_functions.current_date_time_in_format()
#               }
#               stringResponse = json_data
#               api_custom_functions.error_log_insert(
#                   str(json.dumps(stringResponse)), Qid, FormCode, 'sp_error_log_detials', 
#                   'mpr_fc_section_17_insert', '1', ReturnStatus, '1'
#               )
#               api_custom_functions.UpdateQTable(
#                   FormCode, valid, stringResponse, IsFullyProcessed, 
#                   IsPartiallyProcessed, ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid
#               )
#               return JsonResponse(ReturnError_response, status=400)
#
#           json_request = json.loads(json_body)
#           json_database = json_request.get('master_tbl_doctor', [])
#           if not json_database:
#               ReturnError_response = {
#                   "error_level": "2",
#                   "error_message": "No doctor data found in request.",
#                   "error_file": "views.py",
#                   "serverdatetime": receivedDate
#               }
#               return JsonResponse(ReturnError_response, status=400)
#
#           # Validate API key, parameters, etc.
#           apikey_validation = api_custom_functions.apikey_validation(json_request)
#           parameters_validation = api_custom_functions.parameters_validation(json_request, 'master_doctor')
#           webservice_code = api_custom_functions.web_service_code('doctor_insertion')
#           synceddatetime = json_request.get('synceddatetime', receivedDate)
#           ApiKey = json_request.get('ApiKey', '')
#           AppTypeNo = json_request.get('AppTypeNo', '')
#           AppVersion = json_request.get('AppVersion', '')
#           FormCode = json_request.get('FormCode', '')
#           Qid = api_custom_functions.inserQtable_data(FormCode, json.dumps(json_database), receivedDate, synceddatetime)
#
#           if apikey_validation and parameters_validation and webservice_code:
#               for doctor_data in json_database:
#                   if 'fld_image_of_doctor' not in request.FILES:
#                       return JsonResponse({'error': 'Image file not provided.'}, status=400)
#
#                   # Handle file upload
#                   image_file = request.FILES['fld_image_of_doctor']
#                   folder = 'doctor_images_uploads'
#                   fs = FileSystemStorage(location=f"{settings.MEDIA_ROOT}/{folder}")
#                   filename = fs.save(image_file.name, image_file)
#                   image_url = fs.url(f"{folder}/{filename}")
#
#                   # Extract fields from JSON
#                   fld_rf_id = doctor_data.get('fld_rf_id')
#                   fld_doc_sw_id = doctor_data.get('fld_doc_sw_id')
#                   fld_doc_id = doctor_data.get('fld_doc_id')
#                   fld_date_of_registration = doctor_data.get('fld_date_of_registration')
#                   fld_doc_name = doctor_data.get('fld_doc_name')
#                   fld_designation = doctor_data.get('fld_designation')
#                   fld_specialization = doctor_data.get('fld_specialization')
#                   fld_work_experience = doctor_data.get('fld_work_experience')
#                   fld_department_id = doctor_data.get('fld_department_id')
#                   fld_department_Name = doctor_data.get('fld_department_Name')
#                   fld_practice_location_id = doctor_data.get('fld_practice_location_id')
#                   fld_practice_location_name = doctor_data.get('fld_practice_location_name')
#                   fld_doc_availability = doctor_data.get('fld_doc_availability')
#                   fld_description = doctor_data.get('fld_description')
#                   fld_edu_training = doctor_data.get('fld_edu_training')
#                   fld_achievment_awards = doctor_data.get('fld_achievment_awards')
#                   fld_video_testimonials = doctor_data.get('fld_video_testimonials')
#                   fld_loggedin_user_id = doctor_data.get('fld_loggedin_user_id')
#
#                   # Execute stored procedure
#                   cursor = connection.cursor()
#                   query = """CALL sp_doctor_master(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
#                   values_need_to_insert = (
#                       fld_rf_id, fld_doc_sw_id, fld_doc_id, fld_date_of_registration, fld_doc_name,
#                       fld_designation, fld_specialization, fld_work_experience, fld_department_id,
#                       fld_department_Name, fld_practice_location_id, fld_practice_location_name,
#                       fld_doc_availability, fld_description, fld_edu_training, fld_achievment_awards,
#                       fld_video_testimonials, image_url, fld_loggedin_user_id
#                   )
#                   result = cursor.execute(query, values_need_to_insert)
#
#                   if result:
#                       IsFullyProcessed = "1"
#                       IsPartiallyProcessed = "0"
#                       ReturnStatus = "1"
#                       valid = "1"
#                       ReturnJson_response = {
#                           "status": ReturnStatus,
#                           "responsemessage": "FC doctor data is saved successfully.",
#                           "serverdatetime": receivedDate,
#                       }
#                       stringResponse = json.dumps(ReturnJson_response)
#                   else:
#                       raise Exception("Stored procedure did not return a success indicator.")
#
#                   cursor.close()
#
#               api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed, ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
#               return JsonResponse(ReturnJson_response)
#           else:
#               ReturnError_response = {
#                   "error_level": "3",
#                   "error_message": 'Parameter validation went wrong',
#                   "error_file": "views.py",
#                   "serverdatetime": api_custom_functions.current_date_time_in_format(),
#               }
#               stringResponse = json.dumps(ReturnError_response)
#               api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed, ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
#               api_custom_functions.error_log_insert(
#                   stringResponse, Qid, FormCode, 'sp_error_log_detials',
#                   'mpr_fc_section_17_insert', '1', ReturnStatus, '1'
#               )
#               return JsonResponse(ReturnError_response, status=400)
#
#   except Exception as e:
#       error_data = traceback.format_exc()
#       json_request = json.loads(json_body) if json_body else {}
#       valid = "1"
#       FormCode = json_request.get('FormCode', '')
#       ApiKey = json_request.get('ApiKey', '')
#       AppTypeNo = json_request.get('AppTypeNo', '')
#       AppVersion = json_request.get('AppVersion', '')
#       IsFullyProcessed = "0"
#       IsPartiallyProcessed = "1"
#       ReturnStatus = "3"
#
#       ReturnError_response = {
#           "error_level": "3",
#           "error_message": str(e),
#           "error_file": "views.py",
#           "serverdatetime": api_custom_functions.current_date_time_in_format(),
#       }
#       stringResponse = json.dumps(ReturnError_response)
#
#       api_custom_functions.error_log_insert(
#           stringResponse, Qid, FormCode, 'sp_error_log_detials',
#           'mpr_fc_section_17_insert', '1', ReturnStatus, '1'
#       )
#       api_custom_functions.UpdateQTable(FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed, ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)



@csrf_exempt
#@api_custom_functions.retry_on_deadlock    
def get_doctor_list_data(request):
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
               
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT B.fld_doc_id, AVG(A.fld_rating) AS average_rating,B.fld_doc_name,B.fld_designation,B.fld_specialization,B.fld_department_id,B.fld_department_Name,B.fld_image_of_doctor,YEAR(B.fld_date_of_registration) AS registration_year,B.fld_date_of_registration,B.fld_practice_location_id,B.fld_practice_location_name FROM trn_tbl_posted_review A JOIN master_tbl_doctor B ON A.fld_doc_id = B.fld_doc_id WHERE B.fld_doc_id = B.fld_doc_id and B.fld_is_active='1' GROUP BY fld_doc_id,registration_year,fld_doc_name,fld_designation,fld_specialization,fld_department_Name,fld_image_of_doctor,fld_date_of_registration,fld_department_id,fld_practice_location_id,fld_practice_location_name;")
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
def get_doctor_list_data22(request):
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
               
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT B.fld_date_of_registration,YEAR(CURDATE()) - YEAR(STR_TO_DATE(B.fld_date_of_registration, '%m/%d/%Y')) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(STR_TO_DATE(B.fld_date_of_registration, '%m/%d/%Y'), '%m%d')) AS years_since_registration,B.fld_doc_id, AVG(A.fld_rating) AS average_rating,B.fld_doc_name,B.fld_designation,B.fld_specialization,B.fld_department_id,B.fld_department_Name,B.fld_image_of_doctor,YEAR(B.fld_date_of_registration) AS registration_year,B.fld_date_of_registration,B.fld_practice_location_id,B.fld_practice_location_name FROM trn_tbl_posted_review A JOIN master_tbl_doctor B ON A.fld_doc_id = B.fld_doc_id WHERE B.fld_doc_id = B.fld_doc_id and B.fld_is_active='1' GROUP BY fld_doc_id,registration_year,fld_doc_name,fld_designation,fld_specialization,fld_department_Name,fld_image_of_doctor,fld_date_of_registration,fld_department_id,fld_practice_location_id,fld_practice_location_name,fld_date_of_registration;")
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
def get_edit_doctor(request):
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
               
                #userid = json_request['userid']
                synceddatetime = json_request['synceddatetime']
                FormCode = json_request['FormCode']
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
                fld_rf_id = json_request['fld_rf_id']
              
                jsonData_database = str(json.dumps(json_request))
                Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, receivedDate, synceddatetime)
               
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor where fld_is_active='1' and fld_rf_id='{fld_rf_id}';")
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
def get_doctor_by_place_id(request):
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
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'get_doctor_location')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('get_doctor_location')  # getting the webservice code
            if apikey_validation and parameters_validation and webservice_code != '':
               
                #userid = json_request['userid']
                synceddatetime = json_request['synceddatetime']
                FormCode = json_request['FormCode']
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
                practice_location_id = json_request['fld_practice_location_id']
              
                jsonData_database = str(json.dumps(json_request))
                Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, receivedDate, synceddatetime)
               
                #table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor where fld_is_active='1' and fld_practice_location_id='{practice_location_id}';")
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor WHERE FIND_IN_SET('{practice_location_id}', REPLACE(fld_practice_location_id, '$', ',')) > 0 and fld_is_active='1';")
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
def doctor_delete(request):
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
    image_path=''
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
            if "master_tbl_doctor" in json_request:
                # Extract the list of dictionaries
                json_database = json_request['master_tbl_doctor']
                json_data = json.dumps(json_database)
                # Validate the API key
                apikey_validation = api_custom_functions.apikey_validation(json_request) # validate the API key is present in the json or not
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'doctor_delete')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('doctor_delete')  # getting the webservice code
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
                        fld_doc_id = json_request['fld_doc_id']
                        fld_date_of_registration = json_request['fld_date_of_registration']
                        fld_doc_name = json_request['fld_doc_name']
                        fld_designation = json_request['fld_designation']
                        fld_specialization = json_request['fld_specialization']
                        fld_work_experience = json_request['fld_work_experience']
                        fld_department_id = json_request['fld_department_id']
                        fld_department_Name = json_request['fld_department_Name']
                        fld_practice_location_id = json_request['fld_practice_location_id']
                        fld_practice_location_name = json_request['fld_practice_location_name']
                        fld_doc_availability = json_request['fld_doc_availability']
                        fld_description = json_request['fld_description']
                        fld_edu_training = json_request['fld_edu_training']
                        fld_achievment_awards = json_request['fld_achievment_awards']
                        fld_video_testimonials = json_request['fld_video_testimonials']
                        fld_loggedin_user_id = json_request['fld_loggedin_user_id']
                        sw_id = json_request['fld_doc_sw_id']
                        image_url = json_request['fld_image_of_doctor']
                        fld_system_inserted_datetime = json_request['fld_system_inserted_datetime']
                    
                        cursor = connection.cursor()
                        query = """CALL sp_doctor_deletion(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                        values_need_to_insert = (
                            fld_rf_id, sw_id, fld_doc_id, fld_date_of_registration, fld_doc_name, fld_designation, 
                            fld_specialization, fld_work_experience, fld_department_id, fld_department_Name, 
                            fld_practice_location_id, fld_practice_location_name, fld_doc_availability, fld_description, 
                            fld_edu_training, fld_achievment_awards, fld_video_testimonials, image_url, fld_loggedin_user_id,fld_system_inserted_datetime
                        )
                        result=cursor.execute(query, values_need_to_insert)
                        cursor = connection.cursor()
                        cursor.execute("SELECT fld_image_of_doctor FROM master_tbl_doctor WHERE fld_doc_id = %s", [fld_doc_id])
                        result = cursor.fetchone()
                        image_file = result[0] if result else None
                        if image_file:
                        # Build the full path of the image
                           image_path = os.path.join(settings.MEDIA_ROOT, 'doctor_images_uploads', image_file)
                        
                        # Check if the image file exists, then delete it
                        if os.path.exists(image_path):
                            os.remove(image_path)
                            print(f"Deleted: {image_path}")
                        else:
                            print(f"Image file {image_file} not found.")

                    if result:
                        IsFullyProcessed = "1"
                        IsPartiallyProcessed = "0"
                        ReturnStatus = "1"
                        valid = "1"
                        ReturnJson_response = {
                            "status": ReturnStatus,
                            "responsemessage": f"Doctor deleted succesfully ",
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



@csrf_exempt
#@api_custom_functions.retry_on_deadlock    
def get_doctoget_doctor_by_id_data(request):
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
                parameters_validation = api_custom_functions.parameters_validation(json_request, 'get_doctor_by_id')  # validation parameters
                webservice_code = api_custom_functions.web_service_code('get_doctor_by_id')  # getting the webservice code
            if apikey_validation and parameters_validation and webservice_code != '':
               
                #userid = json_request['userid']
                synceddatetime = json_request['synceddatetime']
                FormCode = json_request['FormCode']
                ApiKey = json_request['ApiKey']
                AppTypeNo = json_request['AppTypeNo']
                AppVersion = json_request['AppVersion']
                fld_rf_id = json_request['fld_rf_id']
              
                jsonData_database = str(json.dumps(json_request))
                Qid = api_custom_functions.inserQtable_data(FormCode, jsonData_database, receivedDate, synceddatetime)
               
                #table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor where fld_is_active='1' and fld_practice_location_id='{practice_location_id}';")
                table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT B.fld_doc_id, AVG(A.fld_rating) AS average_rating, B.fld_doc_name, B.fld_designation, B.fld_specialization,B.fld_department_id, B.fld_department_Name, B.fld_image_of_doctor,B.fld_date_of_registration, B.fld_practice_location_id, B.fld_practice_location_name,COUNT(A.fld_rating) AS total_review FROM trn_tbl_posted_review A JOIN master_tbl_doctor B ON A.fld_doc_id = B.fld_doc_id WHERE B.fld_is_active = '1' and B. fld_rf_id='{fld_rf_id}' GROUP BY B.fld_doc_id, B.fld_doc_name, B.fld_designation, B.fld_specialization, B.fld_department_Name, B.fld_image_of_doctor, B.fld_date_of_registration, B.fld_department_id, B.fld_practice_location_id, B.fld_practice_location_name;")
                if table_data:
                    table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT B.fld_doc_id, AVG(A.fld_rating) AS average_rating, B.fld_doc_name, B.fld_designation, B.fld_specialization,B.fld_department_id, B.fld_department_Name, B.fld_image_of_doctor,B.fld_date_of_registration, B.fld_practice_location_id, B.fld_practice_location_name,B.fld_achievment_awards,B.fld_video_testimonials,B.fld_edu_training,B.fld_description,B.fld_work_experience,B.fld_doc_availability,COUNT(A.fld_rating) AS total_review FROM trn_tbl_posted_review A JOIN master_tbl_doctor B ON A.fld_doc_id = B.fld_doc_id WHERE B.fld_is_active = '1' and B. fld_rf_id='{fld_rf_id}' GROUP BY B.fld_doc_id, B.fld_doc_name, B.fld_designation, B.fld_specialization, B.fld_department_Name,B.fld_image_of_doctor, B.fld_date_of_registration, B.fld_department_id, B.fld_practice_location_id,B.fld_practice_location_name,B.fld_achievment_awards,B.fld_video_testimonials,B.fld_edu_training,B.fld_description,B.fld_work_experience,B.fld_doc_availability;")
                else:
                    table_data = api_custom_functions.getting_data_in_dictionary_format(f"SELECT * FROM master_tbl_doctor where fld_is_active='1' and fld_rf_id='{fld_rf_id}';")
                
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