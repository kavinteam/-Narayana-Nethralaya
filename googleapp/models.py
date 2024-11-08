from django.db import models

# Create your models here.
class Trn_tbl_new_review(models.Model):
    fld_slno = models.AutoField(primary_key=True)
    fld_rn = models.IntegerField(db_index=True,null=True)
    fld_rf_id = models.IntegerField(db_index=True,null=True)
    fld_review_sw_id = models.CharField(max_length=255,null=True)
    fld_review_id = models.CharField(max_length=255,null=True)
    fld_review_date = models.CharField(max_length=255,null=True)
    fld_place_id = models.TextField(null=True)
    fld_place_name = models.TextField(null=True)
    fld_author_name = models.TextField(null=True)
    fld_rating = models.TextField(null=True)
    fld_review_text = models.TextField(null=True)
    fld_review_link = models.TextField(null=True)
    fld_is_postd_arch  = models.TextField(null=True)
    fld_loggedin_user_id = models.TextField(null=True)
    fld_is_active = models.CharField(db_index=True,max_length =2,null=True)
    fld_system_inserted_datetime = models.CharField(max_length=50,default=0)
    fld_modified_no = models.IntegerField(null=True)
    fld_modified_datetime = models.CharField(max_length=50,null=True)
    fld_is_deleted = models.CharField(db_index=True,max_length =2, null=True)
    fld_is_deleted_datetime = models.CharField(max_length =100, null=True)
    fld_reason_for_deletion = models.TextField(null=True)
    class Meta:
        db_table = "trn_tbl_new_review"


# Create your models here.
class Trn_tbl_posted_review(models.Model):
    fld_slno = models.AutoField(primary_key=True)
    fld_rn = models.IntegerField(db_index=True,null=True)
    fld_rf_id = models.IntegerField(db_index=True,null=True)
    fld_review_sw_id = models.CharField(max_length=255,null=True)
    fld_review_id = models.CharField(max_length=255,null=True)
    fld_author_name = models.TextField(null=True)
    fld_review_date = models.CharField(max_length=255,null=True)
    fld_place_id = models.TextField(null=True)
    fld_place_name = models.TextField(null=True)
    fld_rating = models.TextField(null=True)
    fld_review_text = models.TextField(null=True)
    fld_review_link = models.TextField(null=True)
    fld_doc_sw_id  = models.TextField(null=True)
    fld_doc_id  = models.TextField(null=True)
    fld_doc_name  = models.TextField(null=True)
    fld_posted_as_id  = models.TextField(null=True)
    fld_posted_as_name  = models.TextField(null=True)
    fld_loggedin_user_id = models.TextField(null=True)
    fld_is_active = models.CharField(db_index=True,max_length =2,null=True)
    fld_system_inserted_datetime = models.CharField(max_length=50,default=0)
    fld_modified_no = models.IntegerField(null=True)
    fld_modified_datetime = models.CharField(max_length=50,null=True)
    fld_is_deleted = models.CharField(db_index=True,max_length =2, null=True)
    fld_is_deleted_datetime = models.CharField(max_length =100, null=True)
    fld_reason_for_deletion = models.TextField(null=True)
    class Meta:
        db_table = "trn_tbl_posted_review"

# Create your models here.

