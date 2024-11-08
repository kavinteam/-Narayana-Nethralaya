from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
   # path('',views.index,name='index'),
      path('', views.index, name='index'),
      path('fetch_and_store_reviews', views.fetch_and_store_reviews, name='fetch_and_store_reviews'),
      path('web_login', views.web_login, name='web_login'),
      path('get_new_review', views.get_new_review, name='get_new_review'),
      path('doctor_master_creation', views.doctor_master_creation, name='doctor_master_creation'),
      #path('doctor_master_insertion', doctor_creation.doctor_master_insertion, name='doctor_master_insertion'),
      path('get_doctor', views.get_doctor, name='get_doctor'),
      path('posted_review_insertion', views.posted_review_insertion, name='posted_review_insertion'),
      #path('iamge_upload', views.iamge_upload, name='iamge_upload'),
      path('get_doctor_list', views.get_doctor_list, name='get_doctor_list'),
      path('get_edit_doctor_list', views.get_edit_doctor_list, name='get_edit_doctor_list'),
      path('review_archived_update', views.review_archived_update, name='review_archived_update'),
      path('get_doctor_by_place', views.get_doctor_by_place, name='get_doctor_by_place'),
      path('doctor_deletion', views.doctor_deletion, name='doctor_deletion'),
      path('get_doctor_by_id', views.get_doctor_by_id, name='get_doctor_by_id'),
      path('get_review_by_doctor', views.get_review_by_doctor, name='get_review_by_doctor'),
      path('get_review_by_place', views.get_review_by_place, name='get_review_by_place'),
      path('admin_graph', views.admin_graph, name='admin_graph'),

]  

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)