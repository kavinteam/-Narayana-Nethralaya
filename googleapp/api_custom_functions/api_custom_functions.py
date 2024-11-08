import json,datetime
from django.conf import settings
from django.db import connection
import mysql.connector
from googleapp.models import *
import logging
import mysql.connector
import traceback
import os
#fucntion to check the requested json is valid or not 
def json_validation(json_data):
    try:
        #checking the json_data is having the parameters or not 
        if json.loads(json_data)!=None:
            return True
        else:
            return False
    except Exception as e:
        error_log_insert(str(json.dumps(json_data)),'','','','','1','1','1')
        UpdateQTable('',str(json.dumps(json_data)),'','','','','1','1','1')
    return False
    # except Exception as e:
    #     error_log_insert(str(json.dumps(json_data))),'','','','','1','1','1')
    #     UpdateQTable('',str(json.dumps(json_data))),'','','','','1','1','1')

# Function to insert the error into the database
def error_log_insert(error_json, Qid, formcode, spName, method_name, error_severity, error_status, error_code):
    error_log_upload_sql = "CALL sp_error_log_detials(%s, %s, %s, %s, %s, %s, %s, %s)"
    values_need_to_insert = (error_json, Qid, formcode, spName, method_name, error_severity, error_status, error_code)
    result = Query_execution(error_log_upload_sql, values_need_to_insert)  # Corrected function name to Query_execution
    return result

# Function to check the api key is valid or not
def apikey_validation(json_data):
    #checking the api key from the json data
    try:
        # getting the jason data and fetching the api key from the request
        api_key_from_request = json_data['ApiKey']
        # Checking if the API key matches the expected value
        if api_key_from_request == 'kavin':
            return True
        else:
            return False
    except:
        return False