class Master_tbl_doctor(models.Model):
    fld_slno = models.AutoField(primary_key=True)
    fld_rn = models.IntegerField(db_index=True,null=True)
    fld_rf_id = models.IntegerField(db_index=True,null=True)
    fld_doc_sw_id= models.CharField(max_length=255,null=True)
    fld_doc_id= models.CharField(max_length=255,null=True)
    fld_date_of_registration= models.CharField(max_length=255,null=True)
    fld_doc_name= models.CharField(max_length=255,null=True)
    fld_designation= models.TextField(null=True)
    fld_specialization= models.CharField(max_length=255,null=True)
    fld_work_experience= models.TextField(null=True)
    fld_department_id= models.TextField(null=True)
    fld_department_Name= models.TextField(null=True)
    fld_practice_location_id= models.TextField(null=True)
    fld_practice_location_name= models.TextField(null=True)
    fld_doc_availability = models.TextField(null=True)
    fld_description = models.TextField(null=True)
    fld_edu_training = models.TextField(null=True)
    fld_achievment_awards = models.TextField(null=True)
    fld_video_testimonials = models.TextField(null=True)
    fld_image_of_doctor = models.TextField(null=True)
    fld_loggedin_user_id = models.CharField(max_length=100,null=True)
    fld_is_active = models.CharField(db_index=True,max_length =2,null=True)
    fld_system_inserted_datetime = models.CharField(max_length=50,default=0)
    fld_modified_no = models.IntegerField(null=True)
    fld_modified_datetime = models.CharField(max_length=50,null=True)
    fld_is_deleted = models.CharField(db_index=True,max_length =2, null=True)
    fld_is_deleted_datetime = models.CharField(max_length =100, null=True)
    fld_reason_for_deletion = models.TextField(null=True)
    class Meta:
        db_table = "master_tbl_doctor"


class Master_tbl_user(models.Model):
    fld_slno = models.AutoField(primary_key=True)
    fld_rn = models.IntegerField(db_index=True,null=True)
    fld_rf_id = models.IntegerField(db_index=True,null=True)
    fld_role_swid = models.CharField(max_length=50, null=True)
    fld_role_code = models.CharField(max_length=50, null=True)
    fld_role_name = models.CharField(db_index=True,max_length=100, null=True)
    fld_user_swid = models.CharField(max_length=50, null=True)
    fld_user_id = models.CharField(db_index=True,max_length=250, null=True)
    fld_password = models.CharField(db_index=True,max_length=250, null=True)
    fld_name = models.CharField(db_index=True,max_length=250, null=True)
    fld_mobile_no = models.CharField(db_index=True,max_length=100, null=True)
    fld_email_id = models.TextField(db_index=True,null=True)
    fld_gender_id = models.CharField(db_index=True,max_length=50, null=True)
    fld_gender_name = models.CharField(db_index=True,max_length=50, null=True)
    fld_age = models.CharField(db_index=True,max_length=50, null=True)
    fld_date_of_joining= models.CharField(max_length=50,null=True)
    fld_date_of_leaving= models.CharField(max_length=50,null=True)
    fld_reason_for_leaving= models.TextField(db_index=True,null=True)
    fld_reporting_role_code = models.CharField(db_index=True,max_length=50, null=True)
    fld_reporting_role_name = models.CharField(max_length=100, null=True)
    fld_reporting_userid = models.CharField(db_index=True,max_length=250,null=True)
    fld_reporting_name = models.CharField(max_length=255,null=True)
    fld_is_active = models.CharField(db_index=True,max_length =2,null=True)
    fld_qid = models.CharField(db_index=True,max_length =100, null=True)
    fld_system_inserted_datetime = models.CharField(max_length=50,null=True)
    fld_is_deleted = models.CharField(db_index=True,max_length =2, null=True)
    fld_is_deleted_datetime = models.CharField(max_length =100, null=True)
    fld_reason_for_deletion = models.TextField(null=True)
    fld_modified_no = models.IntegerField(null=True)
    fld_modified_datetime = models.CharField(max_length=50,null=True)
    fld_web_version = models.CharField(max_length=50,null=True)
    fld_db_version = models.CharField(max_length=50,null=True) 
    fld_data_source = models.CharField(max_length=100,null=True)
    class Meta:
        db_table = "master_tbl_user"

