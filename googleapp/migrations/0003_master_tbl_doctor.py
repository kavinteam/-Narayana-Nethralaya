# Generated by Django 4.2.11 on 2024-08-31 04:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('googleapp', '0002_delete_master_tbl_doctor'),
    ]

    operations = [
        migrations.CreateModel(
            name='Master_tbl_doctor',
            fields=[
                ('fld_slno', models.AutoField(primary_key=True, serialize=False)),
                ('fld_rn', models.IntegerField(db_index=True, null=True)),
                ('fld_rf_id', models.IntegerField(db_index=True, null=True)),
                ('fld_doc_sw_id', models.CharField(max_length=255, null=True)),
                ('fld_doc_id', models.CharField(max_length=255, null=True)),
                ('fld_date_of_registration', models.CharField(max_length=255, null=True)),
                ('fld_doc_name', models.CharField(max_length=255, null=True)),
                ('fld_designation', models.TextField(null=True)),
                ('fld_specialization', models.CharField(max_length=255, null=True)),
                ('fld_work_experience', models.TextField(null=True)),
                ('fld_department_id', models.TextField(null=True)),
                ('fld_department_Name', models.TextField(null=True)),
                ('fld_practice_location_id', models.TextField(null=True)),
                ('fld_practice_location_name', models.TextField(null=True)),
                ('fld_doc_availability', models.TextField(null=True)),
                ('fld_description', models.TextField(null=True)),
                ('fld_edu_training', models.TextField(null=True)),
                ('fld_achievment_awards', models.TextField(null=True)),
                ('fld_video_testimonials', models.TextField(null=True)),
                ('fld_image_of_doctor', models.TextField(null=True)),
                ('fld_loggedin_user_id', models.CharField(max_length=100, null=True)),
                ('fld_is_active', models.CharField(db_index=True, max_length=2, null=True)),
                ('fld_system_inserted_datetime', models.CharField(default=0, max_length=50)),
                ('fld_modified_no', models.IntegerField(null=True)),
                ('fld_modified_datetime', models.CharField(max_length=50, null=True)),
                ('fld_is_deleted', models.CharField(db_index=True, max_length=2, null=True)),
                ('fld_is_deleted_datetime', models.CharField(max_length=100, null=True)),
                ('fld_reason_for_deletion', models.TextField(null=True)),
            ],
            options={
                'db_table': 'master_tbl_doctor',
            },
        ),
    ]