# Function to check the all the required parameters are available in the json data or not
def parameters_validation(json_data, parameters_of):
    try:
        # Define required parameters based on the specified type
        if parameters_of == 'web_login':
            required_parameters = ['userid', 'password', 'synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'get_new_review':
            required_parameters = ['userid', 'password', 'synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'master_doctor':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'get_doctor':
            required_parameters = ['userid', 'password', 'synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'posted_review':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'posted_review':
            required_parameters = ['fld_practice_location_id','synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'doctor_delete':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'archived_review':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'get_doctor_location':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'get_doctor_by_id':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'get_review_by_doctor':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'get_review_by_place':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'get_doctor_id':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']
        elif parameters_of == 'dashboard':
            required_parameters = ['synceddatetime', 'FormCode', 'ApiKey', 'AppTypeNo', 'AppVersion']

        
        
        # Add more elif blocks for other parameter types if needed
        # Check if all required parameters are present in json_data
        if all(param in json_data.get(parameters_of, {}) for param in required_parameters):
                return True
        # Check if all required parameters are present at the top level of json_data
        keys_from_json = json_data.keys()
        for key in required_parameters:
            if key not in keys_from_json:
                return False
        return True
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return False

    
# Function to get the version code based on the api
def web_service_code(api_name):
    try:
        predefined_codes = {
            "web_login": "201",
            "get_new_review": "202",
            "doctor_insertion": "203",
            "doctor_insertion": "204",
            "posted_review":"205",
            "location":"206",
            "doctor_delete":"207",
            "archived_review":"208",
            "get_doctor_location":"209",
            "get_doctor_by_id":"210",
            "get_review_by_doctor":"211",
            "get_review_by_place":"212",
            "get_doctor_id":"213",
            "dashboard":"214",
            
        }
        if api_name != '' and api_name in predefined_codes:
            return predefined_codes[api_name]
        else:
            raise ValueError(f"Unknown React web service code for API: {api_name}")
    except:
        return False

# Funtion to get the staed procedure name based on the table name
def sp_name_from_table_name(table_name):
    try:
        sp_predefined_dictionary ={
        "tbl_mobile_login_details" : "sp_mobile_login_details",
        "get_new_review" : "get_new_review",
        "tbl_mobile_exception" : "sp_mobile_exception",
        } 
        if table_name in sp_predefined_dictionary:
            return sp_predefined_dictionary[table_name]
        else:
            return table_name
    except:
        return False

# Function to return the data in the dictionary format
def getting_data_in_dictionary_format(sql_query):
    try:
        # Establish a database connection
        mydb = mysql.connector.connect(
            host=settings.DATABASES['default']['HOST'],
            user=settings.DATABASES['default']['USER'],
            passwd=settings.DATABASES['default']['PASSWORD'],
            database=settings.DATABASES['default']['NAME']
        )
        # Fetching the data with column names from the database
        with mydb.cursor(dictionary=True) as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()
        return result      
    except mysql.connector.Error as err:
        # Handle any database errors here
        print(f"Error: {err}")
        return None
    finally:
        # Close the database connection in the 'finally' block to ensure it's always closed
        if mydb.is_connected():
            mydb.close()

# function to insert the Qtable data into the database
def inserQtable_data(WSFormCode,jsonData,receivedDate,syncDateTime):
    cursor = connection.cursor()
    Qid = ''
    sql = "call sp_q_web_detials(%s,%s,%s,%s)"
    values_need_to_insert = (WSFormCode,jsonData,receivedDate,syncDateTime)
    result = cursor.execute(sql,values_need_to_insert)
    if result != None and result != 0:
        Qid = cursor.fetchone()[0]
    else:
        Qid =''
    return Qid

# function to update the Qtable data into the database
def UpdateQTable(FormCode,valid,stringResponse,IsFullyProcessed,IsPartiallyProcessed,ReturnStatus,ApiKey,AppTypeNo,AppVersion,Qid):
    sql_to_update_q_table = """
        UPDATE trn_tbl_q_detials
        SET
            fld_form_code = %s,
            fld_is_json_valid = %s,
            fld_returned_json_text = %s,
            fld_is_fully_processed = %s,
            fld_is_partially_processed = %s,
            fld_return_status = %s,
            fld_returned_datetime = NOW(3),
            fld_process_time = TIMEDIFF(NOW(3), fld_server_rec_datetime),
            fld_api_key = %s,
            fld_app_type_no = %s,
            fld_app_version = %s
        WHERE fld_q_id = %s
    """
    values_to_update_q_table = (FormCode, valid, stringResponse, IsFullyProcessed, IsPartiallyProcessed, ReturnStatus, ApiKey, AppTypeNo, AppVersion, Qid)
    cursor = connection.cursor()
    result = cursor.execute(sql_to_update_q_table,values_to_update_q_table)
    if result != None and result != '':
        return True

# Function to get the current date time in the format of yyyy-mm-dd hh:mm:ss
def current_date_time_in_format():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

import datetime

def new_current_date_time_in_format():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-1]  # Truncate to 5 microseconds

# Function to execute the query
def Query_execution(query,parameters):
    cursor = connection.cursor()
    try:
        if parameters!='':
            result = cursor.execute(query,parameters)
        else:
            result = cursor.execute(query)
        return result
    finally:
        cursor.close()
        
# Function to excecute and return the result
def Query_data_fetch(query,parameters):
    cursor = connection.cursor()
    try:
        if parameters!='':
            result = cursor.execute(query,parameters)
        else:
            result = cursor.execute(query)
        result = cursor.fetchall()
        return result
        # Close cursor and connection
    finally:
        cursor.close()  

def check_dependent_roles(reporting_role_code, reporting_role_name):
    dependent_roles = {
        "FC": ["BC"],
        "BC": ["PO"],
        "PO": ["SPO"],
        "SPO": ["State Head"],
        "State Head": ["Central Head"]
        # Add more dependent roles as needed
    }
    if reporting_role_name in dependent_roles:
        for dependent_role in dependent_roles[reporting_role_name]:
            try:
                # Check if dependent role exists in master_tbl_user
                sql_query = (f"SELECT COUNT(*) AS count FROM master_tbl_user WHERE fld_role_code = %s AND fld_role_name = %s")
                params = (reporting_role_code, reporting_role_name)
                cursor = connection.cursor()
                cursor.execute(sql_query, params)
                result_json = cursor.fetchone()
                result = json.dumps(result_json)
                if not result or result[0] == 0:
                    logging.error(f"For creating the {reporting_role_name} role, the {dependent_role} role must exist. Please create the {dependent_role} role and come back.")
                    return False
            except Exception as e:
                logging.error(f"Error checking dependent roles for {dependent_role}: {str(e)}")
                return False 
    return True

import logging
from django.conf import settings

# Configure logging
logger = logging.getLogger(__name__)

def new_getting_data_in_dictionary_format(sql_query, params):
    try:
        mydb = mysql.connector.connect(
            host=settings.DATABASES['default']['HOST'],
            user=settings.DATABASES['default']['USER'],
            passwd=settings.DATABASES['default']['PASSWORD'],
            database=settings.DATABASES['default']['NAME']
        )
        with mydb.cursor(dictionary=True) as cursor:
            cursor.execute(sql_query, params)
            result = cursor.fetchall()
        return result
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    finally:
        if mydb.is_connected():
            mydb.close()

def Generate_newUserId_get_nextUserid(user_assigned_role_code,state_id,district_id,block_id,role_name):
    try:
        # Your main code
        if user_assigned_role_code == "02":
            # Construct SQL query to retrieve the next available user ID
            sql_query = f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('CH', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user where fld_role_code = '02'"
            result = getting_data_in_dictionary_format(sql_query)
            role_name ='CH'
            if result[0]['max_value'] is None:
                user_id = 'CH01'
                return user_id
            else:
                max_value = result[0]['max_value']  # Assuming 'max_value' is the key in the dictionary
                user_id =  role_name + str(max_value)
                return user_id  
        elif user_assigned_role_code == "03":
            # Construct SQL query to retrieve the next available user ID
            sql_query = f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('SH', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user where fld_role_code = '03'"
            result = getting_data_in_dictionary_format(sql_query)
            role_name ='SH'
            if result[0]['max_value'] is None:
                user_id = str(state_id) + 'SH' + '01'
                return user_id
            else:
                max_value = result[0]['max_value']  # Assuming 'max_value' is the key in the dictionary
                user_id =  str(state_id) + role_name + str(max_value)
                return user_id  

        elif user_assigned_role_code == "04":
            # Construct SQL query to retrieve the next available user ID
            sql_query = f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('SPO', fld_user_id) + 3) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user where fld_role_code = '04'"
            result = getting_data_in_dictionary_format(sql_query)            
            role_name ='SPO'
            if result[0]['max_value'] is None:
                # user_id = str(state_id) + 'SPO' + '01'
                user_id = str(f"{state_id}{role_name}01")
                return user_id  
            else:
                # user_id = str(state_id) + str('SPO') + str(new_userId)
                max_value = result[0]['max_value']  # Assuming 'max_value' is the key in the dictionary
                user_id =  str(state_id)  + role_name + str(max_value)
                return user_id  
        elif user_assigned_role_code == "05":
            # Construct SQL query to retrieve the next available user ID
            sql_query = f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('PO', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user where fld_role_code = '05'"
            result = getting_data_in_dictionary_format(sql_query)
            role_name ='PO'
            if result[0]['max_value'] is None:
                user_id = str(state_id) + 'PO' + '01'
                return user_id  
            else:
                # new_userId = result[0] 
                # user_id = str(state_id) + str(role_name) + str(new_userId)
                # return user_id    
                max_value = result[0]['max_value']  # Assuming 'max_value' is the key in the dictionary
                user_id =  str(state_id)  + role_name + str(max_value)
                return user_id  
        elif user_assigned_role_code == "06":
            # Construct SQL query to retrieve the next available user ID
            sql_query = f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('BC', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user where fld_role_code = '06'"
            result = getting_data_in_dictionary_format(sql_query)
            role_name ='BC'
            if result[0]['max_value'] is None:
                user_id = str(district_id)+ 'BC' + '01'
                return user_id  
            else:
                max_value = result[0]['max_value']  # Assuming 'max_value' is the key in the dictionary
                user_id =  str(district_id)+str(role_name )+ str(max_value)
                return user_id      
        elif user_assigned_role_code == "07":
            # Construct SQL query to retrieve the next available user ID
            sql_query = f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('FC', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user where fld_role_code = '07'"
            result =getting_data_in_dictionary_format(sql_query)
            role_name ='FC'
            if result[0]['max_value'] is None:
                user_id = str(block_id)+ 'FC' + '01'
                return user_id  
            else:
                # new_userId = result[0] 
                # user_id = str(block_id)+str(role_name)+str(new_userId)
                # return user_id   
                max_value = result[0]['max_value']  # Assuming 'max_value' is the key in the dictionary
                user_id =  str(block_id)+ str(role_name )+ str(max_value)
                return user_id
    except Exception as e:
        
        error_data = str(traceback.print_exc())
        error_data = traceback.format_exc()
        code_error = str(print("An error occurred:", error_data))
        # return_json = json.loads(json_body)
        success_info = {
            "status": "2",
            "error_message": str(e),
            "error_file": "views.py",
            "serverdatetime": current_date_time_in_format(),
        }
    return success_info
# Upload a mobile apk file using the web 

def save_uploaded_image(image_file, folder):
    # Create the target directory if it doesn't exist
    target_directory = os.path.join(settings.MEDIA_ROOT, folder)
    if not os.path.exists(target_directory):
        os.makedirs(target_directory)
    # Get the file name and extension
    file_name = image_file.name
    file_extension = file_name.split('.')[-1]
    # Generate a unique file name
    unique_file_name = file_name  # Replace this with your own logic for generating unique names if needed
    # Build the file path
    file_path = os.path.join(target_directory, unique_file_name)
    # Save the image file
    with open(file_path, 'wb') as file:
        for chunk in image_file.chunks():
            file.write(chunk)
    # Return the file path relative to the media root
    return os.path.join(folder, unique_file_name)

#     # Function to return the data in the dictionary format
# def getting_data_in_dictionary_format_userid(sql_query):
#     try:
#         # Establish a database connection
#         mydb = mysql.connector.connect(
#             host=settings.DATABASES['default']['HOST'],
#             user=settings.DATABASES['default']['USER'],
#             passwd=settings.DATABASES['default']['PASSWORD'],
#             database=settings.DATABASES['default']['NAME']
#         )
#         # Fetching the data with column names from the database
#         with mydb.cursor(dictionary=True) as cursor:
#             cursor.execute(sql_query)
#             result = cursor.fetchall()

#         # Fetching the data with column names from the database
#         with mydb.cursor(dictionary=True) as cursor:
#             cursor.execute(sql_query)
#             result = cursor.fetchall()
#         # Convert result to a JSON string
#         result_json = json.dumps(result)
#         return result_json
#     except mysql.connector.Error as err:
#         # Handle any database errors here
#         print(f"Error: {err}")
#         return None
#     finally:
#         # Close the database connection in the 'finally' block to ensure it's always closed
#         if 'mydb' in locals() and mydb.is_connected():
#             mydb.close()
# # sql_query = "SELECT * FROM master_tbl_role"
# # json_data = getting_data_in_dictionary_format_userid(sql_query)
# # # Convert data to JSON string
# # json_data_dumps = json.loads(json_data)
# # print(json_data_dumps)

# def Generate_newUserId_get_nextUserid(user_assigned_role_code, state_id, district_id, block_id, role_name):
#     try:
#         if user_assigned_role_code == "02":
#             sql_query = (f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('CH', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user WHERE fld_role_code = '02'")
#             result_json = getting_data_in_dictionary_format_userid(sql_query)
#             result_newID = json.loads(result_json)
#             role_name = 'CH'
#             if result_newID[0]['max_value'] is None:
#                 user_id = 'CH01'
#                 return user_id
#             else:
#                 max_value = result_newID[0]['max_value']
#                 user_id = f"{role_name}{max_value:02}"
#                 return user_id
#         elif user_assigned_role_code == "03":
#             sql_query = (f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('SH', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user WHERE fld_role_code = '03'")
#             result_json = getting_data_in_dictionary_format(sql_query)
#             result_newID = json.loads(result_json)
#             role_name = 'SH'
#             if result_newID[0]['max_value'] is None:
#                 user_id = f"{state_id}SH01"
#                 return user_id
#             else:
#                 max_value = result_newID[0]['max_value']
#                 user_id = f"{state_id}{role_name}{max_value:02}"
#                 return user_id
#         elif user_assigned_role_code == "04":
#             sql_query = (f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('SPO', fld_user_id) + 3) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user WHERE fld_role_code = '04'")
#             result_json = getting_data_in_dictionary_format_userid(sql_query)
#             result_newID = json.loads(result_json)
#             role_name = 'SPO'
#             if result_newID[0]['max_value'] is None:
#                 user_id = f"{state_id}{role_name}01"
#                 return user_id
#             else:
#                 max_value = result_newID[0]['max_value']
#                 user_id = f"{state_id}{role_name}{max_value:02}"
#                 return user_id
#         elif user_assigned_role_code == "05":
#             sql_query = (f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('PO', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user WHERE fld_role_code = '05'")
#             result_json = getting_data_in_dictionary_format_userid(sql_query)
#             result_newID = json.loads(result_json)
#             role_name = 'PO'
#             if result_newID[0]['max_value'] is None:
#                 user_id = f"{state_id}{role_name}01"
#                 return user_id
#             else:
#                 max_value = result_newID[0]['max_value']
#                 user_id = f"{state_id}{role_name}{max_value:02}"
#                 return user_id
#         elif user_assigned_role_code == "06":
#             sql_query = (f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('BC', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user WHERE fld_role_code = '06'")
#             result_json = getting_data_in_dictionary_format_userid(sql_query)
#             result_newID = json.loads(result_json)
#             role_name = 'BC'
#             if result_newID[0]['max_value'] is None:
#                 user_id = f"{district_id}{role_name}01"
#                 return user_id
#             else:
#                 max_value = result_newID[0]['max_value']
#                 user_id = f"{district_id}{role_name}{max_value:02}"
#                 return user_id
#         elif user_assigned_role_code == "07":
#             sql_query = (f"SELECT LPAD(MAX(CAST(SUBSTRING(fld_user_id, LOCATE('FC', fld_user_id) + 2) AS SIGNED))+1, 2, '0') AS max_value FROM master_tbl_user WHERE fld_role_code = '07'")
#             result_json = getting_data_in_dictionary_format_userid(sql_query)
#             result_newID = json.loads(result_json)
#             role_name = 'FC'
#             if result_newID[0]['max_value'] is None:
#                 user_id = f"{block_id}{role_name}01"
#                 return user_id
#             else:
#                 max_value = result_newID[0]['max_value']
#                 user_id = f"{block_id}{role_name}{max_value:02}"
#                 return user_id

#     except Exception as e:
       
#         error_data = str(traceback.print_exc())
#         error_data = traceback.format_exc()
#         code_error = str(print("An error occurred:", error_data))
#         # return_json = json.loads(json_body)
#         success_info = {
#             "status": "2",
#             "error_message": str(e),
#             "error_file": "views.py",
#             "serverdatetime": current_date_time_in_format(),
#         }
#     return success_info


# Handle the Deadlock exception when its occured 
# import time
# import logging
# import traceback
# from django.db import transaction, OperationalError, connections
# from django.http import JsonResponse

# DEADLOCK_ERROR_CODE = 1213
# MAX_RETRIES = 3

# # Configure logging
# logger = logging.getLogger(__name__)

# def retry_on_deadlock(view_func):
#     def _wrapped_view_func(request, *args, **kwargs):
#         retries = 0
#         while retries < MAX_RETRIES:
#             try:
#                 with transaction.atomic():
#                     return view_func(request, *args, **kwargs)
#             except OperationalError as e:
#                 if e.args[0] == DEADLOCK_ERROR_CODE:
#                     retries += 1
#                     wait_time = 2 ** retries  # Exponential backoff
#                     logger.warning(f"Deadlock detected. Retrying {retries}/{MAX_RETRIES} in {wait_time} seconds.")
#                     time.sleep(wait_time)  # Wait before retrying
#                     # Close all connections to avoid issues
#                     close_all_connections()
#                 else:
#                     logger.error(f"OperationalError occurred: {e}\n{traceback.format_exc()}")
#                     raise
#         logger.error("Max retries reached due to deadlock.")
#         raise OperationalError("Max retries reached due to deadlock")

#     return _wrapped_view_func

# def close_all_connections():
#     """ Close all database connections to ensure no hanging connections """
#     for conn in connections.all():
#         conn.close()


# # Example usage with a Django view
# @retry_on_deadlock
# def example_view(request):
#     # Your view logic here
#     return JsonResponse({"message": "Operation successful."})




# This function read the json one by one and make the value empty or null where the - or -99 or --999 

# def clean_request_data(json_request_data):
#     """Clean the JSON request data by replacing invalid values with None."""
#     def clean_value(value):
#         """Replace invalid values with None."""
#         if value in ['-999', '-99', '-']:
#             return None
#         return value

#     cleaned_data_list = []
#     for data in json_request_data:
#         cleaned_data = {key: clean_value(value) for key, value in data.items()}
#         cleaned_data_list.append(cleaned_data)
    
#     return cleaned_data_list



# import django.db.backends.utils
# from django.db import OperationalError
# import time

# original = django.db.backends.utils.CursorWrapper.execute

# def execute_wrapper(*args, **kwargs):
#     attempts = 0
#     while attempts < 3:
#         try:
#             return original(*args, **kwargs)
#         except OperationalError as e:
#             code = e.args[0]
#             if attempts == 2 or code != 1213:
#                 raise e
#             attempts += 1
#             time.sleep(0.2)

# django.db.backends.utils.CursorWrapper.execute = execute_wrapper
import time
from django.db import OperationalError
def retry_on_deadlock(max_attempts=3, delay=0.2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except OperationalError as e:
                    code = e.args[0] if isinstance(e.args[0], int) else None
                    if code == 1213:  # MySQL deadlock error code
                        attempts += 1
                        time.sleep(delay)
                    else:
                        raise e
            raise OperationalError("Max retry attempts reached for deadlock handling.")
        return wrapper
    return decorator