class trn_tbl_q_detials(models.Model):
    fld_sn = models.AutoField(primary_key=True)
    fld_rn  = models.IntegerField(db_index=True,null=True )
    fld_q_id  = models.CharField(max_length=50,db_index=True,null=True )
    fld_form_code = models.CharField(max_length =50, null=True)
    fld_ws_form_code = models.CharField(max_length =50, null=True)
    fld_received_json_text = models.TextField(null=True)
    fld_server_rec_datetime = models.CharField(db_index=True,max_length =100, null=True)
    fld_returned_json_text = models.TextField(null=True)
    fld_returned_datetime = models.CharField(db_index=True,max_length =100, null=True)
    fld_process_time = models.CharField(db_index=True,max_length =100, null=True)
    fld_is_json_valid = models.CharField(db_index=True,max_length =50, null=True)
    fld_is_fully_processed = models.CharField(db_index=True,max_length =45, null=True)
    fld_is_partially_processed  = models.CharField(db_index=True,max_length =45, null=True)
    fld_return_status  = models.CharField(db_index=True,max_length =45, null=True)
    fld_api_key = models.CharField(db_index=True,max_length =45, null=True)
    fld_app_type_no  = models.CharField(db_index=True,max_length =45, null=True)
    fld_web_service_version_no  = models.CharField(db_index=True,max_length =45, null=True)
    fld_app_version  = models.CharField(db_index=True,max_length =45, null=True)
    fld_sys_inserted_datetime = models.CharField(db_index=True,max_length =100, null=True)
    fld_mobile_sync_datetime = models.CharField(db_index=True,max_length =100, null=True)
    fld_is_active  = models.IntegerField(null=True)
    fld_is_deleted = models.CharField(db_index=True,max_length =2, null=True)
    fld_sent_to_server = models.CharField(db_index=True,max_length =2, null=True)
    fld_data_source = models.CharField(max_length=100,null=True)
    fld_data_share_by = models.CharField(max_length=50,null=True)
    fld_data_share_to = models.CharField(max_length=50,null=True)
    class Meta:
        db_table = "trn_tbl_q_detials"

class cmn_error_logCREATE(models.Model):
    fld_slno = models.AutoField(primary_key=True)
    fld_error_at = models.CharField(max_length=100,null=True)
    fld_error_occuerd_fun_met_name = models.CharField(max_length=150,null=True)
    fld_error_msg = models.TextField(null=True)
    fld_sys_inserted_datetime = models.CharField(max_length=100,null=True)
    fld_web_version = models.CharField(max_length=100,null=True)
    fld_db_version = models.CharField(max_length=100,null=True)
    class Meta:
        db_table = "cmn_error_logCREATE"
        
class cmn_mobile_error_log(models.Model):
    fld_sn = models.AutoField(primary_key=True)
    fld_rn =  models.IntegerField(db_index=True,null=True )
    fld_q_id = models.CharField(max_length=20,null=True)
    fld_form_code = models.CharField(max_length=20,null=True)
    fld_error_code = models.CharField(max_length=20,null=True)
    fld_sys_inserted_datetime = models.CharField(max_length=100,null=True)
    fld_error_message = models.TextField(null=True)
    fld_method_name =  models.CharField(max_length=50,null=True)
    fld_sp_name = models.TextField(null=True)
    fld_error_severity = models.IntegerField(db_index=True,null=True )
    fld_error_status = models.IntegerField(db_index=True,null=True )
    class Meta:
        db_table = "cmn_mobile_error_log"


class master_trn_updatecheck(models.Model):
    fld_slno = models.AutoField(primary_key=True)
    fld_rn = models.IntegerField(db_index=True,null=True )
    fld_rf_id = models.IntegerField(db_index=True,null=True )
    fld_web_version = models.CharField(max_length =20, null=True)
    fld_db_version = models.CharField(max_length =20, null=True)
    fld_web_service_version = models.CharField(max_length =20, null=True)
    fld_mob_version_code = models.CharField(max_length =20, null=True)
    fld_mob_version_name = models.CharField(max_length =20, null=True)
    fld_file_name = models.TextField(null=True)
    fld_start_date = models.CharField(db_index=True,max_length =100, null=True)
    fld_end_date = models.CharField(db_index=True,max_length =100, null=True)
    fld_is_active  = models.IntegerField(null=True)
    fld_is_deleted = models.CharField(db_index=True,max_length =2, null=True)
    fld_sys_inserted_datetime = models.CharField(db_index=True,max_length =25, null=True)
    fld_remarks = models.CharField(db_index=True,max_length =100, null=True)
    class Meta:
        db_table = "master_trn_updatecheck"









#ALTER DATABASE google_review CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
#ALTER TABLE googleReview MODIFY text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
#ALTER TABLE googleReview CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
#ALTER TABLE googleReview MODIFY text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
