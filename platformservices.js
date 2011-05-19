/*
Copyright © 2009 Nokia. All rights reserved.
Code licensed under the BSD License:
Software License Agreement (BSD License) Copyright © 2009 Nokia.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. 
Neither the name of Nokia Corporation. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Nokia Corporation. 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

version: 1.0
*/


var __device_debug_on__=true;
var err_missing_argument=1003;
var event_cancelled=3;
var err_bad_argument=1002;
var err_InvalidService_Argument=1000;
var err_ServiceNotReady=1006;
var err_ServiceNotSupported=1004;
function __device_debug(_1){
};
function __device_handle_exception(e,_3){
__device_debug(_3);
throw (e);
};
function __device_typeof(_4){
if(_4==undefined){
return "undefined";
}
if(_4 instanceof Object){
if(_4 instanceof String){
return "String";
}else{
if(_4 instanceof Array){
return "Array";
}
}
}
if(typeof _4){
if(typeof _4=="object"){
if(typeof _4=="object"&&!_4){
return "null";
}
}else{
if(typeof _4=="string"){
return "string";
}
}
}
};
if(undefined==com){
var com={};
}
if(typeof com!="object"){
throw ("com defined as non object");
}
if(undefined==com.nokia){
com.nokia={};
}
if(typeof com.nokia!="object"){
throw ("com.nokia defined as non object");
}
if(undefined==com.nokia.device){
com.nokia.device={load:__device_service_load,listServices:__device_service_list,listInterfaces:__device_service_interfaces,version:"0.1",info:"device prototype",};
}else{
throw ("com.nokia.device already defined");
}
com.nokia.device.SORT_ASCENDING=0;
com.nokia.device.SORT_DESCENDING=1;
com.nokia.device.SORT_BY_DATE=0;
com.nokia.device.SORT_BY_SENDER=1;
com.nokia.device.STATUS_READ=0;
com.nokia.device.STATUS_UNREAD=1;
var __device_services_inited=false;
var __device_services=[{"name":"com.nokia.device","version":0.1,"interfaces":[]}];
function __device_services_init(){
if(__device_services_inited){
return;
}
__device_services_inited=true;
try{
__device_services[0].interfaces.push(__device_geolocation_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_camera_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_media_service_entry);
}
catch(e){
}
try{
__device_services[0].interfaces.push(__device_contacts_service_entry);
}
catch(e){
}
try{
__device_services[0].interfaces.push(__device_messaging_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_calendar_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_landmarks_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_event_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_sysinfo_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_sensors_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
};
function __device_get_implementation(i){
return new i.proto(new (i.providers[0].instance));
};
function __device_get_descriptor(i){
return new i.descriptor(new (i.providers[0].descriptor));
};
function __device_get_interface(s,_8,_9){
var i=s.interfaces;
if((_8==null)||(_8=="")){
return __device_get_implementation(i[0]);
}
for(var d in i){
if(i[d].name==null){
__device_update_descriptor(i[d]);
}
if(i[d].name==undefined){
continue;
}
if(i[d].name==_8){
if((_9==null)||(_9=="")||(i[d].version>=_9)){
return __device_get_implementation(i[d]);
}
}
}
return null;
};
function __device_service_load(_c,_d,_e){
__device_services_init();
if((_c!=null)&&(_c!="")&&(_c!="*")){
for(var s in __device_services){
if(_c==__device_services[s].name){
return __device_get_interface(__device_services[s],_d,_e);
}
}
}else{
for(var s in __device_services){
var i=__device_get_interface(__device_services[s],_d,_e);
if(i!=null){
return i;
}
}
}
return null;
};
function __device_update_descriptor(i){
var d=__device_get_descriptor(i);
i.name=d.interfaceName;
i.version=d.version;
};
function __device_interface_list(s){
var _14=new Array();
for(var i in s.interfaces){
if(s.interfaces[i].name==null){
__device_update_descriptor(s.interfaces[i]);
}
if(s.interfaces[i].name==undefined){
continue;
}
_14[i]=new Object();
_14[i].name=s.interfaces[i].name;
_14[i].version=s.interfaces[i].version;
}
return _14;
};
function __device_service_descriptor(s){
this.name=s.name;
this.version=s.version;
this.interfaces=__device_interface_list(s);
this.toString=__device_service_descriptor_to_string;
};
function __device_service_descriptor_to_string(){
var is="\nInterfaces(s): ";
for(i in this.interfaces){
is+="\n"+this.interfaces[i].name+" "+this.interfaces[0].version;
}
return ("Service: "+this.name+is);
};
function __device_service_list(_18,_19,_1a){
__device_services_init();
var _1b=new Array();
var n=0;
if((_18==null)||(_18=="")){
_18=".*";
}
if((_19==null)||(_19=="")){
_19=".*";
}
if((typeof _18!="string")||(typeof _19!="string")){
return _1b;
}
var _1d=new RegExp(_18);
var _1e=new RegExp(_19);
for(var s in __device_services){
if(_1d.test(__device_services[s].name)){
for(var i in __device_services[s].interfaces){
if(__device_services[s].interfaces[i].name==null){
__device_update_descriptor(__device_services[s].interfaces[i]);
}
if(__device_services[s].interfaces[i].name==undefined){
continue;
}
if(_1e.test(__device_services[s].interfaces[i].name)){
if((_1a==null)||(_1a=="")||(__device_services[s].interfaces[i].version>=_1a)){
_1b[n]=new __device_service_descriptor(__device_services[s]);
break;
}
}
}
}
++n;
}
return _1b;
};
function __device_service_interfaces(_21){
__device_services_init();
if(_21==null||_21==undefined||_21==""){
throw new DeviceError("Framework: listInterfaces: serviceName is missing",err_missing_argument);
}
for(var s in __device_services){
if(__device_services[s].name==_21){
return __device_interface_list(__device_services[s]);
}
}
return null;
};
function modifyObjectBaseProp(obj){
for(pro in obj){
if(typeof obj[pro]=="function"){
obj[pro]=0;
}
}
};
DeviceError.prototype=new Error();
DeviceError.prototype.constructor=DeviceError;
function DeviceError(_24,_25){
this.toString=concatenate;
this.code=_25;
this.name="DeviceException";
this.message=_24;
};
function concatenate(){
return (this.name+":"+" "+this.message+" "+this.code);
};
function splitErrorMessage(_26){
if(_26.search(/:/)!=-1){
if((_26.split(":").length)==2){
return _26.split(":")[1];
}
if((_26.split(":").length)>2){
return _26.split(":")[2];
}
}
return _26;
};
var __s60_start_and_wait_cb;
function __s60_on_app_exit(){
widget.onshow=null;
if(__s60_start_and_wait_cb!=null){
__s60_start_and_wait_cb();
}
};
function __s60_on_app_start(){
widget.onhide=null;
widget.onshow=__s60_on_app_exit;
};
function __s60_start_and_wait(id,_28,_29){
__s60_start_and_wait_cb=_29;
widget.onhide=__s60_on_app_start;
widget.openApplication(id,_28);
};
function __s60_api_not_supported(){
throw (err_ServiceNotSupported);
};
function __s60_enumerate_object(_2a,_2b,_2c,_2d){
var key;
for(key in _2a){
var _2f;
if(_2b){
_2f=_2b+"."+key;
}else{
_2f=key;
}
var _30=_2a[key];
if(typeof _30=="object"){
__s60_enumerate_object(_30,_2f,_2c,_2d);
}else{
_2c(_2f,_30,_2d);
}
}
};
var __device_calendar_service_entry={"name":null,"version":null,"proto":__device_calendar,"descriptor":__device_calendar_descriptor,"providers":[{"descriptor":__sp_calendar_descriptor,"instance":__sp_calendar_instance}]};
function __device_calendar(_31){
this.provider=_31;
this.interfaceName=_31.descriptor.interfaceName;
this.version=_31.descriptor.version;
this.startEditor=__device_calendar_startEditor;
this.getList=__device_calendar_getList;
this.addEntry=__device_calendar_add;
this.updateEntry=__device_calendar_update;
this.deleteEntry=__device_calendar_delete;
};
function __device_calendar_descriptor(_32){
this.interfaceName=_32.interfaceName;
this.version=_32.version;
};
function __device_calendar_startEditor(_33,_34){
this.provider.startEditor(_33,_34);
};
function __device_calendar_getList(_35,_36){
return this.provider.getList(_35,_36);
};
function __device_calendar_add(_37){
return this.provider.addEntry(_37);
};
function __device_calendar_update(_38){
return this.provider.updateEntry(_38);
};
function __device_calendar_delete(_39){
this.provider.deleteEntry(_39);
};
function __sp_calendar_descriptor(){
this.interfaceName="com.nokia.device.calendar";
this.version="0.1";
};
function __sp_calendar_instance(){
this.descriptor=new __sp_calendar_descriptor();
this.startEditor=__sp_calendar_startEditor;
this.getList=__sp_calendar_getList;
this.addEntry=__sp_calendar_add;
this.updateEntry=__sp_calendar_update;
this.deleteEntry=__sp_calendar_delete;
this.so=null;
try{
this.so=device.getServiceObject("Service.Calendar","IDataSource");
}
catch(e){
__device_handle_exception(e,"Calendar service not available");
}
};
function __sp_calendar_entry_time(_3a,end,_3c){
if(_3a){
this.begin=_3a;
}
if(end){
this.end=end;
}
if(_3c){
this.alarm=_3c;
}
};
function __sp_device_calendar_entry(_3d){
this.id=_3d.id+":"+_3d.LocalId;
this.type=_3d.Type;
if(_3d.Summary){
this.summary=_3d.Summary;
}
if(_3d.Description){
this.description=_3d.Description;
}
if(_3d.Location){
this.location=_3d.Location;
}
this.time=new __sp_calendar_entry_time(_3d.StartTime,_3d.EndTime,_3d.AlarmTime);
};
function __sp_calendar_entry(_3e,str){
try{
this.Type=_3e.type;
if(_3e.id){
var _40=_3e.id.split(":");
if(_40.length!=2){
throw new DeviceError("Calendar: updateEntry: id is invalid",err_bad_argument);
}
this.id=_40[0];
this.LocalId=_40[1];
}
if(_3e.description){
this.Description=_3e.description;
}
if(_3e.summary){
this.Summary=_3e.summary;
}
if(_3e.location){
this.Location=_3e.location;
}
if(typeof this.Type!="string"){
throw new DeviceError("Calendar: "+str+" Type is not a string",err_bad_argument);
}
switch(this.Type){
case "Meeting":
this.StartTime=_3e.time.begin;
this.EndTime=_3e.time.end;
break;
case "Reminder":
case "Anniversary":
this.StartTime=_3e.time.begin;
break;
case "ToDo":
this.EndTime=_3e.time.end;
break;
case "DayEvent":
this.StartTime=_3e.time.begin;
break;
default:
throw new DeviceError("Calendar: "+str+" Type is Invalid",err_bad_argument);
}
if(_3e.time.alarm){
this.AlarmTime=_3e.time.alarm;
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_entry: "+e);
}
};
function __sp_calendar_iterator(_41){
this.iter=_41;
this.next=__sp_calendar_iterator_get_next;
};
function __sp_calendar_iterator_get_next(){
var _42=this.iter.getNext();
if(typeof _42=="undefined"){
return null;
}
return new __sp_device_calendar_entry(_42);
};
var CALENDAR_APP_ID=268458241;
function __sp_calendar_startEditor(_43,_44){
try{
if(!_43){
throw new DeviceError("Calendar: startEditor: callback is missing",err_missing_argument);
}else{
if(typeof _43!="function"){
throw new DeviceError("Calendar: startEditor: callback is invalid",err_bad_argument);
}
}
var _45=function(_46,_47,_48){
if(_43){
_43(_46,_47,_48);
}
if(_48.ErrorCode!=0){
switch(_48.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_InvalidService_Argument:
case err_ServiceNotSupported:
if(_48.ErrorMessage){
var _49=splitErrorMessage(_48.ErrorMessage);
throw new DeviceError("Calendar: startEditor: "+_49,_48.ErrorCode);
}else{
throw new DeviceError("Calendar: startEditor: Operation Failed",_48.ErrorCode);
}
break;
default:
_43(0,_48.ErrorCode,0);
}
}
};
__s60_start_and_wait(CALENDAR_APP_ID,"",_45);
return 0;
}
catch(e){
__device_handle_exception(e,"__sp_calendar_startEditor: "+e);
}
};
var __sp_calendar_entry_types="MeetingReminderToDoAnniversaryDayEvent";
function __sp_calendar_getList(_4a,_4b){
try{
if(!_4a){
throw new DeviceError("Calendar: getList: callback is missing",err_missing_argument);
}else{
if(typeof _4a!="function"){
throw new DeviceError("Calendar: getList: callback is invalid",err_bad_argument);
}
}
var _4c=function(_4d,_4e,_4f){
var _50=null;
if(_4f.ReturnValue){
_50=new __sp_calendar_iterator(_4f.ReturnValue);
}
_4a(_4d,_4f.ErrorCode,_50);
};
var _51=new Object();
modifyObjectBaseProp(_51);
_51.Type="IncludeAll";
if(_4b){
if(_4b.id){
var _52=_4b.id.split(":");
if(_52.length!=2){
throw new DeviceError("Calendar: getList: id is invalid",err_bad_argument);
}
_51.id=_52[0];
}
if((_4b.type)&&__sp_calendar_entry_types.match(_4b.type)){
_51.Type=_4b.type;
}
if(_4b.range){
if(_4b.range.begin){
_51.StartRange=_4b.range.begin;
}
if(_4b.range.end){
_51.EndRange=_4b.range.end;
}
}
if(_4b.text){
_51.SearchText=_4b.text;
}
}
var _53=new Object();
modifyObjectBaseProp(_53);
_53.Type="CalendarEntry";
_53.Filter=_51;
var _54=this.so.IDataSource.GetList(_53);
if(_54.ErrorCode!=0){
switch(_54.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_InvalidService_Argument:
case err_ServiceNotSupported:
if(_54.ErrorMessage){
var _55=splitErrorMessage(_54.ErrorMessage);
throw new DeviceError("Calendar: getList: "+_55,_54.ErrorCode);
}else{
throw new DeviceError("Calendar: getList: Operation Failed",_54.ErrorCode);
}
break;
default:
_4a(0,_54.ErrorCode,0);
}
}
_4c(null,null,_54);
return 0;
}
catch(e){
__device_handle_exception(e,"sp_calendar_getList: "+e);
}
};
function __sp_calendar_add(_56){
try{
var str="addEntry:";
var _58=new Object();
modifyObjectBaseProp(_58);
_58.Type="CalendarEntry";
_58.Item=new __sp_calendar_entry(_56,str);
var _59=this.so.IDataSource.Add(_58);
if(_59.ErrorCode!=0){
if(_59.ErrorMessage){
var _5a=splitErrorMessage(_59.ErrorMessage);
throw new DeviceError("Calendar: addEntry: "+_5a,_59.ErrorCode);
}else{
throw new DeviceError("Calendar: addEntry: Operation Failed",_59.ErrorCode);
}
}else{
var _5b=_59.ReturnValue+":"+0;
return _5b;
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_add: "+e);
}
};
function __sp_calendar_update(_5c){
try{
var str="updateEntry:";
var _5e=new Object();
modifyObjectBaseProp(_5e);
_5e.Type="CalendarEntry";
_5e.Item=new __sp_calendar_entry(_5c,str);
var _5f=this.so.IDataSource.Add(_5e);
if(_5f.ErrorCode!=0){
if(_5f.ErrorMessage){
var _60=splitErrorMessage(_5f.ErrorMessage);
throw new DeviceError("Calendar: updateEntry: "+_60,_5f.ErrorCode);
}else{
throw new DeviceError("Calendar: updateEntry: Operation Failed",_5f.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_add: "+e);
}
};
function __sp_calendar_delete(_61){
try{
if(!_61.id){
throw new DeviceError("Calendar: deleteEntry: id is missing",err_missing_argument);
}
var _62=new Object();
modifyObjectBaseProp(_62);
_62.Type="CalendarEntry";
_62.Data=new Object();
modifyObjectBaseProp(_62.Data);
_62.Data.IdList=new Array();
var _63=_61.id.split(":");
if(_63.length!=2){
throw new DeviceError("Calendar: deleteEntry: id is invalid",err_bad_argument);
}
_62.Data.IdList.push(_63[0]);
if(_61.range){
if(_61.range.begin){
_62.Data.StartRange=_61.range.begin;
}
if(_61.range.end){
_62.Data.EndRange=_61.range.end;
}
}
var _64=this.so.IDataSource.Delete(_62);
if(_64.ErrorCode!=0){
if(_64.ErrorMessage){
var _65=splitErrorMessage(_64.ErrorMessage);
throw new DeviceError("Calendar: deleteEntry: "+_65,_64.ErrorCode);
}else{
throw new DeviceError("Calendar: deleteEntry: Operation Failed",_64.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_delete: "+e);
}
};
var __device_contacts_service_entry={"name":null,"version":null,"proto":__device_contacts,"descriptor":__device_contacts_descriptor,"providers":[{"descriptor":__sp_contacts_descriptor,"instance":__sp_contacts_instance}]};
function __device_contacts(_66){
this.provider=_66;
this.interfaceName=_66.descriptor.interfaceName;
this.version=_66.descriptor.version;
this.startEditor=__device_contacts_startEditor;
this.getContacts=__device_contacts_getContacts;
this.addContact=__device_contacts_add;
this.updateContact=__device_contacts_update;
this.deleteContacts=__device_contacts_delete;
this.getContactInfo=__device_contacts_getContactInfo;
};
function __device_contacts_descriptor(_67){
this.interfaceName=_67.interfaceName;
this.version=_67.version;
};
function __device_contacts_startEditor(_68,_69){
return this.provider.startEditor(_68,_69);
};
function __device_contacts_getContacts(_6a,_6b,_6c){
return this.provider.getContacts(_6a,_6b,_6c);
};
function __device_contacts_add(_6d){
return this.provider.addContact(_6d);
};
function __device_contacts_update(_6e){
this.provider.updateContact(_6e);
};
function __device_contacts_delete(id){
this.provider.deleteContacts(id);
};
function __device_contacts_getContactInfo(id){
return this.provider.getContactInfo(id);
};
function __sp_contacts_descriptor(){
this.interfaceName="com.nokia.device.contacts";
this.version="0.1";
};
function __sp_contacts_instance(){
this.descriptor=new __sp_contacts_descriptor();
this.startEditor=__sp_contacts_startEditor;
this.getContacts=__sp_contacts_getContacts;
this.addContact=__sp_contacts_add;
this.updateContact=__sp_contacts_update;
this.deleteContacts=__sp_contacts_delete;
this.getContactInfo=__sp_contacts_get;
try{
this.so=device.getServiceObject("Service.Contact","IDataSource");
}
catch(e){
__device_handle_exception(e,"Contacts service not available "+e);
}
};
function __sp_contact_extract(_71,_72,_73){
switch(_71){
case "name.last":
_73.LastName=new Object();
modifyObjectBaseProp(_73.LastName);
_73.LastName.Label="Last name";
_73.LastName.Value=_72;
break;
case "name.first":
_73.FirstName=new Object();
modifyObjectBaseProp(_73.FirstName);
_73.FirstName.Label="First name";
_73.FirstName.Value=_72;
break;
case "name.middle":
_73.SecondName=new Object();
modifyObjectBaseProp(_73.SecondName);
_73.SecondName.Label="Middle name";
_73.SecondName.Value=_72;
break;
case "name.prefix":
_73.Prefix=new Object();
modifyObjectBaseProp(_73.Prefix);
_73.Prefix.Label="Prefix";
_73.Prefix.Value=_72;
break;
case "name.suffix":
_73.Suffix=new Object();
modifyObjectBaseProp(_73.Suffix);
_73.Suffix.Label="Suffix";
_73.Suffix.Value=_72;
break;
case "tel.land":
_73.LandPhoneGen=new Object();
modifyObjectBaseProp(_73.LandPhoneGen);
_73.LandPhoneGen.Label="Landline";
_73.LandPhoneGen.Value=_72;
break;
case "tel.mobile":
_73.MobilePhoneGen=new Object();
modifyObjectBaseProp(_73.MobilePhoneGen);
_73.MobilePhoneGen.Label="Mobile";
_73.MobilePhoneGen.Value=_72;
break;
case "tel.video":
_73.VideoNumberGen=new Object();
modifyObjectBaseProp(_73.VideoNumberGen);
_73.VideoNumberGen.Label="Video";
_73.VideoNumberGen.Value=_72;
break;
case "tel.fax":
_73.FaxNumberGen=new Object();
modifyObjectBaseProp(_73.FaxNumberGen);
_73.FaxNumberGen.Label="Fax";
_73.FaxNumberGen.Value=_72;
break;
case "tel.voip:":
_73.VOIPGen=new Object();
modifyObjectBaseProp(_73.VOIPGen);
_73.VOIPGen.Label="Voip";
_73.VOIPGen.Value=_72;
break;
case "tel.home.land":
_73.LandPhoneHome=new Object();
modifyObjectBaseProp(_73.LandPhoneHome);
_73.LandPhoneHome.Label="Home Landline";
_73.LandPhoneHome.Value=_72;
break;
case "tel.home.mobile":
_73.MobilePhoneHome=new Object();
modifyObjectBaseProp(_73.MobilePhoneHome);
_73.MobilePhoneHome.Label="Home Mobile";
_73.MobilePhoneHome.Value=_72;
break;
case "tel.home.video":
_73.VideoNumberHome=new Object();
modifyObjectBaseProp(_73.VideoNumberHome);
_73.VideoNumberHome.Label="Home Video";
_73.VideoNumberHome.Value=_72;
break;
case "tel.home.fax":
_73.FaxNumberHome=new Object();
modifyObjectBaseProp(_73.FaxNumberHome);
_73.FaxNumberHome.Label="Home Fax";
_73.FaxNumberHome.Value=_72;
break;
case "tel.home.voip:":
_73.VOIPHome=new Object();
modifyObjectBaseProp(_73.VOIPHome);
_73.VOIPHome.Label="Home Voip";
_73.VOIPHome.Value=_72;
break;
case "tel.work.land":
_73.LandPhoneWork=new Object();
modifyObjectBaseProp(_73.LandPhoneWork);
_73.LandPhoneWork.Label="Work Landline";
_73.LandPhoneWork.Value=_72;
break;
case "tel.work.mobile":
_73.MobilePhoneWork=new Object();
modifyObjectBaseProp(_73.MobilePhoneWork);
_73.MobilePhoneWork.Label="Work Mobile";
_73.MobilePhoneWork.Value=_72;
break;
case "tel.work.video":
_73.VideoNumberWork=new Object();
modifyObjectBaseProp(_73.VideoNumberWork);
_73.VideoNumberWork.Label="Work Video";
_73.VideoNumberWork.Value=_72;
break;
case "tel.work.fax":
_73.FaxNumberWork=new Object();
modifyObjectBaseProp(_73.FaxNumberWork);
_73.FaxNumberWork.Label="Work Fax";
_73.FaxNumberWork.Value=_72;
break;
case "tel.work.voip:":
_73.VOIPWork=new Object();
modifyObjectBaseProp(_73.VOIPWork);
_73.VOIPWork.Label="Work Voip";
_73.VOIPWork.Value=_72;
break;
case "address.street":
_73.AddrStreetGen=new Object();
modifyObjectBaseProp(_73.AddrStreetGen);
_73.AddrStreetGen.Label="Street Address";
_73.AddrStreetGen.Value=_72;
break;
case "address.local":
_73.AddrLocalGen=new Object();
modifyObjectBaseProp(_73.AddrLocalGen);
_73.AddrLocalGen.Label="City";
_73.AddrLocalGen.Value=_72;
break;
case "address.region":
_73.AddrRegionGen=new Object();
modifyObjectBaseProp(_73.AddrRegionGen);
_73.AddrRegionGen.Label="State/Province";
_73.AddrRegionGen.Value=_72;
break;
case "address.code":
_73.AddrPostCodeGen=new Object();
modifyObjectBaseProp(_73.AddrPostCodeGen);
_73.AddrPostCodeGen.Label="Postal code";
_73.AddrPostCodeGen.Value=_72;
break;
case "address.country":
_73.AddrCountryGen=new Object();
modifyObjectBaseProp(_73.AddrCountryGen);
_73.AddrCountryGen.Label="Country";
_73.AddrCountryGen.Value=_72;
break;
case "address.email":
_73.EmailGen=new Object();
modifyObjectBaseProp(_73.EmailGen);
_73.EmailGen.Label="EMail";
_73.EmailGen.Value=_72;
break;
case "address.url":
_73.URLGen=new Object();
modifyObjectBaseProp(_73.URLGen);
_73.URLGen.Label="Website";
_73.URLGen.Value=_72;
break;
case "address.home.street":
_73.AddrStreetHome=new Object();
modifyObjectBaseProp(_73.AddrStreetHome);
_73.AddrStreetHome.Label="Home Address";
_73.AddrStreetHome.Value=_72;
break;
case "address.home.local":
_73.AddrLocalHome=new Object();
modifyObjectBaseProp(_73.AddrLocalHome);
_73.AddrLocalHome.Label="City";
_73.AddrLocalHome.Value=_72;
break;
case "address.home.region":
_73.AddrRegionHome=new Object();
modifyObjectBaseProp(_73.AddrRegionHome);
_73.AddrRegionHome.Label="State/Province";
_73.AddrRegionHome.Value=_72;
break;
case "address.home.code":
_73.AddrPostCodeHome=new Object();
modifyObjectBaseProp(_73.AddrPostCodeHome);
_73.AddrPostCodeHome.Label="Postal code";
_73.AddrPostCodeHome.Value=_72;
break;
case "address.home.country":
_73.AddrCountryHome=new Object();
modifyObjectBaseProp(_73.AddrCountryHome);
_73.AddrCountryHome.Label="Country";
_73.AddrCountryHome.Value=_72;
break;
case "address.home.email":
_73.EmailHome=new Object();
modifyObjectBaseProp(_73.EmailHome);
_73.EmailHome.Label="Home EMail";
_73.EmailHome.Value=_72;
break;
case "address.home.url":
_73.URLHome=new Object();
modifyObjectBaseProp(_73.URLHome);
_73.URLHome.Label="Home Website";
_73.URLHome.Value=_72;
break;
case "address.work.street":
_73.AddrStreetWork=new Object();
modifyObjectBaseProp(_73.AddrStreetWork);
_73.AddrStreetWork.Label="Work Address";
_73.AddrStreetWork.Value=_72;
break;
case "address.work.local":
_73.AddrLocalWork=new Object();
modifyObjectBaseProp(_73.AddrLocalWork);
_73.AddrLocalWork.Label="City";
_73.AddrLocalWork.Value=_72;
break;
case "address.work.region":
_73.AddrRegionWork=new Object();
modifyObjectBaseProp(_73.AddrRegionWork);
_73.AddrRegionWork.Label="State/Province";
_73.AddrRegionWork.Value=_72;
break;
case "address.work.code":
_73.AddrPostCodeWork=new Object();
modifyObjectBaseProp(_73.AddrPostCodeWork);
_73.AddrPostCodeWork.Label="Postal code";
_73.AddrPostCodeWork.Value=_72;
break;
case "address.work.country":
_73.AddrCountryWork=new Object();
modifyObjectBaseProp(_73.AddrCountryWork);
_73.AddrCountryWork.Label="Country";
_73.AddrCountryWork.Value=_72;
break;
case "address.work.email":
_73.EmailWork=new Object();
modifyObjectBaseProp(_73.EmailWork);
_73.EmailWork.Label="Work EMail";
_73.EmailWork.Value=_72;
break;
case "address.work.url":
_73.URLWork=new Object();
modifyObjectBaseProp(_73.URLWork);
_73.URLWork.Label="Work Website";
_73.URLWork.Value=_72;
break;
case "company.name":
_73.CompanyName=new Object();
modifyObjectBaseProp(_73.CompanyName);
_73.CompanyName.Label="Company";
_73.CompanyName.Value=_72;
break;
case "company.title":
_73.JobTitle=new Object();
modifyObjectBaseProp(_73.JobTitle);
_73.JobTitle.Label="Title";
_73.JobTitle.Value=_72;
break;
case "id":
_73.id=_72;
break;
}
};
function __sp_device_contact_build(_74,_75){
__s60_enumerate_object(_74,null,__sp_device_contact_extract,_75);
};
function __sp_device_contact_extract(_76,_77,_78){
if(_76=="id"){
_78.id=_77;
return;
}
if(!_76.match(".Value")){
return;
}
try{
if(_76.match("Name")){
if(_76.match("CompanyName")){
if(!_78.company){
_78.company=new Object();
}
}else{
if(!_78.name){
_78.name=new Object();
}
}
}else{
if(_76.match("Phone")||_76.match("Number")||_76.match("VOIP")){
if(!_78.tel){
_78.tel=new Object();
}
if(_76.match("Home")){
if(!_78.tel.home){
_78.tel.home=new Object();
}
}else{
if(_76.match("Work")){
if(!_78.tel.work){
_78.tel.work=new Object();
}
}
}
}else{
if(_76.match("Addr")||_76.match("Email")||_76.match("URL")){
if(!_78.address){
_78.address=new Object();
}
if(_76.match("Home")){
if(!_78.address.home){
_78.address.home=new Object();
}
}else{
if(_76.match("Work")){
if(!_78.address.work){
_78.address.work=new Object();
}
}
}
}else{
if(_76.match("JobTitle")){
if(!_78.company){
_78.company=new Object();
}
}
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_device_contact_extract: "+e);
}
switch(_76){
case "LastName.Value":
_78.name.last=_77;
break;
case "FirstName.Value":
_78.name.first=_77;
break;
case "SecondName.Value":
_78.name.middle=_77;
break;
case "Prefix.Value":
_78.name.prefix=_77;
break;
case "Suffix.Value":
_78.name.suffix=_77;
break;
case "LandPhoneGen.Value":
_78.tel.land=_77;
break;
case "MobilePhoneGen.Value":
_78.tel.mobile=_77;
break;
case "VideoNumberGen.Value":
_78.tel.video=_77;
break;
case "FaxNumberGen.Value":
_78.tel.fax=_77;
break;
case "VOIPGen.Value":
_78.tel.voip=_77;
break;
case "LandPhoneHome.Value":
_78.tel.home.land=_77;
break;
case "MobilePhoneHome.Value":
_78.tel.home.mobile=_77;
break;
case "VideoNumberHome.Value":
_78.tel.home.video=_77;
break;
case "FaxNumberHome.Value":
_78.tel.home.fax=_77;
break;
case "VoipHome.Value":
_78.tel.home.voip=_77;
break;
case "LandPhoneWork.Value":
_78.tel.work.land=_77;
break;
case "MobilePhoneWork.Value":
_78.tel.work.mobile=_77;
break;
case "VideoNumberWork.Value":
_78.tel.work.video=_77;
break;
case "FaxNumberWork.Value":
_78.tel.work.fax=_77;
break;
case "VoipWork.Value":
_78.tel.work.voip=_77;
break;
case "AddrStreetGen.Value":
_78.address.street=_77;
break;
case "AddrLocalGen.Value":
_78.address.local=_77;
break;
case "AddrRegionGen.Value":
_78.address.region=_77;
break;
case "AddrPostCodeGen.Value":
_78.address.code=_77;
break;
case "AddrCountryGen.Value":
_78.address.country=_77;
break;
case "EmailGen.Value":
_78.address.email=_77;
break;
case "URLGen.Value":
_78.address.url=_77;
break;
case "AddrStreetHome.Value":
_78.address.home.street=_77;
break;
case "AddrLocalHome.Value":
_78.address.home.local=_77;
break;
case "AddrRegionHome.Value":
_78.address.home.region=_77;
break;
case "AddrPostCodeHome.Value":
_78.address.home.code=_77;
break;
case "AddrCountryHome.Value":
_78.address.home.country=_77;
break;
case "EmailHome.Value":
_78.address.home.email=_77;
break;
case "URLHome.Value":
_78.address.home.url=_77;
break;
case "AddrStreetWork.Value":
_78.address.work.street=_77;
break;
case "AddrLocalWork.Value":
_78.address.work.local=_77;
break;
case "AddrRegionWork.Value":
_78.address.work.region=_77;
break;
case "AddrPostCodeWork.Value":
_78.address.work.code=_77;
break;
case "AddrCountryWork.Value":
_78.address.work.country=_77;
break;
case "EmailWork.Value":
_78.address.work.email=_77;
break;
case "URLWork.Value":
_78.address.work.url=_77;
break;
case "CompanyName.Value":
_78.company.name=_77;
break;
case "JobTitle.Value":
_78.company.title=_77;
break;
default:
}
};
function __sp_contact_iterator(_79){
this.iter=_79;
this.next=__sp_contact_iterator_get_next;
};
function __sp_contact_iterator_get_next(){
var _7a=this.iter.getNext();
if(typeof _7a=="undefined"){
return null;
}
var _7b=new Object();
__sp_device_contact_build(_7a,_7b);
return _7b;
};
var CONTACTS_APP_ID=270486734;
function __sp_contacts_startEditor(_7c,_7d){
var _7e=function(_7f,_80,_81){
_7c(_7f,_80,_81);
};
__s60_start_and_wait(CONTACTS_APP_ID,"",_7e);
return 0;
};
function __sp_contacts_getContacts(_82,_83,_84){
var _85=new Object();
modifyObjectBaseProp(_85);
_85.Type="Contact";
if(_83){
_85.Filter=new Object();
modifyObjectBaseProp(_85.Filter);
_85.Filter.SearchVal=_83;
}
if(_84){
_85.Sort=new Object();
modifyObjectBaseProp(_85.Sort);
if(_84==com.nokia.device.SORT_ASCENDING){
_85.Sort.Order="Ascending";
}else{
if(_84==com.nokia.device.SORT_DESCENDING){
_85.Sort.Order="Descending";
}else{
_85.Sort.Order=_84;
}
}
}
try{
if(!_82){
throw new DeviceError("Contacts: getContacts: callback is missing",err_missing_argument);
}else{
if(typeof _82!="function"){
throw new DeviceError("Contacts: getContacts: callback is invalid",err_bad_argument);
}
}
var _86=function(_87,_88,_89){
var _8a=null;
if(_89.ReturnValue){
_8a=new __sp_contact_iterator(_89.ReturnValue);
}
var _8b=_89.ErrorCode;
_82(_87,_8b,_8a);
};
var _8c=this.so.IDataSource.GetList(_85,_86);
if(_8c.ErrorCode!=0){
switch(_8c.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_InvalidService_Argument:
case err_ServiceNotSupported:
if(_8c.ErrorMessage){
var _8d=splitErrorMessage(_8c.ErrorMessage);
throw new DeviceError("Contacts: getContacts: "+_8d,_8c.ErrorCode);
}else{
throw new DeviceError("Contacts: getContacts: Operation Failed",_8c.ErrorCode);
}
break;
default:
_82(0,_8c.ErrorCode,0);
}
}
return _8c.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getContacts: "+e);
}
};
function __sp_contacts_add(_8e){
var _8f=new Object();
modifyObjectBaseProp(_8f);
__s60_enumerate_object(_8e,null,__sp_contact_extract,_8f);
var _90=new Object();
modifyObjectBaseProp(_90);
_90.Type="Contact";
_90.Data=_8f;
try{
if(_8f.id){
throw new DeviceError("Contacts: addContact: Id Not Supported",err_ServiceNotSupported);
}
var _91=this.so.IDataSource.Add(_90);
if(_91.ErrorCode!=0){
if(_91.ErrorMessage){
var _92=splitErrorMessage(_91.ErrorMessage);
throw new DeviceError("Contacts: addContact: "+_92,_91.ErrorCode);
}else{
throw new DeviceError("Contacts: addContact: Operation Failed",_91.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_addContact: "+e);
}
};
function __sp_contacts_update(_93){
try{
if(!(_93&&_93.id)){
throw new DeviceError("Contacts: updateContact: contact is missing",err_missing_argument);
}
var _94=new Object();
modifyObjectBaseProp(_94);
__s60_enumerate_object(_93,null,__sp_contact_extract,_94);
if(typeof _94.id!="string"){
throw new DeviceError("Contacts: updateContact: Invalid id type",err_bad_argument);
}
var _95=new Object();
modifyObjectBaseProp(_95);
_95.Type="Contact";
_95.Data=_94;
var _96=this.so.IDataSource.Add(_95);
if(_96.ErrorCode!=0){
if(_96.ErrorMessage){
var _97=splitErrorMessage(_96.ErrorMessage);
throw new DeviceError("Contacts: updateContact: "+_97,_96.ErrorCode);
}else{
throw new DeviceError("Contacts: updateContact: Operation Failed",_96.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_updateContact: "+e);
}
};
function __sp_contacts_delete(id){
var _99=new Object();
modifyObjectBaseProp(_99);
if(typeof id=="Object"){
_99.IdList=id;
}else{
_99.IdList=new Array();
_99.IdList[0]=id;
}
var _9a=new Object();
modifyObjectBaseProp(_9a);
_9a.Type="Contact";
_9a.Data=_99;
try{
var _9b=this.so.IDataSource.Delete(_9a);
if(_9b.ErrorCode!=0){
if(_9b.ErrorMessage){
var _9c=splitErrorMessage(_9b.ErrorMessage);
throw new DeviceError("Contacts: deleteContacts: "+_9c,_9b.ErrorCode);
}else{
throw new DeviceError("Contacts: deleteContacts: Operation Failed",_9b.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_deleteContacts: "+e);
}
};
function __sp_contacts_get(id){
var _9e=new Object();
modifyObjectBaseProp(_9e);
_9e.Type="Contact";
_9e.Filter=new Object();
modifyObjectBaseProp(_9e.Filter);
_9e.Filter.id=id;
try{
var _9f=this.so.IDataSource.GetList(_9e);
if(_9f){
if(_9f.ErrorCode!=0){
if(_9f.ErrorMessage){
var _a0=splitErrorMessage(_9f.ErrorMessage);
throw new DeviceError("Contacts: getContactInfo: "+_a0,_9f.ErrorCode);
}else{
throw new DeviceError("Contacts: getContactInfo: Operation Failed",_9f.ErrorCode);
}
}
var _a1=new Object();
var _a2=_9f.ReturnValue.getNext();
__sp_device_contact_build(_a2,_a1);
return _a1;
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getContactInfo:"+e);
}
};
var __device_sensors_service_entry={"name":null,"version":null,"proto":__device_sensors,"descriptor":__device_sensors_descriptor,"providers":[{"descriptor":__sp_sensors_descriptor,"instance":__sp_sensors_instance}]};
function __device_sensors(_a3){
this.provider=_a3;
this.interfaceName=_a3.descriptor.interfaceName;
this.version=_a3.descriptor.version;
this.getChannels=__device_sensors_getChannels;
this.startChannel=__device_sensors_setNotifier;
this.stopChannel=__device_sensors_cancelNotifier;
};
function __device_sensors_descriptor(_a4){
this.interfaceName=_a4.interfaceName;
this.version=_a4.version;
};
function __device_sensors_getChannels(){
return this.provider.getChannels();
};
function __device_sensors_setNotifier(_a5,_a6){
return this.provider.startChannel(_a5,_a6);
};
function __device_sensors_cancelNotifier(_a7){
return this.provider.stopChannel(_a7);
};
function __sp_sensors_descriptor(){
this.interfaceName="com.nokia.device.sensors";
this.version="0.1";
};
function __sp_sensors_instance(){
this.descriptor=new __sp_sensors_descriptor();
this.getChannels=__sp_sensors_getChannels;
this.startChannel=__sp_sensors_setNotifier;
this.stopChannel=__sp_sensors_cancelNotifier;
try{
this.so=device.getServiceObject("Service.Sensor","ISensor");
}
catch(e){
this.so=null;
__device_handle_exception(e,"sensors service not available");
}
};
var __rotation_channel={ucb:null,tids:null};
var __XYZ_channel={ucb:null,tids:null};
var __orientation_channel={ucb:null,tids:null};
function __rotation_cb(_a8,_a9,_aa){
if(_a9!=event_cancelled){
var _ab=null;
if(_aa.ReturnValue){
var _ac=_aa.ReturnValue.TimeStamp;
var _ad=_aa.ReturnValue.XRotation;
var _ae=_aa.ReturnValue.YRotation;
var _af=_aa.ReturnValue.ZRotation;
_ab=new Object();
_ab.timeStamp=_ac;
_ab.xRotation=_ad;
_ab.yRotation=_ae;
_ab.zRotation=_af;
}
__rotation_channel.ucb(_a8,_aa.ErrorCode,_ab);
}
};
function __XYZ_cb(_b0,_b1,_b2){
if(_b1!=event_cancelled){
var _b3=null;
if(_b2.ReturnValue){
var _b4=_b2.ReturnValue.TimeStamp;
var _b5=_b2.ReturnValue.XAxisData;
var _b6=_b2.ReturnValue.YAxisData;
var _b7=_b2.ReturnValue.ZAxisData;
_b3=new Object();
_b3.timeStamp=_b4;
_b3.xAxisData=_b5;
_b3.yAxisData=_b6;
_b3.zAxisData=_b7;
}
__XYZ_channel.ucb(_b0,_b2.ErrorCode,_b3);
}
};
function __orientation_cb(_b8,_b9,_ba){
if(_b9!=event_cancelled){
var _bb=null;
if(_ba.ReturnValue){
var _bc=_ba.ReturnValue.TimeStamp;
var _bd=_ba.ReturnValue.DeviceOrientation;
_bb=new Object();
_bb.timeStamp=_bc;
_bb.deviceOrientation=_bd;
}
__orientation_channel.ucb(_b8,_ba.ErrorCode,_bb);
}
};
function __sp_sensors_getChannels(){
return ["Rotation","XYZ","Orientation"];
};
function __sp_sensors_setNotifier(_be,_bf){
try{
if(!_be){
throw new DeviceError("Sensors:startChannel:callback is missing",err_missing_argument);
}else{
if(typeof _be!="function"){
throw new DeviceError("Sensors:startChannel:callback is invalid",err_bad_argument);
}
}
if(!_bf){
throw new DeviceError("Sensors:startChannel:channel is missing",err_missing_argument);
}else{
if(typeof _bf!="string"){
throw new DeviceError("Sensors:startChannel:channel is invalid",err_bad_argument);
}
}
var _c0;
var cb;
var _c2=new Object();
modifyObjectBaseProp(_c2);
switch(_bf){
case "Rotation":
_c2.SearchCriterion="Rotation";
cb=__rotation_cb;
__rotation_channel.ucb=_be;
break;
case "XYZ":
_c2.SearchCriterion="AccelerometerAxis";
cb=__XYZ_cb;
__XYZ_channel.ucb=_be;
break;
case "Orientation":
_c2.SearchCriterion="Orientation";
cb=__orientation_cb;
__orientation_channel.ucb=_be;
break;
default:
throw new DeviceError("Sensors:startChannel:channel is invalid",err_InvalidService_Argument);
}
}
catch(e){
__device_handle_exception(e,"__sp_sensors_setNotifier: SearchCriterion: "+e);
}
try{
_c0=this.so.ISensor.FindSensorChannel(_c2);
if(_c0.ErrorCode!=0){
if(_c0.ErrorMessage){
var _c3=splitErrorMessage(_c0.ErrorMessage);
throw new DeviceError("Sensors:startChannel:"+_c3,_c0.ErrorCode);
}else{
throw new DeviceError("Sensor:startChannel:Operation Failed",_c0.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_sensors_setNotifier: FindSensorChannel: "+e);
}
var _c4=new Array();
var _c5=new Array();
var _c6=_c0["ReturnValue"];
var _c7=_c6.length;
for(var i=0;i<_c7;i++){
_c4=_c6[i];
var _c9=new Object();
modifyObjectBaseProp(_c9);
_c9.ListeningType="ChannelData";
_c9.ChannelInfoMap=_c4;
try{
var _ca=this.so.ISensor.RegisterForNotification(_c9,cb);
_c5[i]=_ca["TransactionID"];
if(_ca.ErrorCode!=0){
switch(_ca.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_InvalidService_Argument:
case err_ServiceNotSupported:
if(_ca.ErrorMessage){
var _c3=splitErrorMessage(_ca.ErrorMessage);
throw new DeviceError("Sensors:startChannel:"+_c3,_ca.ErrorCode);
}else{
throw new DeviceError("Sensors:startChannel:Operation Failed",_ca.ErrorCode);
}
break;
default:
_be(0,_ca.ErrorCode,0);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_sensors_setNotifier: RegisterForNotification: "+e);
}
}
switch(_bf){
case "Rotation":
__rotation_channel.tid=_c5;
break;
case "XYZ":
__XYZ_channel.tid=_c5;
break;
case "Orientation":
__orientation_channel.tid=_c5;
break;
}
return _c5;
};
function __sp_sensors_cancelNotifier(_cb){
try{
if(!_cb){
throw new DeviceError("Sensors:stopChannel:channel is missing",err_missing_argument);
}else{
if(typeof _cb!="string"){
throw new DeviceError("Sensors:stopChannel:channel is invalid",err_bad_argument);
}
}
var id;
switch(_cb){
case "Rotation":
id=__rotation_channel.tid;
__rotation_channel.tid=null;
break;
case "XYZ":
id=__XYZ_channel.tid;
__XYZ_channel.tid=null;
break;
case "Orientation":
id=__orientation_channel.tid;
__orientation_channel.tid=null;
break;
default:
throw new DeviceError("Sensors:stopChannel:channel is invalid",err_InvalidService_Argument);
}
if(!id){
throw new DeviceError("Sensors:stopChannel:channel is invalid",err_InvalidService_Argument);
}
}
catch(e){
__device_handle_exception(e,"__sp_sensors_cancelNotifier: Invalid arguements"+e);
}
var _cd=new Object();
modifyObjectBaseProp(_cd);
for(var i in id){
_cd.TransactionID=id[i];
try{
var _cf=this.so.ISensor.Cancel(_cd);
if(_cf.ErrorCode!=0){
if(_cf.ErrorMessage){
var _d0=splitErrorMessage(_cf.ErrorMessage);
throw new DeviceError("Sensors:stopChannel:"+_d0,_cf.ErrorCode);
}else{
throw new DeviceError("Sensor:stopChannel:Operation Failed ",_cf.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_sensors_cancelNotifier: "+e);
}
}
};
var __device_sysinfo_service_entry={"name":null,"version":null,"proto":__device_sysinfo,"descriptor":__device_sysinfo_descriptor,"providers":[{"descriptor":__sp_sysinfo_descriptor,"instance":__sp_sysinfo_instance}]};
function __device_sysinfo(_d1){
this.provider=_d1;
this.interfaceName=_d1.descriptor.interfaceName;
this.version=_d1.descriptor.version;
this.getChannelList=__device_channels_get;
this.getChannel=__device_sysinfo_get;
this.startChannel=__device_sysinfo_setNotifier;
this.stopChannel=__device_sysinfo_cancelNotifier;
};
function __device_sysinfo_descriptor(_d2){
this.interfaceName=_d2.interfaceName;
this.version=_d2.version;
};
function __device_channels_get(){
return this.provider.getChannelList();
};
function __device_sysinfo_get(_d3,_d4){
return this.provider.getChannel(_d3,_d4);
};
function __device_sysinfo_setNotifier(_d5,_d6,_d7){
return this.provider.startChannel(_d5,_d6,_d7);
};
function __device_sysinfo_cancelNotifier(_d8){
return this.provider.stopChannel(_d8);
};
function __sp_sysinfo_descriptor(){
this.interfaceName="com.nokia.device.sysinfo";
this.version="0.1";
};
function __sp_sysinfo_instance(){
this.descriptor=new __sp_sysinfo_descriptor();
this.getChannelList=__sp_channel_descriptors_get;
this.getChannel=__sp_sysinfo_get;
this.startChannel=__sp_sysinfo_setNotifier;
this.stopChannel=__sp_sysinfo_cancelNotifier;
try{
this.so=device.getServiceObject("Service.SysInfo","ISysInfo");
}
catch(e){
this.so=null;
__device_handle_exception(e,"Sysinfo service not available");
}
};
function __sp_channel_descriptors_get(){
var _d9=[{name:"Charging",data:[{name:"chargingStatus",range:"true or false",description:"Charging(true) ,Not charging(false)",}],style:["Sync","Oneshot"]},{name:"BatteryLevel",data:[{name:"batteryLevel ",range:"0-100",description:"Percent battery charge"}],style:["Async","Oneshot","Notification"]},{name:"Signal",data:[{name:"signalStrength",range:"0-100",description:"Signal Strength in Percentage"}],style:["Async","Oneshot","Notification"]},{name:"Network",data:[{name:"networkName ",description:"Network name"},{name:"networkStatus",range:"Available,Current,Forbidden",description:""},{name:"networkMode",range:"ModeGsm,ModeCdma,ModeWcdma",description:""},{name:"mobileCountryCode",range:"",description:""},{name:"mobileNetworkCode",range:"",description:""},{name:"locationStatus",range:"True, False",description:""}],style:["Async","Oneshot","Notification"]}];
return _d9;
};
function __sp_sysinfo_get(_da,_db){
var so;
var _dd;
var _de=function(_df,_e0,_e1){
var op=null;
if(_e1.ReturnValue){
op=__sp_device_sysinfo_extract(_e1.ReturnValue);
}
_db(_df,_e1.ErrorCode,op);
};
var _e3=function(_e4,_e5,_e6){
var op=null;
if(_e6.ReturnValue){
op=_e6.ReturnValue;
}
_db(_e4,_e6.ErrorCode,op);
so.ISysInfo.Cancel(_e4);
};
var _e8=false;
var _e9="Status";
var _ea;
var _eb=new Object();
modifyObjectBaseProp(_eb);
try{
switch(_da){
case "Charging":
_eb.Entity="Battery";
_eb.Key="ChargingStatus";
break;
case "BatteryLevel":
_eb.Entity="Battery";
_eb.Key="BatteryStrength";
_e8=true;
break;
case "Signal":
_eb.Entity="Network";
_eb.Key="SignalStrength";
_e8=true;
break;
case "Network":
_eb.Entity="Network";
_eb.Key="CurrentNetwork";
_e8=true;
break;
default:
if(_da==null){
throw new DeviceError("SysInfo:getChannel:channel is missing",err_missing_argument);
}else{
if(typeof _da!="string"){
throw new DeviceError("SysInfo:getChannel:channel is of invalid type",err_bad_argument);
}else{
throw new DeviceError("SysInfo:getChannel:channel is invalid",err_InvalidService_Argument);
}
}
}
if(_e8){
if(_db==null){
throw new DeviceError("SysInfo:getChannel:callback is missing",err_missing_argument);
}
if(typeof _db!="function"){
throw new DeviceError("SysInfo:getChannel:callback is invalid",err_bad_argument);
}
_dd=this.so.ISysInfo.GetInfo(_eb,_de);
if(_dd.ErrorCode!=0){
switch(_dd.ErrorCode){
case missing_arg_err:
case invalid_arg_err:
case not_supported_err:
if(_dd.ErrorMessage){
var _ec=splitErrorMessage(_dd.ErrorMessage);
throw new DeviceError("SysInfo: getChannel: "+_ec,_dd.ErrorCode);
}else{
throw new DeviceError("SysInfo:getChannel:Operation Failed",_dd.ErrorCode);
}
break;
default:
_db(0,_dd.ErrorCode,0);
}
}
return _dd.TransactionID;
}else{
_dd=this.so.ISysInfo.GetInfo(_eb);
if(_dd.ErrorCode!=0){
if(_dd.ErrorMessage){
var _ec=splitErrorMessage(_dd.ErrorMessage);
throw new DeviceError("SysInfo: getChannel: "+_ec,_dd.ErrorCode);
}else{
throw new DeviceError("SysInfo:getChannel:Operation Failed",_dd.ErrorCode);
}
}
_ea=__sp_device_sysinfo_extract(_dd.ReturnValue);
return _ea;
}
}
catch(e){
__device_handle_exception(e,"__sp_sysinfo_get: getChannel: "+e);
}
};
var __cell_id_channel={ucb:null,cancel_id:null};
function __cell_id_channel_cb(_ed,_ee,_ef){
var op=null;
if(_ef.ReturnValue){
op=_arg3.ReturnValue;
}
__cell_id_channel.ucb(_ed,_ef.ErrorCode,op);
};
var __net_coverage_channel={ucb:null,cancel_id:null};
function __net_coverage_channel_cb(_f1,_f2,_f3){
var op=null;
if(_f3.ReturnValue){
op=__sp_device_sysinfo_extract(_f3.ReturnValue);
}
__net_coverage_channel.ucb(_f1,_f3.ErrorCode,op);
};
var __battery_level_channel={ucb:null,cancel_id:null};
function __battery_level_channel_cb(_f5,_f6,_f7){
var op=null;
if(_f7.ReturnValue){
op=__sp_device_sysinfo_extract(_f7.ReturnValue);
}
__battery_level_channel.ucb(_f5,_f7.ErrorCode,op);
};
var __signal_channel={ucb:null,cancel_id:null};
function __signal_channel_cb(_f9,_fa,_fb){
var op=null;
if(_fb.ReturnValue){
op=__sp_device_sysinfo_extract(_fb.ReturnValue);
}
__signal_channel.ucb(_f9,_fb.ErrorCode,op);
};
function __sp_sysinfo_setNotifier(_fd,_fe,_ff){
var rval;
var _101=null;
var cb=null;
var _103=new Object();
modifyObjectBaseProp(_103);
try{
switch(_fe){
case "Network":
_103.Entity="Network";
_103.Key="CurrentNetwork";
_101=__net_coverage_channel;
cb=__net_coverage_channel_cb;
break;
case "BatteryLevel":
_103.Entity="Battery";
_103.Key="BatteryStrength";
_103.SystemData=new Object();
modifyObjectBaseProp(_103.SystemData);
if(_ff==null){
_ff=50;
}
if(!(_ff>=0&&_ff<=100)){
throw new DeviceError("SysInfo:startChannel:trigger is out of range",err_InvalidService_Argument);
}
if(typeof _ff!="number"){
throw new DeviceError("SysInfo:startChannel:trigger is of  invalid type",err_bad_argument);
}
_103.SystemData.Status=_ff;
_101=__battery_level_channel;
cb=__battery_level_channel_cb;
break;
case "Signal":
_103.Entity="Network";
_103.Key="SignalStrength";
_103.SystemData=new Object();
modifyObjectBaseProp(_103.SystemData);
if(_ff!=null){
if(!(_ff>=0&&_ff<=100)){
throw new DeviceError("SysInfo:startChannel:trigger is out of range",err_InvalidService_Argument);
}
if(typeof _ff!="number"){
throw new DeviceError("SysInfo:startChannel:trigger is of invalid type",err_bad_argument);
}
_103.SystemData.Status=__sp_device_sysinfo_toDecibel(_ff);
}
_101=__signal_channel;
cb=__signal_channel_cb;
break;
default:
var _104;
if(_fe==null){
throw new DeviceError("SysInfo:startChannel:channel is missing",err_missing_argument);
}else{
if(typeof _fe!="string"){
throw new DeviceError("SysInfo:startChannel:channel is of invalid type",err_bad_argument);
}else{
throw new DeviceError("SysInfo:startChannel:channel is invalid",err_InvalidService_Argument);
}
}
}
_101.ucb=_fd;
if(_101.ucb==null){
throw new DeviceError("SysInfo:startChannel:callback is missing",err_missing_argument);
}
if(typeof _101.ucb!="function"){
throw new DeviceError("SysInfo:startChannel:callback is invalid",err_bad_argument);
}
if(_101.cancel_id){
var _105=new Object();
modifyObjectBaseProp(_105);
_105.TransactionID=_101.cancel_id;
this.so.ISysInfo.Cancel(_105);
_101.cancel_id=null;
}
rval=this.so.ISysInfo.GetNotification(_103,cb);
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_InvalidService_Argument:
case err_ServiceNotSupported:
if(rval.ErrorMessage){
var _106=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("SysInfo: startChannel: "+_106,rval.ErrorCode);
}else{
throw new DeviceError("SysInfo:startChannel:Operation Failed",rval.ErrorCode);
}
break;
default:
_fd(0,rval.ErrorCode,0);
}
}
_101.cancel_id=rval.TransactionID;
return _101.cancel_id;
}
catch(e){
__device_handle_exception(e,"__sp_sysinfo_startChannel: "+e);
}
};
function __sp_sysinfo_cancelNotifier(_107){
try{
switch(_107){
case "CellId":
channel=__cell_id_channel;
break;
case "Network":
channel=__net_coverage_channel;
break;
case "BatteryLevel":
channel=__battery_level_channel;
break;
case "Signal":
channel=__signal_channel;
break;
default:
var _108;
if(_107==null){
throw new DeviceError("SysInfo:stopChannel:channel is missing",err_missing_argument);
}else{
if(typeof _107!="string"){
throw new DeviceError("SysInfo:stopChannel:channel is of invalid type",err_bad_argument);
}else{
throw new DeviceError("SysInfo:stopChannel:channel is invalid",err_InvalidService_Argument);
}
}
}
if(channel.cancel_id){
var _109=new Object();
modifyObjectBaseProp(_109);
_109.TransactionID=channel.cancel_id;
var _10a=this.so.ISysInfo.Cancel(_109);
if(_10a.ErrorCode!=0){
if(_10a.ErrorMessage){
var _10b=splitErrorMessage(_10a.ErrorMessage);
throw new DeviceError("SysInfo: stopChannel: "+_10b,_10a.ErrorCode);
}else{
throw new DeviceError("SysInfo:stopChannel:Operation Failed",_10a.ErrorCode);
}
}
channel.cancel_id=null;
}else{
throw new DeviceError("SysInfo:stopChannel:Service Not Ready",err_ServiceNotReady);
}
}
catch(e){
__device_handle_exception(e,"__sp_sysinfo_stopChannel: "+e);
}
};
function __sp_device_sysinfo_extract(_10c){
var _10d=_10c.Key;
var _10e=new Object();
try{
switch(_10d){
case "ChargingStatus":
_10e.chargingStatus=__sp_device_sysinfo_toBool(_10c.Status);
break;
case "BatteryStrength":
_10e.batteryLevel=_10c.Status;
break;
case "SignalStrength":
_10e.signalStrength=__sp_device_sysinfo_toPercentage(_10c.Status);
break;
case "CurrentNetwork":
var _10f;
var mode;
switch(_10c.NetworkStatus){
case 0:
_10f="Available";
break;
case 1:
_10f="Current";
break;
case 2:
_10f="Forbidden";
break;
default:
_10f="Unknown";
break;
}
switch(_10c.NetworkMode){
case 1:
mode="ModeGsm";
break;
case 3:
case 4:
mode="ModeCdma";
break;
case 5:
mode="ModeWcdma";
break;
default:
mode="Unknown";
break;
}
_10e.networkName=_10c.NetworkName;
_10e.networkStatus=_10f;
_10e.networkMode=mode;
_10e.mobileCountryCode=_10c.CountryCode;
_10e.mobileNetworkCode=_10c.NetworkCode;
_10e.locationStatus=_10c.LocationStatus;
break;
default:
break;
}
return _10e;
}
catch(e){
__device_handle_exception(e,"__sp_device_sysinfo_extract: "+e);
}
};
var max=110;
var min=40;
var diff=max-min;
function __sp_device_sysinfo_toDecibel(_111){
var _112=_111/100;
var _113=max-(_112*diff);
_113=Math.round(_113);
return _113;
};
function __sp_device_sysinfo_toPercentage(_114){
if(_114==0){
return _114;
}else{
var _115=max-_114;
var _116=_115/diff;
_116*=100;
_116=Math.round(_116);
return _116;
}
};
function __sp_device_sysinfo_toBool(_117){
if(_117==0){
return false;
}else{
return true;
}
};
var __device_event_service_entry={"name":null,"version":null,"proto":__device_event,"descriptor":__device_event_descriptor,"providers":[{"descriptor":__sp_event_descriptor,"instance":__sp_event_instance}]};
function __device_event(_118){
this.provider=_118;
this.interfaceName=_118.descriptor.interfaceName;
this.version=_118.descriptor.version;
this.getList=__device_event_getList;
this.setNotifier=__device_event_setNotifier;
this.cancelNotifier=__device_event_cancelNotifier;
};
function __device_event_descriptor(_119){
this.interfaceName=_119.interfaceName;
this.version=_119.version;
};
function __device_event_getList(_11a,_11b){
return this.provider.getList(_11a,_11b);
};
function __device_event_setNotifier(_11c){
return this.provider.setNotifier(match,_11c);
};
function __device_event_cancelNotifier(_11d,_11e){
return this.provider.cancelNotifier(_11d,_11e);
};
function __sp_event_descriptor(){
this.interfaceName="com.nokia.device.event";
this.version="0.1";
};
function __sp_event_instance(){
this.descriptor=new __sp_event_descriptor();
this.getList=__sp_event_getList;
this.setNotifier=__s60_api_not_supported;
this.cancelNotifier=__s60_api_not_supported;
try{
this.so=device.getServiceObject("Service.Logging","IDataSource");
}
catch(e){
this.so=null;
__device_handle_exception(e,"Event service not available");
}
};
function __get_const_string(def,val){
var i;
for(i in def){
if(def[i]==val){
return i;
}
}
return null;
};
function __get_const_val(def,str){
if(def[str]!=undefined){
return def[str];
}
return null;
};
var __sp_event_type_constants={"Call":0,"SMS":3};
var __sp_event_constants={"Incoming":0,"Received":4,"Missed":5,"Outgoing":1};
var __sp_recent_event_constants={"Incoming":1,"Received":1,"Outgoing":2,"Missed":3,"All":-1};
function __device_event_item(_124){
if(!_124){
return null;
}
var evt=new Object();
evt.type=__get_const_string(__sp_event_type_constants,_124.EventType);
evt.phone=_124.PhoneNumber;
evt.time=_124.EventTime;
evt.flag=(_124.Direction==undefined)?null:__get_const_string(__sp_event_constants,_124.Direction);
if(_124.Subject&&(_124.Subject.charCodeAt(0)<128)){
evt.summary=_124.Subject;
}else{
_124.Subject=null;
}
return evt;
};
function __sp_event_iterator(_126){
this.iter=_126;
this.next=__sp_event_iterator_get_next;
};
function __sp_event_iterator_get_next(){
var _127=this.iter.getNext();
if(typeof _127=="undefined"){
return null;
}
var rval=new __device_event_item(_127);
return rval;
};
function __sp_event_getList(_129,_12a){
if(!_129){
throw new DeviceError("Events:getList:callback is Required",err_missing_argument);
}else{
if(typeof _129!="function"){
throw new DeviceError("Events:getList:Invalid Callback",err_missing_argument);
}
}
try{
var _12b=new Object();
modifyObjectBaseProp(_12b);
_12b.Type="Log";
if(_12a){
_12b.Filter=new Object();
modifyObjectBaseProp(_12b.Filter);
if(_12a.type){
if((_12a.type=="Call")){
if(_12a.recent){
var _12c;
if(_12a.flag){
_12c=__get_const_val(__sp_recent_event_constants,_12a.flag);
if(_12c!=undefined){
_12b.Filter.RecentList=_12c;
}else{
throw new DeviceError("Events:getList:Bad Argument:["+_12a.flag+"] ",err_bad_argument);
}
}else{
_12b.Filter.RecentList=__sp_recent_event_constants["All"];
}
}else{
var _12d;
_12d=__get_const_val(__sp_event_type_constants,_12a.type);
if(_12d!=undefined){
_12b.Filter.EventType=_12d;
}else{
throw new DeviceError("Events:getList:Bad Argument:["+_12a.type+"] ",err_bad_argument);
}
}
}else{
if(_12a.type=="SMS"){
var _12d;
_12d=__get_const_val(__sp_event_type_constants,_12a.type);
if(_12d!=undefined){
_12b.Filter.EventType=_12d;
}else{
throw new DeviceError("Events:getList:Bad Argument:["+_12a.type+" ]",err_bad_argument);
}
}else{
throw new DeviceError("Events:getList:Bad Argument:["+_12a.type+"] ",err_bad_argument);
}
}
}
if(_12a.recent){
if(_12a.type==undefined||_12a.type==null||_12a.type=="Call"){
var _12c;
if(_12a.flag){
_12c=__get_const_val(__sp_recent_event_constants,_12a.flag);
if(_12c!=undefined){
_12b.Filter.RecentList=_12c;
}else{
throw new DeviceError("Events:getList:Bad Argument:["+_12a.flag+"] ",err_bad_argument);
}
}else{
_12b.Filter.RecentList=__sp_recent_event_constants["All"];
}
}
}
if(_12a.flag){
var _12e;
_12e=__get_const_val(__sp_event_constants,_12a.flag);
if(_12e!=undefined){
_12b.Filter.Direction=_12e;
}else{
throw new DeviceError("Events:getList:Bad Argument:["+_12a.flag+"] ",err_bad_argument);
}
}
if(_12a.phone){
_12b.Filter.PhoneNumber=_12a.phone;
}
}
}
catch(e){
__device_handle_exception(e,"__sp_event_Input_validation: "+e);
}
try{
var _12f=function(arg1,arg2,arg3){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_event_iterator(arg3.ReturnValue);
}
_129(arg1,arg3.ErrorCode,iter);
};
var rval=this.so.IDataSource.GetList(_12b,_12f);
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_ServiceNotSupported:
if(rval.ErrorMessage){
var _135=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("Events:getList:"+_135,rval.ErrorCode);
}else{
throw new DeviceError("Events:getList:Operation Failed",rval.ErrorCode);
}
break;
default:
_129(0,rval.ErrorCode,0);
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_event_getList: "+e);
}
};
function __sp_event_setNotifier(_136){
};
function __sp_event_cancelNotifier(){
};
var __device_media_service_entry={"name":null,"version":null,"proto":__device_media,"descriptor":__device_media_descriptor,"providers":[{"descriptor":__sp_media_descriptor,"instance":__sp_media_instance}]};
function __device_media(_137){
this.provider=_137;
this.interfaceName=_137.descriptor.interfaceName;
this.version=_137.descriptor.version;
this.getList=__device_media_getList;
};
function __device_media_descriptor(_138){
this.interfaceName=_138.interfaceName;
this.version=_138.version;
};
function __device_media_getList(_139,_13a){
return this.provider.getList(_139,_13a);
};
function __sp_media_descriptor(){
this.interfaceName="com.nokia.device.media";
this.version="0.1";
};
function __sp_media_instance(){
this.descriptor=new __sp_media_descriptor();
this.getList=__sp_media_getList;
try{
this.so=device.getServiceObject("Service.MediaManagement","IDataSource");
}
catch(e){
this.so=null;
__device_handle_exception(e,"media service not available");
}
};
function __sp_device_media_item_build(_13b){
if(!_13b){
return null;
}
var _13c=new Object();
if(_13b.FileNameAndPath){
var _13d=_13b.FileNameAndPath.replace(/\\/g,"/");
var _13e="file://";
_13c.uri=_13e+_13d;
}
if(_13b.MediaType){
var _13f=_13b.MediaType;
switch(_13f){
case 1:
_13c.type="audio";
break;
case 3:
_13c.type="image";
break;
case 4:
_13c.type="video";
break;
case 5:
_13c.type="stream";
break;
default:
break;
}
}
if(_13b.FileDate){
_13c.date=new Date(Date.parse(_13b.FileDate));
}
if(_13b.FileSize){
_13c.size=_13b.FileSize;
}
if(_13b.SongName){
_13c.title=_13b.SongName;
}
if(_13b.Artist){
_13c.artist=_13b.Artist;
}
if(_13b.Album){
_13c.album=_13b.Album;
}
if(_13b.Genre){
_13c.genre=_13b.Genre;
}
if(_13b.TrackNumber){
_13c.track=_13b.TrackNumber;
}
if(_13b.Composer){
_13c.composer=_13b.Composer;
}
return _13c;
};
function __sp_media_iterator(_140){
this.iter=_140;
this.next=__sp_media_iterator_get_next;
};
function __sp_media_iterator_get_next(){
var item=this.iter.getNext();
if(typeof item=="undefined"){
return null;
}
return __sp_device_media_item_build(item);
};
function __sp_media_get_sortfield_name(name){
if(typeof name!="string"){
throw new DeviceError("Media:getList:sortBy is invalid",err_bad_argument);
}
var _143=name.toLowerCase();
if(_143=="date"){
return "FileDate";
}else{
return __sp_media_get_field_name(name);
}
};
function __sp_media_get_field_name(name){
if(typeof name!="string"){
throw new DeviceError("Media:getList:field is invalid",err_bad_argument);
}
switch(name.toLowerCase()){
case "title":
return "SongName";
case "artist":
return "Artist";
case "album":
return "Album";
case "genre":
return "Genre";
case "track":
return "TrackNumber";
case "composer":
return "Composer";
default:
return null;
}
};
function __sp_media_getList(_145,_146){
if(!_145){
throw new DeviceError("Media:getList:Callback is invalid",err_bad_argument);
}else{
if(typeof _145!="function"){
throw new DeviceError("Media:getList:Callback is invalid",err_bad_argument);
}
}
var _147=function(arg1,arg2,arg3){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_media_iterator(arg3.ReturnValue);
}
_145(arg1,arg3.ErrorCode,iter);
};
var _14c=new Object();
modifyObjectBaseProp(_14c);
_14c.Type="FileInfo";
_14c.Filter=new Object();
modifyObjectBaseProp(_14c.Filter);
_14c.Sort=new Object();
modifyObjectBaseProp(_14c.Sort);
if(_146){
if(_146.type){
if(typeof _146.type!="string"){
throw new DeviceError("Media:getList:type is invalid",err_bad_argument);
}
switch(_146.type.toLowerCase()){
case "audio":
_14c.Filter.FileType="Music";
break;
case "image":
_14c.Filter.FileType="Image";
break;
case "video":
_14c.Filter.FileType="Video";
break;
case "stream":
_14c.Filter.FileType="StreamingURL";
break;
default:
throw new DeviceError("Media:getList:type is invalid",err_bad_argument);
}
if(_146.field!=null){
_14c.Filter.Key=__sp_media_get_field_name(_146.field.name);
if(_14c.Filter.Key==null){
throw new DeviceError("Media:getList:field is invalid",err_bad_argument);
}
if(_146.field.value){
_14c.Filter.StartRange=_146.field.value;
if(_14c.Filter.Key=="TrackNumber"){
_14c.Filter.EndRange=_146.field.value;
}
}
}
if(_146.sortBy){
_14c.Sort.Key=__sp_media_get_sortfield_name(_146.sortBy);
if(_14c.Sort.Key==null){
throw new DeviceError("Media:getList:sortBy is invalid",err_bad_argument);
}
}else{
_14c.Sort.Key="FileDate";
}
}else{
throw new DeviceError("Media:type is missing",err_bad_argument);
}
}else{
_14c.Filter.FileType="Music";
_14c.Sort.Key="FileDate";
}
try{
var rval=this.so.IDataSource.GetList(_14c,_147);
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_InvalidService_Argument:
case err_ServiceNotSupported:
if(rval.ErrorMessage){
var _14e=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("Media:getList:"+_14e,rval.ErrorCode);
}else{
throw new DeviceError("Media:getList:Operation failed",rval.ErrorCode);
}
break;
default:
_145(0,rval.ErrorCode,0);
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_media_getList: "+e);
}
};
var __device_landmarks_service_entry={"name":null,"version":null,"proto":__device_landmarks,"descriptor":__device_landmarks_descriptor,"providers":[{"descriptor":__sp_landmarks_descriptor,"instance":__sp_landmarks_instance}]};
function __device_landmarks(_14f){
this.provider=_14f;
this.interfaceName=_14f.descriptor.interfaceName;
this.version=_14f.descriptor.version;
this.startEditor=__device_landmarks_startEditor;
this.getCategories=__device_landmarks_getCategories;
this.getLandmarks=__device_landmarks_getLandmarks;
this.addCategory=__device_landmarks_add_category;
this.updateCategory=__device_landmarks_update_category;
this.updateLandmark=__device_landmarks_update_landmark;
this.addLandmark=__device_landmarks_add_landmark;
this.deleteCategory=__device_landmarks_delete_category;
this.deleteLandmark=__device_landmarks_delete_landmark;
};
function __device_landmarks_descriptor(_150){
this.interfaceName=_150.interfaceName;
this.version=_150.version;
};
function __device_landmarks_startEditor(_151,_152){
this.provider.startEditor(_151,_152);
};
function __device_landmarks_getCategories(_153,name){
return this.provider.getCategories(_153,name);
};
function __device_landmarks_getLandmarks(_155,_156){
return this.provider.getLandmarks(_155,_156);
};
function __device_landmarks_add_category(_157){
this.provider.addCategory(_157);
};
function __device_landmarks_add_landmark(_158){
this.provider.addLandmark(_158);
};
function __device_landmarks_delete_category(id){
this.provider.deleteCategory(id);
};
function __device_landmarks_delete_landmark(id){
this.provider.deleteLandmark(id);
};
function __device_landmarks_update_landmark(_15b){
this.provider.updateLandmark(_15b);
};
function __device_landmarks_update_category(_15c){
this.provider.updateCategory(_15c);
};
function __sp_landmarks_descriptor(){
this.interfaceName="com.nokia.device.landmarks";
this.version="0.1";
};
function __sp_landmarks_instance(){
this.descriptor=new __sp_landmarks_descriptor();
this.startEditor=__sp_landmarks_startEditor;
this.getCategories=__sp_landmarks_category_getList;
this.addCategory=__s60_api_not_supported;
this.updateCategory=__s60_api_not_supported;
this.deleteCategory=__s60_api_not_supported;
this.getLandmarks=__sp_landmarks_getList;
this.addLandmark=__sp_landmarks_add;
this.updateLandmark=__sp_landmarks_update;
this.deleteLandmark=__sp_landmarks_delete;
try{
this.so=device.getServiceObject("Service.Landmarks","IDataSource");
}
catch(e){
__device_handle_exception(e,"Landmarks service not available");
}
this.categories=null;
};
var __SP_CATEGORY_MIN_LOCAL_ID=16;
var __sp_category_list=[{id:1,globalId:3000,name:"Accommodation"},{id:2,globalId:6000,name:"Businesses"},{id:3,globalId:9000,name:"Telecommunications"},{id:4,globalId:12000,name:"Education"},{id:5,globalId:15000,name:"Entertainment"},{id:6,globalId:18000,name:"Food and drink"},{id:7,globalId:21000,name:"Geographical locations"},{id:8,globalId:24000,name:"Outdoor activities"},{id:9,globalId:27000,name:"People"},{id:10,globalId:30000,name:"Public services"},{id:11,globalId:33000,name:"Places of worship"},{id:12,globalId:36000,name:"Shopping"},{id:13,globalId:39000,name:"Sightseeing"},{id:14,globalId:42000,name:"Sports"},{id:15,globalId:45000,name:"Transport"}];
function __sp_landmarks_category_iterator(_15d){
this.iter=_15d;
this.next=__sp_landmarks_category_iterator_get_next;
};
function __sp_landmarks_category_iterator_get_next(){
var _15e=this.iter.getNext();
if(typeof _15e=="undefined"){
return null;
}
var _15f=new Object();
_15f.name=_15e.CategoryName;
_15f.id=_15e.id;
_15f.globalId=_15e.GlobalId;
var _160=__sp_category_is_global(_15f);
if(_160==false){
return null;
}
return _15f;
};
function __sp_landmarks_iterator(_161){
this.iter=_161;
this.next=__sp_landmarks_iterator_get_next;
};
function __sp_device_landmark_location_obj(_162){
this.longitude=(_162.Longitude==undefined)?null:_162.Longitude;
this.latitude=(_162.Latitude==undefined)?null:_162.Latitude;
if(_162.Altitude){
this.altitude=_162.Altitude;
}
if(_162.HAccuracy){
this.hAccuracy=_162.HAccuracy;
}
if(_162.VAccuracy){
this.vAccuracy=_162.VAccuracy;
}
};
function __sp_landmark_position_obj(_163){
this.Longitude=_163.longitude;
this.Latitude=_163.latitude;
if(_163.altitude){
this.Altitude=_163.altitude;
}
if(_163.hAccuracy){
this.HAccuracy=_163.hAccuracy;
}
if(_163.vAccuracy){
this.VAccuracy=_163.vAccuracy;
}
};
function __sp_landmark_bounded_area_obj(area){
this.NorthLatitude=area.latitude.north;
this.SouthLatitude=area.latitude.south;
this.EastLongitude=area.longitude.east;
this.WestLongitude=area.longitude.west;
};
function __sp_device_landmark_address_obj(_165){
if(_165.Street){
this.street=_165.Street;
}
if(_165.City){
this.locale=_165.City;
}
if(_165.Country){
this.country=_165.Country;
}
if(_165.District){
this.region=_165.District;
}
if(_165.AreaCode){
this.code=_165.AreaCode;
}
};
function __sp_landmark_address_obj(_166){
if(_166.street){
this.Street=_166.street;
}
if(_166.locale){
this.City=_166.locale;
}
if(_166.region){
this.District=_166.region;
}
if(_166.code){
this.AreaCode=_166.code;
}
if(_166.country){
this.Country=_166.country;
}
};
function __sp_category_is_global(_167){
for(var i in __sp_category_list){
if((__sp_category_list[i].id==_167.id)&&_167.globalId){
return true;
}
}
return false;
};
function __sp_get_category_names_for_ids(ids){
var _16a=new Array();
for(var i in ids){
for(var ii in __sp_category_list){
if(__sp_category_list[ii].id==ids[i]){
_16a.push(__sp_category_list[ii].name);
}
}
}
return _16a;
};
function __sp_get_category_ids_for_names(_16d){
var _16e=new Array();
var _16f=0;
for(var i in _16d){
for(var ii in __sp_category_list){
if(__sp_category_list[ii].name.toLowerCase()==_16d[i].toLowerCase()){
_16e.push(__sp_category_list[ii].id.toString());
_16f=1;
}
}
if(_16f==0){
return null;
}
_16f=0;
}
return _16e;
};
function __sp_device_landmark_obj(_172){
if(_172.LandmarkName){
this.name=_172.LandmarkName;
}
this.id=_172.id;
if(_172.CategoryInfo){
this.categories=__sp_get_category_names_for_ids(_172.CategoryInfo);
}
if(_172.LandmarkDesc){
this.description=_172.LandmarkDesc;
}
if(_172.LandmarkPosition){
this.position=new __sp_device_landmark_location_obj(_172.LandmarkPosition);
}
if(_172.CoverageRadius){
this.coverageRadius=_172.CoverageRadius;
}
if(_172.LandmarkFields){
this.address=new __sp_device_landmark_address_obj(_172.LandmarkFields);
if(_172.LandmarkFields.BuildingName){
this.building=_172.LandmarkFields.BuildingName;
}
if(_172.LandmarkFields.Telephone){
this.phone=_172.LandmarkFields.Telephone;
}
}
};
function __sp_landmark_obj(_173,str){
if(_173.name){
this.LandmarkName=_173.name;
}
if(_173.id){
this.id=_173.id;
}
if(_173.description){
this.LandmarkDesc=_173.description;
}
if(_173.position){
this.LandmarkPosition=new __sp_landmark_position_obj(_173.position);
}
if(_173.coverageRadius){
this.CoverageRadius=_173.coverageRadius;
}
if(_173.categories){
this.CategoryInfo=__sp_get_category_ids_for_names(_173.categories);
if(!this.CategoryInfo){
throw new DeviceError("Landmarks: "+str+"Category is invalid",err_bad_argument);
}
}
if(_173.address){
this.LandmarkFields=new __sp_landmark_address_obj(_173.address);
}
if(_173.building){
if(!this.LandmarkFields){
this.LandmarkFields=new Object();
modifyObjectBaseProp(this.LandmarkFields);
}
this.LandmarkFields.BuildingName=_173.building;
}
if(_173.phone){
if(!this.LandmarkFields){
this.LandmarkFields=new Object();
modifyObjectBaseProp(this.LandmarkFields);
}
this.LandmarkFields.Telephone=_173.phone;
}
};
function __sp_landmarks_iterator_get_next(){
var _175=this.iter.getNext();
if(typeof _175=="undefined"){
return null;
}
return new __sp_device_landmark_obj(_175);
};
var LANDMARKS_APP_ID=270501282;
function __sp_landmarks_startEditor(_176,_177){
if(!_176){
throw new DeviceError("Landmarks: startEditor: Callback is missing",err_missing_argument);
}else{
if(typeof _176!="function"){
throw new DeviceError("Landmarks: startEditor: Callback is invalid",err_bad_argument);
}
}
var _178=function(arg1,arg2,arg3){
_176(arg1,arg2,arg3);
};
__s60_start_and_wait(LANDMARKS_APP_ID,"",_178);
};
function __sp_landmarks_category_getList(_17c,name){
try{
if(!_17c){
throw new DeviceError("Landmarks: getCategories: Callback is missing",err_missing_argument);
}else{
if(typeof _17c!="function"){
throw new DeviceError("Landmarks: getCategories: Callback is invalid",err_bad_argument);
}
}
var _17e=new Object();
modifyObjectBaseProp(_17e);
_17e.Type="Category";
if(name){
_17e.Filter=new Object();
modifyObjectBaseProp(_17e.Filter);
_17e.Filter.CategoryName=name;
_17e.Filter.PreviousMatchesOnly=false;
}
var _17f=function(arg1,arg2,arg3){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_landmarks_category_iterator(arg3.ReturnValue);
}
_17c(arg1,arg3.ErrorCode,iter);
};
var rval=this.so.IDataSource.GetList(_17e,_17f);
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_ServiceNotSupported:
case err_InvalidService_Argument:
if(rval.ErrorMessage){
var _185=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("Landmarks: getCategories:"+_185,rval.ErrorCode);
}else{
throw new DeviceError("Landmarks: getCategories: Operation failed",rval.ErrorCode);
}
break;
default:
_17c(0,rval.ErrorCode,0);
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_landmarks_category_getList: "+e);
}
};
function __sp_landmarks_category_add(cat){
throw ("Not implemented");
};
function __sp_landmarks_category_delete(id){
throw ("Not implemented");
};
function __sp_landmarks_getList(_188,_189){
try{
if(!_188){
throw new DeviceError("Landmarks: getLandmarks: Callback is missing",err_missing_argument);
}else{
if(typeof _188!="function"){
throw new DeviceError("Landmarks: getLandmarks: Callback is invalid",err_bad_argument);
}
}
var _18a=function(arg1,arg2,arg3){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_landmarks_iterator(arg3.ReturnValue);
}
_188(arg1,arg3.ErrorCode,iter);
};
var _18f=new Object();
modifyObjectBaseProp(_18f);
_18f.Type="Landmark";
if(_189){
_18f.Filter=new Object();
modifyObjectBaseProp(_18f.Filter);
if(typeof _189=="object"){
if(_189.name){
_18f.Filter.LandmarkName=_189.name;
}
if(_189.description){
_18f.Filter.LandmarkDesc=_189.description;
}
if(_189.category){
_18f.Filter.CategoryName=_189.category;
}
if(_189.position){
_18f.Filter.LandmarkPosition=new __sp_landmark_position_obj(_189.position);
}
if(_189.coverageRadiusOption){
_18f.Filter.CoverageRadiusOption=_189.coverageRadiusOption;
}
if(_189.maximumDistance){
_18f.Filter.MaximumDistance=_189.maximumDistance;
}
if(_189.area){
_18f.Filter.BoundedArea=new __sp_landmark_bounded_area_obj(_189.area);
}
}else{
if(__device_typeof(_189).toLowerCase()=="string"){
_18f.Filter.LandmarkName=_189;
}
}
}
var rval=this.so.IDataSource.GetList(_18f,_18a);
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
case err_bad_argument:
case err_ServiceNotSupported:
case err_InvalidService_Argument:
if(rval.ErrorMessage){
var _191=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("Landmarks: getLandmarks:"+_191,rval.ErrorCode);
}else{
throw new DeviceError("Landmarks: getLandmarks: Operation failed",rval.ErrorCode);
}
break;
default:
_188(0,rval.ErrorCode,0);
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_landmarks_getList: "+e);
}
};
function __sp_landmarks_add(_192){
try{
if(!_192){
throw new DeviceError("Landmarks: addLandmark: Landmark is missing",err_missing_argument);
}else{
if(typeof _192!="object"){
throw new DeviceError("Landmarks: addLandmark: Landmark is invalid",err_bad_argument);
}else{
if(_192.id){
throw new DeviceError("Landmarks: addLandmark: Landmark is invalid",err_bad_argument);
}
}
}
var str="addLandmark: ";
var _194=new Object();
modifyObjectBaseProp(_194);
_194.Type="Landmark";
_194.Data=new __sp_landmark_obj(_192,str);
var rval=this.so.IDataSource.Add(_194);
if(rval.ErrorCode!=0){
if(rval.ErrorMessage){
var _196=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("Landmarks: addLandmark:"+_196,rval.ErrorCode);
}else{
throw new DeviceError("Landmarks: addLandmark: Operation failed",rval.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_landmarks_add: "+e);
}
};
function __sp_landmarks_delete(id){
try{
var _198=new Object();
modifyObjectBaseProp(_198);
_198.Type="Landmark";
_198.Data=new Object();
modifyObjectBaseProp(_198.Data);
_198.Data.id=id;
var rval=this.so.IDataSource.Delete(_198);
if(rval.ErrorCode!=0){
if(rval.ErrorMessage){
var _19a=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("Landmarks: deleteLandmark:"+_19a,rval.ErrorCode);
}else{
throw new DeviceError("Landmarks: deleteLandmark: Operation failed",rval.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_landmarks_delete: "+e);
}
};
function __sp_landmarks_update(_19b){
try{
if(!_19b){
throw new DeviceError("Landmarks: updateLandmark: Landmark is missing",err_missing_argument);
}else{
if(typeof _19b!="object"){
throw new DeviceError("Landmarks: updateLandmark: Landmark is invalid",err_bad_argument);
}else{
if(!_19b.id){
throw new DeviceError("Landmarks: updateLandmark: Landmark id is missing",err_bad_argument);
}else{
if(typeof _19b.id!="string"){
throw new DeviceError("Landmarks: updateLandmark: Landmark id is invalid",err_bad_argument);
}
}
}
}
var str="updateLandmark: ";
var _19d=new Object();
modifyObjectBaseProp(_19d);
_19d.Type="Landmark";
_19d.Data=new __sp_landmark_obj(_19b,str);
var rval=this.so.IDataSource.Add(_19d);
if(rval.ErrorCode!=0){
if(rval.ErrorMessage){
var _19f=splitErrorMessage(rval.ErrorMessage);
throw new DeviceError("Landmarks: updateLandmark:"+_19f,rval.ErrorCode);
}else{
throw new DeviceError("Landmarks: updateLandmark: Operation failed",rval.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_landmarks_update: "+e);
}
};
function __sp_landmarks_category_update(_1a0){
throw ("Not implemented");
};
var __device_messaging_service_entry={"name":null,"version":null,"proto":__device_messaging,"descriptor":__device_messaging_descriptor,"providers":[{"descriptor":__sp_messaging_descriptor,"instance":__sp_messaging_instance}]};
function __device_messaging_descriptor(_1a1){
this.interfaceName=_1a1.interfaceName;
this.version=_1a1.version;
};
function __device_messaging(_1a2){
this.provider=_1a2;
this.interfaceName=_1a2.descriptor.interfaceName;
this.version=_1a2.descriptor.version;
this.startEditor=__device_messaging_startEditor;
this.getList=__device_messaging_getList;
this.send=__device_messaging_send;
this.setNotifier=__device_messaging_setNotifier;
this.cancelNotifier=__device_messaging_cancelNotifier;
this.getMessage=__device_messaging_getMessage;
this.deleteMessage=__device_messaging_delete;
this.setStatus=__device_messaging_setStatus;
};
function __device_messaging_startEditor(_1a3){
return this.provider.startEditor(_1a3);
};
function __device_messaging_getList(_1a4,_1a5,_1a6,_1a7){
return this.provider.getList(_1a4,_1a5,_1a6,_1a7);
};
function __device_messaging_send(_1a8,_1a9){
return this.provider.send(_1a8,_1a9);
};
function __device_messaging_setNotifier(_1aa){
return this.provider.setNotifier(_1aa);
};
function __device_messaging_cancelNotifier(){
return this.provider.cancelNotifier();
};
function __device_messaging_getMessage(id){
return this.provider.getMessage(id);
};
function __device_messaging_delete(id){
return this.provider.deleteMessage(id);
};
function __device_messaging_setStatus(id,_1ae){
return this.provider.setStatus(id,_1ae);
};
var FILE_SCHEME="file://";
function __sp_messaging_descriptor(){
this.interfaceName="com.nokia.device.messaging";
this.version="0.1";
};
function __sp_messaging_instance(){
this.descriptor=new __sp_messaging_descriptor();
this.startEditor=__sp_messaging_startEditor;
this.getList=__sp_messaging_getList;
this.send=__sp_messaging_send;
this.setNotifier=__sp_messaging_setNotifier;
this.cancelNotifier=__sp_messaging_cancelNotifier;
this.getMessage=__sp_messaging_getMessage;
this.deleteMessage=__sp_messaging_delete;
this.setStatus=__sp_messaging_setStatus;
this.sendCommon=__sp_messaging_send_common;
try{
this.so=device.getServiceObject("Service.Messaging","IMessaging");
}
catch(e){
this.so=null;
__device_handle_exception(e,"Messaging service not available");
}
};
function __sp_attachment_build(_1af){
if(!_1af){
return null;
}
var _1b0=new Object();
modifyObjectBaseProp(_1b0);
if(_1af.uri){
if(_1af.uri.slice(0,7)!=FILE_SCHEME){
var _1b1=new Object();
_1b1.ErrorCode=err_bad_argument;
_1b1.ErrorMessage="uri is invalid";
throw _1b1;
}
_1b0.FileName=_1af.uri.slice(7).replace(/\057/g,"\\");
}
return _1b0;
};
function __sp_message_build(_1b2){
if(!_1b2){
return null;
}
var _1b3=new Object();
modifyObjectBaseProp(_1b3);
_1b3.MessageParam=new Object();
modifyObjectBaseProp(_1b3.MessageParam);
_1b3.MessageParam.LaunchEditor=false;
_1b3.MessageType=(_1b2.type==undefined||_1b2.type==null)?"SMS":_1b2.type;
if(_1b2.to){
if(__device_typeof(_1b2.to).toLowerCase()=="string"){
_1b3.To=_1b2.to;
}else{
if(__device_typeof(_1b2.to)=="Array"&&_1b2.to.length>0){
_1b3.To=_1b2.to[0];
if(_1b2.to.slice(1)){
_1b3.MessageParam.To=_1b2.to.slice(1);
}
}
}
}
if(_1b2.cc){
_1b3.MessageParam.Cc=_1b2.cc;
}
if(_1b3.MessageType=="SMS"){
if(_1b2.body){
_1b3.BodyText=_1b2.body;
}
}
if(_1b3.MessageType=="MMS"){
if(_1b2.body){
_1b3.BodyText=_1b2.body;
}
if(_1b2.subject){
_1b3.Subject=_1b2.subject;
}
if(_1b2.attachments){
_1b3.MessageParam.AttachmentList=new Array();
for(var a in _1b2.attachments){
_1b3.MessageParam.AttachmentList.push(__sp_attachment_build(_1b2.attachments[a]));
}
}
}
return _1b3;
};
function __sp_device_attachment_build(_1b5){
if(!_1b5){
return null;
}
var _1b6=new Object();
_1b6.uri=FILE_SCHEME+_1b5.FileName;
return _1b6;
};
function __sp_device_message_build(_1b7){
if(!_1b7){
return null;
}
var _1b8=new Object();
_1b8.type=_1b7.MessageType;
if(_1b7.BodyText){
_1b8.body=_1b7.BodyText;
}
if(_1b7.to){
_1b8.to=_1b7.To;
}
if(_1b7.Subject){
_1b8.subject=_1b7.Subject;
}
_1b8.attachment=false;
if(_1b8.type=="MMS"){
if(_1b7.Cc){
_1b8.cc=_1b7.Cc;
}
if(_1b7.AttachmentList){
_1b8.attachment=true;
_1b8.attachments=new Array();
for(var a in _1b7.AttachmentList){
_1b8.attachments.push(__sp_device_attachment_build(_1b7.AttachmentList[a]));
}
}
}
return _1b8;
};
function __sp_device_message_info_build_notifier(_1ba){
if(!_1ba){
return null;
}
var _1bb=new Object();
_1bb.message=new Object();
_1bb.message.type=_1ba.MessageType;
_1bb.sender=_1ba.Sender;
_1bb.message.subject=_1ba.Subject;
_1bb.time=_1ba.Time;
_1bb.attachments=(_1ba.Attachments==undefined||_1ba.Attachments==null)?(!(_1ba.AttachmentList==undefined||_1ba.AttachmentList==null)):_1ba.Attachments;
_1bb.unread=_1ba.Unread;
_1bb.id=_1ba.MessageId;
return _1bb;
};
function __sp_device_message_info_build(_1bc){
if(!_1bc){
return null;
}
var _1bd=new Object();
_1bd.message=__sp_device_message_build(_1bc);
_1bd.sender=_1bc.Sender;
_1bd.time=_1bc.Time;
_1bd.unread=_1bc.Unread;
_1bd.id=_1bc.MessageId;
return _1bd;
};
function __sp_message_iterator(_1be){
this.iter=_1be;
this.next=__sp_message_iterator_get_next;
};
function __sp_message_iterator_get_next(){
var _1bf=this.iter.getNext();
if(typeof _1bf=="undefined"){
return null;
}
return __sp_device_message_info_build(_1bf);
};
function __sp_messaging_getList(_1c0,_1c1,_1c2,_1c3){
if(!_1c0){
throw new DeviceError("Messaging:getList:callback is missing",err_missing_argument);
}else{
if(typeof _1c0!="function"){
throw new DeviceError("Messaging:getList:callback is not a function",err_bad_argument);
}
}
if(_1c1&&typeof _1c1!="object"){
throw new DeviceError("Messaging:getList:match is invalid",err_bad_argument);
}
var _1c4=function(arg1,arg2,arg3){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_message_iterator(arg3.ReturnValue);
}
if(arg2!=event_cancelled){
_1c0(arg1,arg3.ErrorCode,iter);
}
};
var _1c9=new Object();
modifyObjectBaseProp(_1c9);
_1c9.Type="Inbox";
_1c9.Filter=new Object();
modifyObjectBaseProp(_1c9.Filter);
_1c9.Filter.MessageTypeList=new Array();
_1c9.Filter.MessageTypeList.push("SMS");
_1c9.Filter.MessageTypeList.push("MMS");
if(_1c1){
if(_1c1.senders){
_1c9.Filter.SenderList=_1c1.senders;
}
if(_1c1.subject){
_1c9.Filter.Subject=_1c1.subject;
}
if(_1c1.start){
_1c9.Filter.StartDate=_1c1.start;
}
if(_1c1.end){
_1c9.Filter.EndDate=_1c1.end;
}
}
if(_1c2||_1c3){
_1c9.SortOrder=new Object();
modifyObjectBaseProp(_1c9.SortOrder);
if(_1c2){
if(_1c2==com.nokia.device.SORT_BY_DATE){
_1c9.SortOrder.Key="Date";
}else{
if(_1c2==com.nokia.device.SORT_BY_SENDER){
_1c9.SortOrder.Key="Sender";
}
}
}
if(_1c3){
if(_1c3=com.nokia.device.SORT_ASCENDING){
_1c9.SortOrder.Order="Ascending";
}else{
if(_1c3==com.nokia.device.SORT_DESCENDING){
_1c9.SortOrder.Order="Descending";
}
}
}
}
try{
var _1ca=this.so.IMessaging.GetList(_1c9);
if(_1ca.ErrorCode!=0){
if(_1ca.ErrorMessage){
var _1cb=splitErrorMessage(_1ca.ErrorMessage);
throw new DeviceError("Messaging:getList"+_1cb,_1ca.ErrorCode);
}else{
throw new DeviceError("Messaging:getList:operation failed",_1ca.ErrorCode);
}
}
_1c4(0,null,_1ca);
return 0;
}
catch(e){
__device_handle_exception(e,"__sp_messaging_getList: "+e);
}
};
function __sp_messaging_send_common(_1cc,_1cd,_1ce){
var _1cf=function(arg1,arg2,arg3){
if(_1ce){
if(arg2!=event_cancelled){
_1ce(arg1,arg3.ErrorCode);
}
}
};
var _1d3=__sp_message_build(_1cc);
_1d3.MessageParam.LaunchEditor=_1cd;
var _1d4;
if(_1cd==false){
_1d4=this.so.IMessaging.Send(_1d3,_1cf);
if(_1d4.ErrorCode!=0){
throw _1d4;
}
var _1d5=_1d4.TransactionID;
return _1d5;
}else{
_1d4=this.so.IMessaging.Send(_1d3);
if(_1d4.ErrorCode!=0){
throw _1d4;
}
}
};
function __sp_messaging_startEditor(_1d6){
if(!_1d6){
throw new DeviceError("Messaging:startEditor:message is missing",err_missing_argument);
}else{
if(typeof _1d6!="object"){
throw new DeviceError("Messaging:startEditor:message is invalid",err_bad_argument);
}
}
try{
this.sendCommon(_1d6,true,null);
}
catch(e){
var _1d7=null;
if(e.ErrorMessage){
var _1d8=splitErrorMessage(e.ErrorMessage);
_1d7=new DeviceError("Messaging:startEditor:"+_1d8,e.ErrorCode);
}else{
_1d7=new DeviceError("Messaging:startEditor:operation failed",e.ErrorCode);
}
__device_handle_exception(_1d7,"__sp_messaging_startEditor: "+_1d7);
}
};
function __sp_messaging_send(_1d9,_1da){
if(!_1d9){
throw new DeviceError("Messaging:send:message is missing",err_missing_argument);
}else{
if(typeof _1d9!="object"){
throw new DeviceError("Messaging:send:message is invalid",err_bad_argument);
}
}
if(!_1da){
throw new DeviceError("Messaging:send:callback is missing",err_missing_argument);
}else{
if(typeof _1da!="function"){
throw new DeviceError("Messaging:send:callback is invalid",err_bad_argument);
}
}
try{
var _1db=this.sendCommon(_1d9,false,_1da);
return _1db;
}
catch(e){
var _1dc=null;
if(e.ErrorMessage){
var _1dd=splitErrorMessage(e.ErrorMessage);
_1dc=new DeviceError("Messaging:send:"+_1dd,e.ErrorCode);
}else{
_1dc=new DeviceError("Messaging:send:operation failed",e.ErrorCode);
}
__device_handle_exception(_1dc,"__sp_messaging_send: "+_1dc);
}
};
function __sp_messaging_setNotifier(_1de){
if(!_1de){
throw new DeviceError("Messaging:setNotifier:callback is missing",err_missing_argument);
}else{
if(typeof _1de!="function"){
throw new DeviceError("Messaging:setNotifier:callback is invalid",err_bad_argument);
}
}
var _1df=function(arg1,arg2,arg3){
var _1e3=null;
if(arg3.ReturnValue){
_1e3=new __sp_device_message_info_build_notifier(arg3.ReturnValue);
}
if(arg2!=event_cancelled){
_1de(arg1,arg3.ErrorCode,_1e3.id);
}
};
var _1e4=new Object();
modifyObjectBaseProp(_1e4);
_1e4.Type="NewMessage";
try{
var _1e5=this.so.IMessaging.RegisterNotification(_1e4,_1df);
if(_1e5.ErrorCode!=0){
if(_1e5.ErrorMessage){
var _1e6=splitErrorMessage(_1e5.ErrorMessage);
throw new DeviceError("Messaging:setNotifier"+_1e6,_1e5.ErrorCode);
}else{
throw new DeviceError("Messaging:setNotifier:operation failed",_1e5.ErrorCode);
}
}
var _1e7=_1e5.TransactionID;
return _1e7;
}
catch(e){
__device_handle_exception(e,"__sp_messaging_setNotifier: "+e.toString());
}
};
function __sp_messaging_cancelNotifier(){
var _1e8=new Object();
modifyObjectBaseProp(_1e8);
_1e8.Type="NewMessage";
try{
var _1e9=this.so.IMessaging.CancelNotification(_1e8);
if(_1e9.ErrorCode!=0){
if(_1e9.ErrorMessage){
var _1ea=splitErrorMessage(_1e9.ErrorMessage);
throw new DeviceError("Messaging:cancelNotifier"+_1ea,_1e9.ErrorCode);
}else{
throw new DeviceError("Messaging:cancelNotifier:operation failed",_1e9.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_cancelNotifier: "+e);
}
};
function __sp_messaging_getMessage(id){
if(!id){
throw new DeviceError("Messaging:getMessage:id is missing",err_missing_argument);
}
var _1ec=new Object();
modifyObjectBaseProp(_1ec);
_1ec.Type="Inbox";
_1ec.Filter=new Object();
modifyObjectBaseProp(_1ec.Filter);
_1ec.Filter.MessageId=id;
try{
var _1ed=this.so.IMessaging.GetList(_1ec);
if(_1ed.ErrorCode!=0){
if(_1ed.ErrorMessage){
var _1ee=splitErrorMessage(_1ed.ErrorMessage);
throw new DeviceError("Messaging:getMessage"+_1ee,_1ed.ErrorCode);
}else{
throw new DeviceError("Messaging:getMessage:operation failed",_1ed.ErrorCode);
}
}
if(_1ed.ReturnValue){
var iter=new __sp_message_iterator(_1ed.ReturnValue);
return iter.next();
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_getMessage: "+e);
}
};
function __sp_messaging_delete(id){
if(!id){
throw new DeviceError("Messaging:delete:id is missing",err_missing_argument);
}
var _1f1=new Object();
modifyObjectBaseProp(_1f1);
_1f1.MessageId=id;
try{
var _1f2=this.so.IMessaging.Delete(_1f1);
if(_1f2.ErrorCode!=0){
if(_1f2.ErrorMessage){
var _1f3=splitErrorMessage(_1f2.ErrorMessage);
throw new DeviceError("Messaging:delete"+_1f3,_1f2.ErrorCode);
}else{
throw new DeviceError("Messaging:delete:operation failed",_1f2.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_delete: "+e);
}
};
function __sp_messaging_setStatus(id,_1f5){
if(id==null||id==undefined){
throw new DeviceError("Messaging:setStatus:id is missing",err_missing_argument);
}
if(_1f5==null||_1f5==undefined){
throw new DeviceError("Messaging:setStatus:status is missing",err_missing_argument);
}
var _1f6=new Object();
modifyObjectBaseProp(_1f6);
_1f6.MessageId=id;
if(_1f5==com.nokia.device.STATUS_UNREAD){
_1f6.Status="Unread";
}else{
if(_1f5==com.nokia.device.STATUS_READ){
_1f6.Status="Read";
}
}
try{
var _1f7=this.so.IMessaging.ChangeStatus(_1f6);
if(_1f7.ErrorCode!=0){
if(_1f7.ErrorMessage){
var _1f8=splitErrorMessage(_1f7.ErrorMessage);
throw new DeviceError("Messaging:setStatus"+_1f8,_1f7.ErrorCode);
}else{
throw new DeviceError("Messaging:setStatus:operation failed",_1f7.ErrorCode);
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_setStatus: "+e);
}
};
var __device_camera_service_entry={"name":null,"version":null,"proto":__device_camera,"descriptor":__device_camera_descriptor,"providers":[{"descriptor":__sp_camera_descriptor,"instance":__sp_camera_instance}]};
function __device_camera_descriptor(_1f9){
this.interfaceName=_1f9.interfaceName;
this.version=_1f9.version;
};
function __device_camera(_1fa){
this.provider=_1fa;
this.interfaceName=_1fa.descriptor.interfaceName;
this.version=_1fa.descriptor.version;
this.startCamera=__device_camera_startCamera;
this.stopViewfinder=__device_camera_stopViewfinder;
this.takePicture=__device_camera_takePicture;
};
function __device_camera_startCamera(_1fb){
return this.provider.startCamera(_1fb);
};
function __device_camera_stopViewfinder(){
this.provider.stopViewfinder();
};
function __device_camera_takePicture(_1fc){
this.provider.takePicture(_1fc);
};
function __sp_camera_descriptor(){
this.interfaceName="com.nokia.device.camera";
this.version="0.1";
};
var __sp_camera_start_date;
function __sp_camera_instance(){
this.descriptor=new __sp_camera_descriptor();
this.startCamera=__sp_startCamera;
this.stopViewfinder=__s60_api_not_supported;
this.takePicture=__s60_api_not_supported;
};
var CAMERA_APP_ID=270501242;
function __sp_startCamera(_1fd){
if(_1fd==null){
throw new DeviceError("Camera:startCamera:callback is missing",err_missing_argument);
}
if(typeof (_1fd)!="function"){
throw new DeviceError("Camera:startCamera:callback is a non-function",err_bad_argument);
}
var _1fe=function(){
var _1ff=function(arg1,arg2,arg3){
var it=arg3.ReturnValue;
var item;
var _205=new Array();
while((item=it.getNext())!=undefined){
var d=new Date(Date.parse(item.FileDate));
if(d>__sp_camera_start_date){
var _207=item.FileNameAndPath.replace(/\\/g,"/");
var _208="file:///";
_205.unshift(_208+_207);
}
}
var _209=0;
var _20a=0;
_1fd(_209,_20a,_205);
};
try{
var mso=device.getServiceObject("Service.MediaManagement","IDataSource");
}
catch(e){
__device_handle_exception(e,"media service not available : "+e);
}
var _20c=new Object();
modifyObjectBaseProp(_20c);
_20c.Type="FileInfo";
_20c.Filter=new Object();
modifyObjectBaseProp(_20c.Filter);
_20c.Filter.FileType="Image";
_20c.Sort=new Object();
modifyObjectBaseProp(_20c.Sort);
_20c.Sort.Key="FileDate";
_20c.Sort.Order="Descending";
try{
var rval=mso.IDataSource.GetList(_20c,_1ff);
}
catch(e){
__device_handle_exception(e,"media service GetList failed: "+e);
}
};
__sp_camera_start_date=new Date();
__s60_start_and_wait(CAMERA_APP_ID,"",_1fe);
var _20e=0;
return _20e;
};
var __device_geolocation_service_entry={"name":null,"version":null,"proto":__device_geolocation,"descriptor":__device_geolocation_descriptor,"providers":[{"descriptor":__sp_location_descriptor,"instance":__sp_location_instance}]};
function PositionError(){
this.UNKNOWN_ERROR=0;
this.PERMISSION_DENIED=1;
this.POSITION_UNAVAILABLE=2;
this.TIMEOUT=3;
this.code;
this.message;
};
function Coordinates(){
this.latitude=null;
this.longitude=null;
this.altitude=null;
this.accuracy=null;
this.altitudeAccuracy=null;
this.heading=null;
this.speed=null;
};
function Position(){
this.coords=null;
this.timestamp=null;
};
function PositionOptions(){
this.enableHighAccuracy=null;
this.timeout=null;
this.maximumAge=null;
};
function __device_geolocation(_20f){
this.provider=_20f;
this.interfaceName=_20f.descriptor.interfaceName;
this.version=_20f.descriptor.version;
this.getCurrentPosition=__device_geolocation_getCurrentPosition;
this.watchPosition=__device_geolocation_watchPosition;
this.clearWatch=__device_geolocation_clearWatch;
};
function __device_geolocation_descriptor(_210){
this.interfaceName=_210.interfaceName;
this.version=_210.version;
};
function __device_geolocation_getCurrentPosition(_211,_212,_213){
return this.provider.getLocation(_211,_212,_213);
};
function __device_geolocation_watchPosition(_214,_215,_216){
return this.provider.traceLocation(_214,_215,_216);
};
function __device_geolocation_clearWatch(_217){
this.provider.clearTrace(_217);
};
var __sp_location_trace_transactionId=-1;
function __sp_location_handle_error(_218,_219,_21a){
if(_218!=undefined&&typeof _218=="function"&&_218!=null){
var _21b=new PositionError();
if(1011==_219){
_21b.code=_21b.PERMISSION_DENIED;
}else{
if(1016==_219){
_21b.code=_21b.TIMEOUT;
if(_21a==undefined){
_21a="Request Timed out";
}
}else{
_21b.code=_21b.UNKNOWN_ERROR;
}
}
_21b.message=_21a;
_218(_21b);
}
};
function __sp_location_descriptor(){
this.interfaceName="com.nokia.device.geolocation";
this.version="0.1";
};
function __sp_location_instance(){
this.descriptor=new __sp_location_descriptor();
this.getLocation=__sp_getLocation;
this.traceLocation=__sp_traceLocation;
this.clearTrace=__sp_clearTrace;
this.trace=0;
try{
this.so=device.getServiceObject("Service.Location","ILocation");
}
catch(e){
this.so=null;
__device_handle_exception(e,"Location service not available");
}
};
var _sp_getLoc_in_use=false;
function __sp_getLocation(_21c,_21d,_21e){
if(_sp_getLoc_in_use){
var _21f="GetCurrentPosition in use";
__sp_location_handle_error(_21d,0,_21f);
return;
}
var _220=function(arg1,arg2,arg3){
_sp_getLoc_in_use=false;
if(arg3.ErrorCode){
__sp_location_handle_error(_21d,arg3.ErrorCode,arg3.ErrorMessage);
return;
}else{
var _224=new Coordinates();
_224.longitude=(arg3.ReturnValue.Longitude==undefined)?null:arg3.ReturnValue.Longitude;
_224.latitude=(arg3.ReturnValue.Latitude==undefined)?null:arg3.ReturnValue.Latitude;
_224.altitude=(arg3.ReturnValue.Altitude==undefined)?null:arg3.ReturnValue.Altitude;
_224.accuracy=null;
_224.altitudeAccuracy=null;
_224.heading=(arg3.ReturnValue.Heading==undefined)?null:arg3.ReturnValue.Heading;
_224.speed=(arg3.ReturnValue.HorizontalSpeed==undefined)?null:arg3.ReturnValue.HorizontalSpeed;
var _225=new Position();
_225.coords=new Object();
_225.coords=_224;
_225.timestamp=new Date();
_21c(_225);
}
};
if((typeof _21c!="function")){
var _226="Wrong callback type";
__sp_location_handle_error(_21d,0,_226);
return;
}
var _227=new Object();
modifyObjectBaseProp(_227);
if(_21e!=undefined){
if(_21e.enableHighAccuracy!="undefined"){
}
if(typeof _21e.timeout!="undefined"){
if(!(isNaN(parseInt(_21e.timeout)))){
_227.UpdateTimeOut=_21e.timeout*1000;
if(_227.UpdateTimeOut<=1000000&&_227.UpdateTimeOut>0){
_227.UpdateInterval=_227.UpdateTimeOut-1;
}
}else{
var _21f="Invalid time out";
__sp_location_handle_error(_21d,0,_21f);
return;
}
}
if(typeof _21e.maximumAge!="undefined"){
if(!(isNaN(parseInt(_21e.maximumAge)))){
_227.UpdateMaxAge=_21e.maximumAge*1000;
if(_227.UpdateMaxAge>=1000000&&_227.UpdateMaxAge>=0){
_227.UpdateInterval=_227.UpdateMaxAge+1;
}
}else{
var _21f="Invalid max age";
__sp_location_handle_error(_21d,0,_21f);
return;
}
}
}
_227.PartialUpdates=false;
var _228=new Object();
modifyObjectBaseProp(_228);
_228.LocationInformationClass="GenericLocationInfo";
_228.Updateoptions=_227;
try{
_sp_getLoc_in_use=true;
var rval=this.so.ILocation.GetLocation(_228,_220);
if(rval.ErrorCode!=0){
_sp_getLoc_in_use=false;
__sp_location_handle_error(_21d,rval.ErrorCode,rval.ErrorMessage);
return;
}
}
catch(e){
__device_handle_exception(e,"__sp_getLocation: "+e);
}
};
var __sp_location_trace_ucb=null;
var __sp_location_fail_cb=null;
var _sp_watch_in_use=false;
function __sp_location_trace_invoker(arg1,arg2,arg3){
if(arg3.ErrorCode){
_sp_watch_in_use=false;
__sp_location_handle_error(__sp_location_fail_cb,arg3.ErrorCode,arg3.ErrorMessage);
}else{
var _22d=new Coordinates();
_22d.longitude=(arg3.ReturnValue.Longitude==undefined)?null:arg3.ReturnValue.Longitude;
_22d.latitude=(arg3.ReturnValue.Latitude==undefined)?null:arg3.ReturnValue.Latitude;
_22d.altitude=(arg3.ReturnValue.Altitude==undefined)?null:arg3.ReturnValue.Altitude;
_22d.accuracy=null;
_22d.altitudeAccuracy=null;
_22d.heading=(arg3.ReturnValue.Heading==undefined)?null:arg3.ReturnValue.Heading;
_22d.speed=(arg3.ReturnValue.HorizontalSpeed==undefined)?null:arg3.ReturnValue.HorizontalSpeed;
var _22e=new Position();
_22e.coords=new Object();
_22e.coords=_22d;
_22e.timestamp=new Date();
__sp_location_trace_ucb(_22e);
}
};
function __sp_traceLocation(_22f,_230,_231){
if(_sp_watch_in_use){
var _232="Watch in use";
__sp_location_handle_error(_230,0,_232);
return;
}
if((typeof _22f!="function")){
var _232="Wrong callback type";
__sp_location_handle_error(_230,0,_232);
return;
}
var _233=new Object();
modifyObjectBaseProp(_233);
if(_231!=undefined){
if(_231.enableHighAccuracy!="undefined"){
}
if(typeof _231.timeout!="undefined"){
if(!(isNaN(parseInt(_231.timeout)))){
_233.UpdateTimeOut=_231.timeout*1000;
if(_233.UpdateTimeOut<=1000000&&_233.UpdateTimeOut>0){
_233.UpdateInterval=_233.UpdateTimeOut-1;
}
}else{
var _232="Invalid time out";
__sp_location_handle_error(_230,0,_232);
return;
}
}
if(typeof _231.maximumAge!="undefined"){
if(!(isNaN(parseInt(_231.maximumAge)))){
_233.UpdateMaxAge=_231.maximumAge*1000;
if(_233.UpdateMaxAge>=1000000&&_233.UpdateMaxAge>=0){
_233.UpdateInterval=_233.UpdateMaxAge+1;
}
}else{
var _232="Invalid max age";
__sp_location_handle_error(_230,0,_232);
return;
}
}
}
_233.PartialUpdates=false;
var _234=new Object();
modifyObjectBaseProp(_234);
_234.LocationInformationClass="GenericLocationInfo";
_234.Updateoptions=_233;
__sp_location_trace_ucb=_22f;
__sp_location_fail_cb=_230;
try{
_sp_watch_in_use=true;
var rval=this.so.ILocation.Trace(_234,__sp_location_trace_invoker);
if(rval.ErrorCode!=0){
_sp_watch_in_use=false;
__sp_location_handle_error(_230,rval.ErrorCode,rval.ErrorMessage);
return;
}
__sp_location_trace_transactionId=rval.TransactionID;
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_traceLocation: "+e);
}
};
function __sp_clearTrace(_236){
if(_236==__sp_location_trace_transactionId){
__sp_location_trace_ucb=null;
__sp_location_fail_cb=null;
_sp_watch_in_use=false;
__sp_location_trace_transactionId=-1;
var _237={NotificationType:"TraceCancel"};
modifyObjectBaseProp(_237);
try{
var _238=this.so.ILocation.CancelNotification(_237);
if(_238.ErrorCode!=0){
}
}
catch(e){
__device_handle_exception(e,"__sp_clearTrace: "+e);
}
}else{
return;
}
};

