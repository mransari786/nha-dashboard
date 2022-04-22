import { Component, OnInit,OnDestroy,ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { AccumulateReq } from '../models/accumulate-req';
import * as plugindatalabel from 'chartjs-plugin-datalabels'
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CookieService } from 'ngx-cookie-service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  // Decimation,
  Filler,
  Legend,  
  Title,
  Tooltip,
  ChartType,
  
  Color
} from 'chart.js';
import { Healthidreq } from '../models/healthidreq.model';
import { HealthidPartnerBO } from '../models/healthid-partner-bo';
import { HealthidCreatedBO } from '../models/healthid-created-bo';
import { StatedistReq } from '../models/statedist-req';
import { StnameReq } from '../models/stname-req';
import { HosplinkReq } from '../models/hosplink-req';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy,AfterViewInit{
  data: Healthidreq;
 stateWiseReq:AccumulateReq;
  hosplinkreq:HosplinkReq;
  bars: any;
HITSBars:any;
jsonDataHITS:any;
jsonDataHFTS:any;
jsonDataHPTS:any;
jsonDataHIG:any;
jsonDataHIA:any;
jsonDataHCT:any;
jsonDataP:any;
jsonDataS:any;
jsonDataFO:any;
jsonDataFM:any;
jsonDataHFRS:any;
jsonDataET:any;
jsonDataPM:any;
jsonDataHPRS:any;
jsonDataHPRAF:any;
jsonDataHFRAF:any;
HFTSBars:any;
HPTSBars:any;
HIGBars:any;
HFGBars:any;
HIABars:any;
HFABars:any;
  bars1: any;
  HTCTextArr:any;
  HTCValueArr:any;
  bars2: any;
  hFRAFTextArr:any;
  hFRAFValueArr:any;
  bars3: any;
  HPRAFTextArr:any;
  HPRAFValueArr:any;
  colorArray: any;
  TotalArray: any;
  StateArray: any;
  FState:any;
  PState:any;
  HArray:any;
  FArray:any;
  PArray:any;
  TextArray: any;
  colorArray1: any;
  HealthToday:String;
  PopPer:String;
  Overall:String;
FOBar:any;
FOTextArr:any;
FOValueArr:any;

HFRSBar:any;
HFRSTextArr:any;
HFRSValueArr:any;

HPRSBar:any;
HPRSTextArr:any;
HPRSValueArr:any;

HABar:any;
HATextArr:any;
HAValueArr:any;

FMbars:any;
FMTextArr:any;
FMValueArr:any;
FMColorArr:any;

PMbars:any;
PMTextArr:any;
PMValueArr:any;

PEbars:any;
PETextArr:any;
PEValueArr:any;
  statedistReq:StatedistReq;
  FacilityToday:String;
  FacilityApp:String;
  FacilityReg:String;

  ProfToday:String;
  ProfApp:String;
  ProfReg:String;

  AadhaarPer:String;
  HeaderText:String;
  PartnerWise:HealthidPartnerBO;
  CreatedStateWise:HealthidCreatedBO;
  stateList:any;
  distList:any;
  HCTW:any;
  HCTT:any;
  HCTA:any;
  state:any;
  district:any;

  stateDist:any;
  cookieValue:any;
  uploadDate:any;


  statename:StnameReq;
  state_code:any;

  SortABHA:any;
  SortHFTS:any;
  SortHPTS:any;

  ABHALCSStateTextArr : any;
  ABHALCSStateValueArr : any;
  ABHALCStxtArr :any;
  ABHALCSarr:any;
  jsonDataABHALCS:any;
  ABHALCSStatebars:any;

  ABHALTextArr:any;
ABHALHidCount:any;
ABHALRecordCount:any;
jsonDataABHAL:any;
ABHALbars:any;

ABHALPTextArr:any;
ABHALPValueArr:any;
ABHALPtxtArr:any;
ABHALParr:any;
jsonDataABHALP:any;
ABHALPbars:any;
ABHALPOriginArr:any;

PTUTState_District:any;
HRTUTState_District:any;
HITUTState_District:any;
partnerSort:any;

SortHLP:any;
  //barChart:any;
  @ViewChild('barGender') barGender;
  @ViewChild('barAge') barAge;
  @ViewChild('barDate') barDate;
  @ViewChild('barChart') barChart;
  @ViewChild('pieChartfacility') pieChartfacility;
  @ViewChild('pieChartsystem') pieChartsystem;
  @ViewChild('areaChart') areaChart;
  @ViewChild('hfrafChart') hfrafChart;
  @ViewChild('hprafChart') hprafChart;
  @ViewChild('professionalMedicine') professionalMedicine;
  @ViewChild('professionalEnrolmentType') professionalEnrolmentType;
  @ViewChild('HealthIdtopUT') HealthIdtopUT;
  @ViewChild('HealthRegistrytopUT') HealthRegistrytopUT;
  @ViewChild('ProfessionaltopUT') ProfessionaltopUT;
  @ViewChild('barAuthType') barAuthType;
  @ViewChild('HFRSChart') HFRSChart;
  @ViewChild('HPRSChart') HPRSChart;
  @ViewChild('ABHALChart') ABHALChart;
  @ViewChild('ABHALPChart') ABHALPChart:ElementRef;
  ABHALElement: HTMLElement;
  HealthIdtopUTElement: HTMLElement;
  HealthRegistrytopUTElement: HTMLElement;
  ProfessionaltopUTElement: HTMLElement;


  constructor(public apiService: ApiService,
    public router: Router,private cookieService: CookieService,private renderer: Renderer2) {     
      this.data=new Healthidreq();
      this.stateWiseReq=new AccumulateReq();
      this.PartnerWise=new HealthidPartnerBO();
      this.CreatedStateWise=new HealthidCreatedBO();
      this.statedistReq=new StatedistReq();
      this.cookieValue = this.cookieService.get('JSESSIONID');
      this.statename=new StnameReq();
      this.state="";
      this.hosplinkreq=new HosplinkReq();
      this.PTUTState_District="S";
      this.HRTUTState_District="S";
      this.HITUTState_District="S";
    }
   //**********************Export***************** */ 
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  exportexcel(type:any,filename:any,jsonData:any)
  {
    if(type=='HITS')
    {
    this.exportExcel(this.jsonDataHITS,filename);
    }
    if(type=='HFTS')
    {
      this.exportExcel(this.jsonDataHFTS,filename);
    }
    if(type=='HPTS')
    {
      this.exportExcel(this.jsonDataHPTS,filename);
    }
    if(type=='HIG')
    {
      this.exportExcel(this.jsonDataHIG,filename);
    }
    if(type=='HIA')
    {
      this.exportExcel(this.jsonDataHIA,filename);
    }
    if(type=='HCT')
    {
      this.exportExcel(this.jsonDataHCT,filename);
    }
    if(type=='P')
    {
      this.exportExcel(this.jsonDataP,filename);
    }
    if(type=='S')
    {
      this.exportExcel(this.jsonDataS,filename);
    }
    if(type=='FO')
    {
      this.exportExcel(this.jsonDataFO,filename);
    }
    if(type=='FM')
    {
      this.exportExcel(this.jsonDataFM,filename);
    }
    if(type=='HFRS')
    {
      this.exportExcel(this.jsonDataHFRS,filename);
    }
    if(type=='ET')
    {
      this.exportExcel(this.jsonDataET,filename);
    }
    if(type=='PM')
    {
      this.exportExcel(this.jsonDataPM,filename);
    }
    if(type=='HPRS')
    {
      this.exportExcel(this.jsonDataHPRS,filename);
    }
    if(type=='HPRAF')
    {
      this.exportExcel(this.jsonDataHPRAF,filename);
    }
    if(type=='HFRAF')
    {
      this.exportExcel(this.jsonDataHFRAF,filename);
    }
    if(type=='ABHALT')
    {
      this.exportExcel(this.jsonDataABHAL,filename);
    }
    if(type=='ABHALP')
    {
      this.exportExcel(this.jsonDataABHALP,filename);
    }
  }
  
  exportS()
  {
    this.exportExcel(this.jsonDataS,"State_UT-wise_Health-IDs_created");
  }
  exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  //****************************************End************************** */
     
    ngOnInit() : void{   
      Chart.register(        
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Filler,
        Legend,
        Title,

        Tooltip
      );
      //this.divElement = this.ABHALPChart.nativeElement
     this.GetHealthData("",""); 
     this.getHealthStateWiseData("","");  
     this.getTopStateFacility("","");  
     this.getTopStateProf("",""); 
     this.GetHealthIdGender("",""); 
     this.GetHealthIdAge("","");
     this.GetHealthIdParnerWise("","");
     this.GetHealthIdCreatedStateWise("","");
     this.GetFacilityOwner("","");
     this.GetFacilityMedicine("","");
     this.GetHealthCreationTren('HCT','T',"","");
     this.GetHFRAF('HFRAF','T',"","");
     this.GetHPRAF('HPRAF','T',"","");
     this.GetProfessionalEnrolmentType("","");
     this.GetProfessionalMedicine("","");
     //this.GetHealthIdAuthType();
     this.GetHFRS("","");
     this.GetHPRS("",""); 


     this.GetStateMaster();
     this.GetUploadDate();
     this.GetABHALinkedTrend('ABHALT','T',"","")
     this.GetABHALP('ABHAL','',"","","")
     this.stateDist="State/UT";


    
     //this.sortByAsend();
     //console.log(this.jsonDataHITS);
   }
   
   ngAfterViewInit() {
     //console.log (this.ABHALPValueArr.length);
    //this.renderer.setStyle(this.ABHALPChart._elementRef.nativeElement, 'height', '2000px');
  }

   ngOnDestroy(): void {
    
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
   GetHealthData(state_code:any,district_code:any)
   {
    this.statedistReq.type='HI';  
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_code;
    this.statedistReq.rpttype="";
    this.apiService.GetHealthIDeData(this.statedistReq).subscribe((response) => {
      //console.log(response);
    if(response['status']=="true")
    {
      
      this.HealthToday=response['today'];
      this.Overall=response['total1'];      
      this.PopPer=response['total2'];
    }
    });  
      
    this.statedistReq.type='HF';  
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_code;
    this.statedistReq.rpttype="";    
    this.apiService.GetHealthIDeData(this.statedistReq).subscribe((response) => {        
        if(response['status']=="true")
    {
      
      this.FacilityToday=response['today'];
      this.FacilityApp=response['total1'];      
      this.FacilityReg=response['total2'];
    }
    });
    
    this.statedistReq.type='HP';  
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_code;
    this.statedistReq.rpttype="";   
    this.apiService.GetHealthIDeData(this.statedistReq).subscribe((response) => {
        if(response['status']=="true")
    {   
      this.ProfToday=response['today'];
      this.ProfApp=response['total1'];      
      this.ProfReg=response['total2'];
    }
    });

   }
   HCTclickme(type){
    this.bars1.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }

    this.GetHealthCreationTren('HCT',type,this.state,this.district);
    let elementW = document.getElementById('HCTW');
    let elementT = document.getElementById('HCTT');
    let elementA = document.getElementById('HCTA');
    if(type=='W')
    {      
      elementW.className = 'active';
      elementT.className = '';
      elementA.className = '';
    }
    if(type=='T')
    {      
      elementW.className = '';
      elementT.className = 'active';
      elementA.className = '';
    }
    if(type=='A')
    {     
      elementW.className = '';
      elementT.className = '';
      elementA.className = 'active';
    }
  }
  
  HFRAFclickme(type){
    this.bars2.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    
    this.GetHFRAF('HFRAF',type,this.state,this.district);
    let elementW = document.getElementById('HFRAFW');
    let elementT = document.getElementById('HFRAFT');
    let elementA = document.getElementById('HFRAFA');
    if(type=='W')
    {      
      elementW.className = 'active';
      elementT.className = '';
      elementA.className = '';
    }
    if(type=='T')
    {      
      elementW.className = '';
      elementT.className = 'active';
      elementA.className = '';
    }
    if(type=='A')
    {     
      elementW.className = '';
      elementT.className = '';
      elementA.className = 'active';
    }
  }

  HPRAFclickme(type){
    this.bars3.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    this.GetHPRAF('HPRAF',type,this.state,this.district);
    let elementW = document.getElementById('HPRAFW');
    let elementT = document.getElementById('HPRAFT');
    let elementA = document.getElementById('HPRAFA');
    if(type=='W')
    {      
      elementW.className = 'active';
      elementT.className = '';
      elementA.className = '';      
    }
    if(type=='T')
    {      
      elementW.className = '';
      elementT.className = 'active';
      elementA.className = '';
    }
    if(type=='A')
    {     
      elementW.className = '';
      elementT.className = '';
      elementA.className = 'active';      
    }
  }

  ABHALclickme(type){
    this.ABHALbars.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    this.GetABHALinkedTrend('ABHALT',type,this.state,this.district);
    let elementW = document.getElementById('ABHALW');
    let elementT = document.getElementById('ABHALT');
    let elementA = document.getElementById('ABHALA');
    if(type=='W')
    {      
      elementW.className = 'active';
      elementT.className = '';
      elementA.className = '';      
    }
    if(type=='T')
    {      
      elementW.className = '';
      elementT.className = 'active';
      elementA.className = '';
    }
    if(type=='A')
    {     
      elementW.className = '';
      elementT.className = '';
      elementA.className = 'active';      
    }
  }
   getHealthStateWiseData(state_code:any,district_code:any)
   {
    
    this.statedistReq=new StatedistReq();
    this.StateArray = [];
    this.HArray = [];
    this.FArray = [];
    this.PArray = [];
    this.jsonDataHITS = [];
    this.SortABHA=[];
    this.statedistReq.type='HITS'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code; 
    this.statedistReq.rpttype="";
    this.apiService.GetHealthStateWiseData(this.statedistReq).subscribe((response) => {
      //console.log(response);
     // console.log(response['status']);         
        if(response['status']=="true")
     {
       var list=response['list']      
       this.jsonDataHITS=list;
       this.SortABHA=list;
       var arrState = list;       
      //console.log(response);
        for(var i in arrState) {
          this.StateArray.push(arrState[i]['text']);        
          //this.HArray.push(arrState[i]['value']);  
          this.HArray.push((Number(arrState[i]['value'])/100000.00).toFixed(1));            
      }     

      this.HealthIdtopUTElement = this.HealthIdtopUT.nativeElement;
          var px=(this.HArray.length*22)+"px";
          this.HealthIdtopUTElement.style.height=px;

      this.HITSBars = new Chart(this.HealthIdtopUT.nativeElement, {
        type: 'bar',
        
        data: {
          labels: this.StateArray,
          datasets: [{  
            label:'Health ID'  ,      
            data: this.HArray,
            backgroundColor: '#9cb9db', // array should have same number of elements as number of dataset
            borderColor: '#B9E5F2',// array should have same number of elements as number of dataset
            borderWidth: 1
          }],
          
        },
        
        options: {
         plugins:{datalabels: {
          display: true,
          align: 'right', 
          color:'black',
          formatter: function(value, context) {
            return value+"L";
         }           
        },legend:{display:false}
      ,tooltip: {
        callbacks: {
            label: function(context) {
              
                let label = context.dataset.label || '';

                return label +": " + context.parsed.x+"L";
            }
        }
    }
      },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
              
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            //console.log("index : "+index);
            this.statename.state_name=this.StateArray[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 
             if(response['status']=="true")
              {
                if(this.HITUTState_District=="S")
                {
                  this.HITSBars.destroy();
                  this.getHealthStateWiseData(response['state_code'],"");
                  this.HITUTState_District="D";
                }
                else
                {
                  this.HITSBars.destroy();
                  this.getHealthStateWiseData(this.state,"");
                  this.HITUTState_District="S";
                }
              }
              else
              {                
               this.HITSBars.destroy();
               this.getHealthStateWiseData(this.state,"");
               this.HITUTState_District="S";
              }
              //console.log(this.state_code);
            });          
  
          },scales:{x:{grid:{display:true},position:'top'},y:{grid:{display:true}}},         
        }
      });
      

      

     /* this.bars = new Chart(this.HealthRegistrytopUT.nativeElement, {
        type: 'bar',
        
        data: {
          labels: this.StateArray,
          datasets: [{  
            label:'Health Facility Registry'  ,      
            data: this.FArray,
            backgroundColor: '#FDC0A3', // array should have same number of elements as number of dataset
            borderColor: '#FDC0A3',// array should have same number of elements as number of dataset
            borderWidth: 1
          }],
          
        },
        
        options: {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
              
            }
          },
        }
      });
      this.bars = new Chart(this.ProfessionaltopUT.nativeElement, {
        type: 'bar',
        
        data: {
          labels: this.StateArray,
          datasets: [{  
              label:'Health Professtionals Registry'  ,    
              data: this.PArray,
              backgroundColor: '#FBE99F', // array should have same number of elements as number of dataset
              borderColor: '#FBE99F',// array should have same number of elements as number of dataset
              borderWidth: 1}],
          
        },
        
        options: {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
              
            }
          },
        }
      });*/
    }
  });

 
   }

   getTopStateFacility(state_code:any,district_code:any)
   {
    
    //console.log("state_code :" +state_code);
    //console.log("district_code :" +district_code);
    this.statedistReq=new StatedistReq();
    this.FState = [];
    this.FArray = [];
    this.jsonDataHFTS = [];
    this.statedistReq.type='HFTS'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code; 
    this.statedistReq.rpttype="";
    this.apiService.GetHealthStateWiseData(this.statedistReq).subscribe((response) => {
            
        if(response['status']=="true")
     {
       var list=response['list']
      var arrState = list;
      this.jsonDataHFTS=list;
      this.jsonDataHFTS=list;
      this.SortHFTS=list;
     //console.log(list);
        for(var i in arrState) {
          this.FState.push(arrState[i]['text']);        
          this.FArray.push(arrState[i]['value']);   
      }

      
      this.HealthRegistrytopUTElement = this.HealthRegistrytopUT.nativeElement;
      var px=(this.FArray.length*22)+"px";
      this.HealthRegistrytopUTElement.style.height=px;
      
      this.HFTSBars = new Chart(this.HealthRegistrytopUT.nativeElement, {
        type: 'bar',
        
        data: {
          labels: this.FState,
          datasets: [{  
            label:'Registered- Health'  ,      
            data: this.FArray,
            backgroundColor: '#9cb9db', // array should have same number of elements as number of dataset
            borderColor: '#B9E5F2',// array should have same number of elements as number of dataset
            borderWidth: 1
          }],
          
        },
        
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: true,
              align: 'right', 
              color:'black',
              formatter: function(nStr, context) {
                var num;
                if(nStr.length==4)
                num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
                else if(nStr.length==5)
                num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
                else if(nStr.length==6)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
                else if(nStr.length==7)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
                else if(nStr.length==8)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
                else if(nStr.length==9)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
                else if(nStr.length==10)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
                else
                num=nStr
       //console.log(nStr+" : "+num);
                return num;
             }           
            }
          },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
              
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            //console.log("index : "+index);
            this.statename.state_name=this.FState[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 
             if(response['status']=="true")
              {
                if(this.HRTUTState_District=="S")
                {
                  this.HFTSBars.destroy();
                  this.getTopStateFacility(response['state_code'],"");
                  this.HRTUTState_District="D";
                }
                else
                {
                  this.HFTSBars.destroy();
                  this.getTopStateFacility(this.state,"");
                  this.HRTUTState_District="S";
                }
              }
              else
              {                
               this.HFTSBars.destroy();
               this.getTopStateFacility(this.state,"");
               this.HRTUTState_District="S";
              }
              //console.log(this.state_code);
            });          
  
          },scales:{x:{grid:{display:true},position:'top'},y:{grid:{display:true}}},         
        }
      });

     
    }
  });

 
   }

   getTopStateProf(state_code:any,district_code:any)
   {
    
    this.statedistReq=new StatedistReq();
    this.PState = [];
    this.PArray = [];
    this.jsonDataHPTS  = [];
    this.statedistReq.type='HPTS'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code; 
    this.statedistReq.rpttype="";
    this.apiService.GetHealthStateWiseData(this.statedistReq).subscribe((response) => {
            
        if(response['status']=="true")
     {
       var list=response['list']
      var arrState = list;
      this.jsonDataHPTS = list;
      this.SortHPTS = list;
        for(var i in arrState) {
          this.PState.push(arrState[i]['text']);        
          this.PArray.push(arrState[i]['value']);   
      }

      
      this.ProfessionaltopUTElement = this.ProfessionaltopUT.nativeElement;
      var px=(this.PArray.length*22)+"px";
      this.ProfessionaltopUTElement.style.height=px;
      
      this.HPTSBars = new Chart(this.ProfessionaltopUT.nativeElement, {
        type: 'bar',
        
        data: {
          labels: this.PState,
          datasets: [{  
            label:'Healthcare Professionals'  ,      
            data: this.PArray,
            backgroundColor: '#9cb9db', // array should have same number of elements as number of dataset
            borderColor: '#B9E5F2',// array should have same number of elements as number of dataset
            borderWidth: 1
          }],
          
        },
        
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: true,
              align: 'right', 
              color:'black',
              formatter: function(nStr, context) {
                var num;
                if(nStr.length==4)
                num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
                else if(nStr.length==5)
                num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
                else if(nStr.length==6)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
                else if(nStr.length==7)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
                else if(nStr.length==8)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
                else if(nStr.length==9)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
                else if(nStr.length==10)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
                else
                num=nStr
       //console.log(nStr+" : "+num);
                return num;
             }           
            }
          },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
              
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            //console.log("index : "+index);
            this.statename.state_name=this.PState[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
              //console.log("status : "+response['status']); 
             if(response['status']=="true")
              {
                if(this.PTUTState_District=="S")
                {
                 this.HPTSBars.destroy();
                 this.getTopStateProf(response['state_code'],"");
                 this.PTUTState_District="D";
                }
                else
                {
                  this.HPTSBars.destroy();
                  this.getTopStateProf(this.state,"");
                  this.PTUTState_District="S";
                }
              }
              else
              {                
               this.HPTSBars.destroy();
               this.getTopStateProf(this.state,"");
               this.PTUTState_District="S";
              }
              //console.log(this.state_code);
            });          
  
          },scales:{x:{grid:{display:true},position:'top'},y:{grid:{display:true}}},         
        }
      });

     
    }
  });

 
   }

   GetPieChart(type,chart,lable)
   {
    this.data.type=type;        
    this.apiService.GetHealthTrendData(this.data).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.TotalArray = [];
      this.TextArray = [];
        this.colorArray.push('#FFDDCE');
        this.colorArray.push('#F5D33F');
        this.colorArray.push('#3C8DBC');
        var arrTags = response['total'].split(',');
        for(var i in arrTags) {
          this.TotalArray.push(arrTags[i]);         
          
      }
      var text=response['text'];
      text=text.substring(0,text.length-1);      
      var arrText = text.split(',');
        for(var i in arrText) {
          this.TextArray.push(arrText[i]);          
      }       
      this.bars = new Chart(chart.nativeElement, {
        type: 'pie',        
        data: {
          labels: this.TextArray,
          datasets: [{  
            label:lable  ,        
            data: this.TotalArray,
            backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }

   GetABHALP(type:any,rpttype:any,state_code:any,district_code:any,origin:any)
   {

    if(origin=="")
    {
    this.statedistReq.type=type;  
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_code;
    this.statedistReq.rpttype=rpttype;    
    
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => { 
         // this.chResp=response; 
       //console.log(response);  
        if(response['status']=="true")
    {
      //console.log("Test "+this.chResp.list?.text);  
     
      this.ABHALPTextArr = [];
      this.ABHALPValueArr = [];
      this.ABHALPOriginArr = [];
      this.ABHALPtxtArr = [];
      this.ABHALParr=[];
      this.jsonDataABHALP=[];
        
        this.ABHALPtxtArr=response['list'];
        this.SortHLP = response['list'];
        this.jsonDataABHALP = response['list'];
        
        //const list =  this.txtArr;
        
       // list.sort((a:any, b:any) => (a.text > b.text) ? 1 : -1)
       // console.log(list);
        
          for(var i in this.ABHALPtxtArr)
          {
            this.ABHALPTextArr.push(this.ABHALPtxtArr[i]['text']);
            this.ABHALPValueArr.push(this.ABHALPtxtArr[i]['value']);           
            this.ABHALPOriginArr.push(this.ABHALPtxtArr[i]['origin']);           
          }
          //console.log(this.ABHALPtxtArr.length);
          this.ABHALElement = this.ABHALPChart.nativeElement;
          var px=(this.ABHALPtxtArr.length*14)+"px";
          this.ABHALElement.style.height=px;
        //this.renderer.setStyle(this.ABHALPChart._elementRef.nativeElement, 'max-height', '20000px');
      this.ABHALPbars = new Chart(this.ABHALPChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.ABHALPTextArr,
          datasets: [{  
            label:'Health Records Linked'  ,        
            data: this.ABHALPValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
            ,datalabels: {
              display: true,
              align: 'end', 
              color:'black'             
            }
          },          
          indexAxis: 'y', scales:{x:{grid:{display:false},position:'top'},y:{grid:{display:false}},},         
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            var orign=this.ABHALPOriginArr[index];   
           if(orign!="")
           {
            this.ABHALPbars.destroy();
             this.GetABHALP("","",this.state,"",orign)
           }        
  
          }
        }
      });
    }
    });
  }
  if(origin!="")
  {
    this.hosplinkreq.origin=origin;  
    this.hosplinkreq.state_code=state_code;
    
    
    this.apiService.GetHospitalLinked(this.hosplinkreq).subscribe((response) => { 
         // this.chResp=response; 
       //console.log(response);  
        if(response['status']=="true")
    {
      //console.log("Test "+this.chResp.list?.text);  
     
      this.ABHALPTextArr = [];
      this.ABHALPOriginArr = [];
      this.ABHALPValueArr = [];
      this.ABHALPtxtArr = [];
      this.ABHALParr=[];
      this.jsonDataABHALP=[];
        
        this.ABHALPtxtArr=response['list'];
        this.SortHLP = response['list'];
        this.jsonDataABHALP = response['list'];
        
        //const list =  this.txtArr;
        
       // list.sort((a:any, b:any) => (a.text > b.text) ? 1 : -1)
       // console.log(list);
        
          for(var i in this.ABHALPtxtArr)
          {
            this.ABHALPTextArr.push(this.ABHALPtxtArr[i]['text'].split("\n"));
            this.ABHALPValueArr.push(this.ABHALPtxtArr[i]['value']);           
            //this.ABHALPValueArr.push(this.ABHALPtxtArr[i]['value']);  
          }
        //console.log (this.ABHALPValueArr);
        this.ABHALElement = this.ABHALPChart.nativeElement;
          var px=(this.ABHALPtxtArr.length*16)+"px";
          this.ABHALElement.style.height=px;
          
      this.ABHALPbars = new Chart(this.ABHALPChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.ABHALPTextArr,
          datasets: [{  
            label:'Health Records Linked'  ,        
            data: this.ABHALPValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
          }]
                  },
        options: {
          plugins:{
            legend:{display: false}
            ,datalabels: {
              display: true,
              align: 'end', 
              color:'black' ,
                        
            }
          },          
          indexAxis: 'y', scales:{x:{grid:{display:false},position:'top'},y:{grid:{display:false},ticks:{font:{size:11}}}},         
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          onClick: (evt, item) => {
            this.ABHALPbars.destroy();
            if(this.state!=""){
              this.GetABHALP('ABHAL','',this.state,"","")
            }
            else{
            this.GetABHALP('ABHAL','',"","","")   }   
  
          }
          
        }
      });
    }
    });

  }
   }

   GetHealthIdGender(state_code:any,district_code:any)
   {
    this.statedistReq.type='HG'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype="";    
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.TotalArray = [];
      this.TextArray = [];
      this.jsonDataHIG=[];
        this.colorArray.push('#f7c183');
        this.colorArray.push('#7dc2bf');
        this.colorArray.push('#e9efeb');

        var arrState = response['list'];
        this.jsonDataHIG=arrState;
      //console.log(response);

     var total=0;
          for(var i in arrState)
            {
              total=total+Number(arrState[i]['value'])
            
            }

        for(var i in arrState) {
          this.TextArray.push(arrState[i]['text']);        
         // this.TotalArray.push(arrState[i]['value']);   
          this.TotalArray.push((Number(arrState[i]['value'])*100.00/total).toFixed(2));
      }

              
      this.HIGBars = new Chart(this.barGender.nativeElement, {
        type: 'pie',        
        data: {
          labels: this.TextArray,
          datasets: [{  
            label:'Gender'  ,        
            data: this.TotalArray,
            backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{datalabels: {
            display: true,
           
            color:'black',
            formatter: function(value, context) {
              return value+"%";
           }           
          },
            legend:{
              labels:{
                boxHeight:15,
                padding:27,
                
              }
            },tooltip: {
              callbacks: {
                  label: function(context) {
                   // console.log(context);
                      let label = context.label;
                      //console.log(label);

                      return label +": " +context.parsed+"%";
                  }
              }
          }
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }


   GetStateMaster()
   {
    this.statedistReq.type='SM'; 
    this.statedistReq.district_code="";       
    this.apiService.GetStateMaster(this.statedistReq).subscribe((response) => { 
      //console.log(response['status']);            
        if(response['status']=="true")
    {
      this.stateList=response['list'];
      //console.log(this.stateList);
    }
    });
     
   }
   bindDistrict(val: any) {
     this.state=val;
     this.district='';
    this.statedistReq.type='DM'; 
    this.statedistReq.state_code=val;       
    this.apiService.GetStateMaster(this.statedistReq).subscribe((response) => { 
      //console.log(response['status']);            
        if(response['status']=="true")
    {
      this.distList=response['list'];
      //console.log(this.stateList);
    }
    });

    if(val!="")
    {
    this.stateDist="District";
    }
    else
    {
      this.stateDist="State/UT";      
    }

    this.PTUTState_District="S";
    this.HRTUTState_District="S";
    this.HITUTState_District="S";

    this.ABHALPbars.destroy();
    this.GetABHALP('ABHAL','',val,"","")

    this.ABHALbars.destroy();
    this.GetABHALinkedTrend('ABHALT','T',val,"")
    
    this.GetHealthIdParnerWise(val,"");
    
    this.GetHealthData(val,"");

    this.HITSBars.destroy();
    this.getHealthStateWiseData(val,"");
    
    this.HIGBars.destroy();
    this.GetHealthIdGender(val,""); 
    
    this.bars1.destroy();
    this.GetHealthCreationTren('HCT','T',val,""); 
    
    this.GetHealthIdCreatedStateWise(val,"");

    this.HFTSBars.destroy();
    this.getTopStateFacility(val,"");
    
    this.HPTSBars.destroy();
    this.getTopStateProf(val,""); 
    
    this.FOBar.destroy();
    this.GetFacilityOwner(val,"");
    
    this.HFRSBar.destroy();
    this.GetHFRS(val,"");
    
    this.HPRSBar.destroy();
    this.GetHPRS(val,"");
    
    //this.bars2.destroy();
    //this.GetHFRAF('HFRAF','T',val,""); 
    
    //this.bars3.destroy();
    //this.GetHPRAF('HPRAF','T',val,""); 
   
    this.HABar.destroy();
    this.GetHealthIdAge(val,"");
    
    this.FMbars.destroy();
    this.GetFacilityMedicine(val,"");

    this.PMbars.destroy();
    this.GetProfessionalMedicine(val,"");

    this.PEbars.destroy();
    this.GetProfessionalEnrolmentType(val,"");
    
   }

   GetData(val: any) {
    this.district=val;
    //console.log("District Code: "+val);
    //console.log("State Code: "+this.state);
    this.HITSBars.destroy();
    this.HIGBars.destroy();
    this.bars1.destroy();
    this.HFTSBars.destroy();
    this.HPTSBars.destroy();
    this.FOBar.destroy();
    this.GetHealthData(this.state,val);
    this.getHealthStateWiseData(this.state,val);
    this.GetHealthIdGender(this.state,val);
    this.GetHealthCreationTren('HCT','T',this.state,val);  
    this.GetHealthIdCreatedStateWise(this.state,val);
    this.getTopStateFacility(this.state,val);
    this.getTopStateProf(this.state,val); 
    this.GetFacilityOwner(this.state,val);
    this.HFRSBar.destroy();
    this.GetHFRS(this.state,val);
    this.HPRSBar.destroy();
    this.GetHPRS(this.state,val);
    this.bars2.destroy();
    this.GetHFRAF('HFRAF','T',this.state,val); 
    this.bars3.destroy();
    this.GetHPRAF('HPRAF','T',this.state,val);
    this.HABar.destroy();
    this.GetHealthIdAge(this.state,val); 
    this.FMbars.destroy();
    this.GetFacilityMedicine(this.state,val);
    this.PMbars.destroy();
    this.GetProfessionalMedicine(this.state,val);
    this.PEbars.destroy();
    this.GetProfessionalEnrolmentType(this.state,val);
    this.GetHealthIdParnerWise(this.state,val);
   }
   GetHealthIdAuthType()
   {
    this.data.type='AU';        
    this.apiService.GetHealthTrendData(this.data).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.TotalArray = [];
      this.TextArray = [];
       // this.colorArray.push('#FFDDCE');
        //this.colorArray.push('#F5D33F');
        //this.colorArray.push('#3C8DBC');

        this.colorArray.push('#f7c183');
        this.colorArray.push('#7dc2bf');
        this.colorArray.push('#e9efeb');

        var arrTags = response['total'].split(',');
        for(var i in arrTags) {
          this.TotalArray.push(arrTags[i]);         
          
      }
      var text=response['text'];
      text=text.substring(0,text.length-1);      
      var arrText = text.split(',');
        for(var i in arrText) {
          this.TextArray.push(arrText[i]);          
      }       
      this.bars = new Chart(this.barAuthType.nativeElement, {
        type: 'pie',        
        data: {
          labels: this.TextArray,
          datasets: [{  
            label:'Authentication Type'  ,        
            data: this.TotalArray,
            backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }

   

   GetHFRS(state_code:any,district_code:any)
   {
    this.statedistReq.type='HFRS'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype="";
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.HFRSTextArr = [];
      this.HFRSValueArr = [];
      this.jsonDataHFRS=[];
        this.colorArray.push('#FFDDCE');
        this.colorArray.push('#F5D33F');
        this.colorArray.push('#3C8DBC');
        var list=response['list']
        var arrState = list;
        this.jsonDataHFRS=list;
        //console.log(response);
          for(var i in arrState) {
            this.HFRSTextArr.push(arrState[i]['text']);        
            this.HFRSValueArr.push(arrState[i]['value']);   
        }
      this.HFRSBar = new Chart(this.HFRSChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.HFRSTextArr,
          datasets: [{  
            label:'Facility Applications Received'  ,        
            data: this.HFRSValueArr,
            backgroundColor: '#FFDDCE', // array should have same number of elements as number of dataset
            borderColor: '#FFDDCE',// array should have same number of elements as number of dataset
            borderWidth: 1,
            //barThickness:20,
            
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: true,
              align: 'right', 
              color:'black',
              formatter: function(nStr, context) {
                var num;
                if(nStr.length==4)
                num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
                else if(nStr.length==5)
                num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
                else if(nStr.length==6)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
                else if(nStr.length==7)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
                else if(nStr.length==8)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
                else if(nStr.length==9)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
                else if(nStr.length==10)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
                else
                num=nStr
       //console.log(nStr+" : "+num);
                return num;
             }           
            }
          },
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 1,
              
            }
          },
        }
      });

    }
    });
     
   }

   GetHPRS(state_code:any,district_code:any)
   {
    this.statedistReq.type='HPRS'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype="";
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.HPRSTextArr = [];
      this.HPRSValueArr = [];
      this.jsonDataHPRS=[];
        this.colorArray.push('#FFDDCE');
        this.colorArray.push('#F5D33F');
        this.colorArray.push('#3C8DBC');
        var list=response['list']
        var arrState = list;
        this.jsonDataHPRS=list;
        //console.log(response);
          for(var i in arrState) {
            this.HPRSTextArr.push(arrState[i]['text']);        
            this.HPRSValueArr.push(arrState[i]['value']);   
        }
      this.HPRSBar = new Chart(this.HPRSChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.HPRSTextArr,
          datasets: [{  
            label:'Professionals - Applications Received'  ,        
            data: this.HPRSValueArr,
            backgroundColor: '#F5D33F', // array should have same number of elements as number of dataset
            borderColor: '#FFDDCE',// array should have same number of elements as number of dataset
            borderWidth: 1,
            //barThickness:20,
            
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: true,
              align: 'right', 
              color:'black',
              formatter: function(nStr, context) {
                var num;
                if(nStr.length==4)
                num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
                else if(nStr.length==5)
                num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
                else if(nStr.length==6)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
                else if(nStr.length==7)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
                else if(nStr.length==8)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
                else if(nStr.length==9)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
                else if(nStr.length==10)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
                else
                num=nStr
       //console.log(nStr+" : "+num);
                return num;
             }           
            }
          },
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 1,
              
            }
          },
        }
      });

    }
    });
     
   }
   GetFacilityMedicine(state_code:any,district_code:any)
   {  


    this.statedistReq.type='FM'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype="";      
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.FMColorArr = [];
      this.FMTextArr = [];
      this.FMValueArr = [];  
      this.jsonDataFM=[];   
        var list=response['list']
        var arrState = list;
        this.jsonDataFM=list;
        //console.log(arrState);
          for(var i in arrState) {
            this.FMTextArr.push(arrState[i]['text'].trim());        
            this.FMValueArr.push(arrState[i]['value']); 
            this.FMColorArr.push(this.getRandomColor());  
        }     
      this.FMbars = new Chart(this.pieChartsystem.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.FMTextArr,
          datasets: [{  
            label:'Facilities Registrered by System of Medicine'  ,        
            data: this.FMValueArr,
            backgroundColor: '#5C8AE4', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: true,
              align: 'top', 
              color:'black',
              formatter: function(nStr, context) {
                var num;
                if(nStr.length==4)
                num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
                else if(nStr.length==5)
                num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
                else if(nStr.length==6)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
                else if(nStr.length==7)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
                else if(nStr.length==8)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
                else if(nStr.length==9)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
                else if(nStr.length==10)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
                else
                num=nStr
       //console.log(nStr+" : "+num);
                return num;
             }           
            }
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }
   GetHFRAF(type,rpttype,state_code:any,district_code:any)
   {

    this.statedistReq.type=type;  
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_code;
    this.statedistReq.rpttype=rpttype;    
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.hFRAFTextArr = [];
      this.hFRAFValueArr = [];
      this.jsonDataHFRAF=[];
        this.colorArray.push('#FFDDCE');
        this.colorArray.push('#F5D33F');
        this.colorArray.push('#3C8DBC');
        var list=response['list']
        var arrState = list;
        this.jsonDataHFRAF==list;
        //console.log(response);
          for(var i in arrState) {
            this.hFRAFTextArr.push(arrState[i]['text']);        
            this.hFRAFValueArr.push(arrState[i]['value']);   
        }      
      this.bars2 = new Chart(this.hfrafChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.hFRAFTextArr,
          datasets: [{  
            label:'Health Facility Registry Application Flow'  ,        
            data: this.hFRAFValueArr,
            backgroundColor: '#865093',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
   }

   GetHPRAF(type,rpttype,state_code:any,district_code:any)
   {

    this.statedistReq.type=type;  
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_code;
    this.statedistReq.rpttype=rpttype;    
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.HPRAFTextArr = [];
      this.HPRAFValueArr = [];
      this.jsonDataHPRAF=[];
        this.colorArray.push('#FFDDCE');
        this.colorArray.push('#F5D33F');
        this.colorArray.push('#3C8DBC');
        var list=response['list']
        var arrState = list;
        this.jsonDataHPRAF=arrState;
        
          for(var i in arrState) {
            this.HPRAFTextArr.push(arrState[i]['text']);        
            this.HPRAFValueArr.push(arrState[i]['value']);   
        }      
      this.bars3 = new Chart(this.hprafChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.HPRAFTextArr,
          datasets: [{  
            label:'Health Pr Registry Application Flow'  ,        
            data: this.HPRAFValueArr,
            backgroundColor: '#F5D33F',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
   }

   GetHealthCreationTren(type,rpttype,state_code:any,district_code:any)
   {    
    this.statedistReq.type=type; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype=rpttype;       
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {   
      //console.log(response);          
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.HTCTextArr = [];
      this.HTCValueArr = [];
      this.jsonDataHCT=[];
        this.colorArray.push('#FFDDCE');
        this.colorArray.push('#F5D33F');
        this.colorArray.push('#3C8DBC');
        var arrState = response['list'];
        this.jsonDataHCT=arrState;
      //console.log(response);
        for(var i in arrState) {
          this.HTCTextArr.push(arrState[i]['text']);        
          //this.HTCValueArr.push(arrState[i]['value']);
          this.HTCValueArr.push((Number(arrState[i]['value'])/100000.00).toFixed(2));              
      }

           
      this.bars1 = new Chart(this.areaChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.HTCTextArr,
          datasets: [{  
            label:'ABHA Creation Trend'  ,        
            data: this.HTCValueArr,
            backgroundColor: '#F5D33F',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
         
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
            display: false,
            align: 'end', 
            color:'red'             
          },tooltip: {
            callbacks: {
                label: function(context) {
                  
                    let label = context.dataset.label || '';

                    return label +": " + context.parsed.y+"L";
                }
            }
        }
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },scales:{x:{grid:{display:true}},y:{grid:{display:true}}}
        }
      });

    }
    });
    
   }


   GetABHALinkedTrend(type,rpttype,state_code:any,district_code:any)
   {    
    this.statedistReq.type=type; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype=rpttype;       
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {   
      //console.log(response);          
        if(response['status']=="true")
    {
     
      this.ABHALTextArr = [];
      this.ABHALHidCount = [];
      this.ABHALRecordCount = [];
      this.jsonDataABHAL=[];
       
        var arrState = response['list'];
        this.jsonDataABHAL=arrState;
      //console.log(response);
        for(var i in arrState) {
          this.ABHALTextArr.push(arrState[i]['name']);        
          //this.HTCValueArr.push(arrState[i]['value']);
          this.ABHALHidCount.push((Number(arrState[i]['hid_count'])));              
          this.ABHALRecordCount.push((Number(arrState[i]['record_count'])));    
      }

           
      this.ABHALbars = new Chart(this.ABHALChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.ABHALTextArr,
          datasets: [{  
            label:'Health Records Linked'  ,        
            data: this.ABHALRecordCount,
            //backgroundColor: 'blue',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'blue',// array should have same number of elements as number of dataset
            borderWidth: 3,
         
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
            display: false,
            align: 'end', 
            color:'red'             
          }
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },scales:{x:{grid:{display:true}},y:{grid:{display:true}}}
        }
      });

    }
    });
    
   }

   GetFacilityOwner(state_code:any,district_code:any)
   {
    this.statedistReq.type='FO'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype='';      
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.FOTextArr = [];
      this.FOValueArr = [];
      this.jsonDataFO=[];
        //this.colorArray.push('#FFDDCE');
        //this.colorArray.push('#F5D33F');
       // this.colorArray.push('#3C8DBC');

       this.colorArray.push('#f7c183');
        this.colorArray.push('#7dc2bf');
        this.colorArray.push('#e9efeb');

        var arrState = response['list'];
        this.jsonDataFO=arrState;
      //console.log(response);

      var Total=0;
      for(var i in arrState)
        {
          Total=Total+Number(arrState[i]['value'])
        
        }
        for(var i in arrState) {
          this.FOTextArr.push(arrState[i]['text']);        
         // this.FOValueArr.push(arrState[i]['value']);   
          this.FOValueArr.push((Number(arrState[i]['value'])*100.00/Total).toFixed(2));  
      }     
      this.FOBar = new Chart(this.pieChartfacility.nativeElement, {
        type: 'pie',        
        data: {
          labels: this.FOTextArr,
          datasets: [{  
            label:'Facility Owner'  ,        
            data: this.FOValueArr,
            backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'x',
          plugins:{
            legend:{
             
            },tooltip: {
              callbacks: {
                  label: function(context) {
                   // console.log(context);
                      let label = context.label;
                      //console.log(label);

                      return label +": " +context.parsed+"%";
                  }
              }
          },
            datalabels: {
              display:true,           
             
              formatter: function(value, context) {
                return value+"%";
             }  
            },
          },
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }

   GetProfessionalEnrolmentType(state_code:any,district_code:any)
   {
    this.statedistReq.type='PE'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype='';   
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
      this.colorArray = [];
      this.PETextArr = [];
      this.PEValueArr = [];
      this.jsonDataET=[];
      this.colorArray.push('#f7c183');
        this.colorArray.push('#7dc2bf');
        this.colorArray.push('#e9efeb');
        var arrState = response['list'];
        this.jsonDataET=arrState;
      //console.log(response);

      var Total=0;
      for(var i in arrState)
        {
          Total=Total+Number(arrState[i]['value'])
        
        }

        for(var i in arrState) {
          this.PETextArr.push(arrState[i]['text']);        
         // this.PEValueArr.push(arrState[i]['value']); 
          this.PEValueArr.push((Number(arrState[i]['value'])*100.00/Total).toFixed(2));  
      }        
      this.PEbars = new Chart(this.professionalEnrolmentType.nativeElement, {
        type: 'pie',        
        data: {
          labels: this.PETextArr,
          datasets: [{  
                  
            data: this.PEValueArr,
            backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'x',
          plugins:{
            legend:{
             
            },tooltip: {
              callbacks: {
                  label: function(context) {
                   // console.log(context);
                      let label = context.label;
                      //console.log(label);

                      return label +": " +context.parsed+"%";
                  }
              }
          },
            datalabels: {
              display:true,           
             
              formatter: function(value, context) {
                return value+"%";
             }  
            },
          },
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }

   GetProfessionalMedicine(state_code:any,district_code:any)
   {
    this.statedistReq.type='PM'; 
    this.statedistReq.state_code=state_code; 
    this.statedistReq.district_code=district_code;   
    this.statedistReq.rpttype='';          
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {             
        if(response['status']=="true")
    {
     
      this.PMTextArr = [];
      this.PMValueArr = [];
      this.jsonDataPM=[];
        var arrState = response['list'];
        this.jsonDataPM=arrState;
      //console.log(response);
        for(var i in arrState) {
          this.PMTextArr.push(arrState[i]['text']);        
          this.PMValueArr.push(arrState[i]['value']); 
            
      }          
      this.PMbars = new Chart(this.professionalMedicine.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.PMTextArr,
          datasets: [{  
            label:'Professionals Registered by System of Medicine'  ,        
            data: this.PMValueArr,
            backgroundColor: '#FFDDCE',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: true,
              align: 'top', 
              color:'black',
              formatter: function(nStr, context) {
                var num;
                if(nStr.length==4)
                num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
                else if(nStr.length==5)
                num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
                else if(nStr.length==6)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
                else if(nStr.length==7)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
                else if(nStr.length==8)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
                else if(nStr.length==9)
                num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
                else if(nStr.length==10)
                num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
                else
                num=nStr
       //console.log(nStr+" : "+num);
                return num;
             }           
            }
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }

   GetHealthIdAge(state_code:any,district_Code:any)
   {
    this.statedistReq.type='HA'; 
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_Code;
    this.statedistReq.rpttype="";
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => {     
        if(response['status']=="true")
    {
      this.FMColorArr = [];
      this.HATextArr = [];
      this.HAValueArr = [];     
      this.jsonDataHIA=[];
      this.FMColorArr.push('#84aef4');
      this.FMColorArr.push('#5c73b3');
      this.FMColorArr.push('#464d65');
      this.FMColorArr.push('#5474cc');
      this.FMColorArr.push('#bcbcc4');
      var arrState = response['list'];
      this.jsonDataHIA=arrState;
      //console.log(response);
      var Total=0;
          for(var i in arrState)
            {
              Total=Total+Number(arrState[i]['value'])
            
            }

        for(var i in arrState) {
          this.HATextArr.push(arrState[i]['text']);        
         // this.HAValueArr.push(arrState[i]['value']);
          this.HAValueArr.push((Number(arrState[i]['value'])*100.00/Total).toFixed(0)); 
          //this.FMColorArr.push(this.getRandomColor());   
      }          
      this.HABar = new Chart(this.barAge.nativeElement, {
        type: 'doughnut',
        
        data: {
          labels: this.HATextArr,
          datasets: [{  
            label:'Age'  ,        
            data: this.HAValueArr,
            backgroundColor: this.FMColorArr, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'y',
          plugins:{
            legend:{
             
            },tooltip: {
              callbacks: {
                  label: function(context) {
                   // console.log(context);
                      let label = context.label;
                      //console.log(label);

                      return label +": " +context.parsed+"%";
                  }
              }
          },
            datalabels: {
              display:true,           
             //color: "white",
              formatter: function(value, context) {
                return value+"%";
             }  
            },
          },
          elements: {
            bar: {
              borderWidth: 2,
              
            }
          },
        }
      });

    }
    });
     
   }
   GetHealthIdParnerWise(state_code:any,district_Code:any)
   {
    this.statedistReq.type='P'; 
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_Code;
    this.statedistReq.rpttype="";
    this.jsonDataP=[];
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => { 
      //console.log(response);    
        if(response['status']=="true")
    {
      this.partnerSort=[];
      this.partnerSort=response['list'];
      this.jsonDataP=response['list'];
      this.PartnerWise=response['list'];
    }
  });
}
GetHealthIdCreatedStateWise(state_code:any,district_Code:any)
   {
    this.statedistReq.type='S'; 
    this.statedistReq.state_code=state_code;
    this.statedistReq.district_code=district_Code;
    this.statedistReq.rpttype="";
    this.jsonDataS=[];
    this.apiService.GetHealthTrendData(this.statedistReq).subscribe((response) => { 
      //console.log(response);    
        if(response['status']=="true")
    {
      this.jsonDataS=response['list'];
      this.CreatedStateWise=response['list'];
    }
  });
}

GetUploadDate()
   {    
    this.apiService.GetUploadDate().subscribe((response) => { 
      //console.log(response);    
        if(response['status']=="true")
    {
      this.uploadDate=response['date'];      
    }
  });
}

GetStateCode(statename:any)
   { 
     this.state_code="";          
    this.statename.state_name=statename;   
    this.apiService.GetStateCode(this.statename).subscribe((response) => { 
      
      if(response['status']=="true")
      {
      this.state_code= response['state_code'];
      }
      //console.log(this.state_code);
    });
    return this.state_code;
  }

  sortByValueDesc(resp:any) {    
    return resp.sort((a: any, b: any) => {     
      return <any>new Number(b.value) - <any>new Number(a.value);
    });
  }
  
  sortByValueAsc(resp:any) {  
    return resp.sort((a: any, b: any) => {      
      return <any>new Number(a.value) - <any>new Number(b.value);
    });
  }

  PartnersortByTotalDesc(resp:any) {    
    return resp.sort((a: any, b: any) => {     
      return <any>new Number(b.total.replace(/,/g, '')) - <any>new Number(a.total.replace(/,/g, ''));
    });
  }
  
  PartnersortByTotalAsc(resp:any) {  
    return resp.sort((a: any, b: any) => {      
      return <any>new Number(a.total.replace(/,/g, '')) - <any>new Number(b.total.replace(/,/g, ''));
    });
  }

  PartnersortByCountDesc(resp:any) {    
    return resp.sort((a: any, b: any) => {     
      return <any>new Number(b.total_linked.replace(/,/g, '')) - <any>new Number(a.total_linked.replace(/,/g, ''));
    });
  }
  
  PartnersortByCountAsc(resp:any) {  
    return resp.sort((a: any, b: any) => {      
      return <any>new Number(a.total_linked.replace(/,/g, '')) - <any>new Number(b.total_linked.replace(/,/g, ''));
    });
  }

  sortByTextAsc(prop){
    return function(a,b){
      //toUpperCase()
      //console.log(a[prop].toUpperCase());
       if (a[prop].toUpperCase() > b[prop].toUpperCase()){
           return 1;
       } else if(a[prop].toUpperCase() < b[prop].toUpperCase()){
           return -1;
       }
       return 0;
    }
 }

 sortByTextDesc(prop){
  return function(a,b){
     if (a[prop].toUpperCase() > b[prop].toUpperCase()){
         return -1;
     } else if(a[prop].toUpperCase() < b[prop].toUpperCase()){
         return 1;
     }
     return 0;
  }
}

getSortPartner(type:any,rpttype:any)
  {
    var varPartner= this.partnerSort;
    //console.log( this.partnerSort);
    if(type=="A" && rpttype=='Name')
       {      
        varPartner.sort(this.sortByTextAsc('name'))
       }
       if(type=="D" && rpttype=='Name')
       {
        varPartner.sort(this.sortByTextDesc('name'))
       }

       if(type=="A" && rpttype=='Total')
       {    
         varPartner=this.PartnersortByTotalAsc(this.partnerSort);
       }
       if(type=="D" && rpttype=='Total')
       {
        varPartner=this.PartnersortByTotalDesc(this.partnerSort);
       }

       if(type=="A" && rpttype=='Count')
       {    
         varPartner=this.PartnersortByCountAsc(this.partnerSort);
       }
       if(type=="D" && rpttype=='Count')
       {
        varPartner=this.PartnersortByCountDesc(this.partnerSort);
       }

      this.PartnerWise=varPartner;
  }
  getSort(type:any,rpttype:any)
  {

    if(rpttype=="HLP"){
      console.log("in sort");
      var hlpArray = this.SortHLP;
      this.ABHALPbars.destroy();
      this.ABHALPTextArr = [];
      this.ABHALPValueArr = [];
      this.ABHALPOriginArr = [];
      if(type=="VA"){
        hlpArray = this.sortByValueAsc(this.SortHLP);
      }
      if(type=="VD"){
        hlpArray = this.sortByValueDesc(this.SortHLP);
      }
      if(type=="PA"){
        hlpArray.sort(this.sortByTextAsc('text'));
      }
      if(type=="PD"){
        hlpArray.sort(this.sortByTextDesc('text'));
      }

      for(var i in this.ABHALPtxtArr)
        {
          this.ABHALPTextArr.push(hlpArray[i]['text'].split("\n"));
          this.ABHALPValueArr.push(hlpArray[i]['value']);           
          this.ABHALPOriginArr.push(hlpArray[i]['origin']);           
        }
if(origin==""){
      this.ABHALPbars = new Chart(this.ABHALPChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.ABHALPTextArr,
          datasets: [{  
            label:'ABHAs Linked'  ,        
            data: this.ABHALPValueArr,
            backgroundColor:'#9cb9db', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
            ,datalabels: {
              display: true,
              align: 'right', 
              color:'black'             
            }
          },          
          indexAxis: 'y', scales:{x:{grid:{display:false},position:'top'},y:{grid:{display:false},ticks:{font:{size:11}}}},         
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            var orign=this.ABHALPOriginArr[index];   
            if(orign!="")
            {
              console.log("in sort if");
              this.ABHALPbars.destroy();
              this.GetABHALP("","",this.state,"",orign)
            } 
            }
        }
      }); }
      if(origin!=""){
        this.ABHALPbars = new Chart(this.ABHALPChart.nativeElement, {
          type: 'bar',        
          data: {
            labels: this.ABHALPTextArr,
            datasets: [{  
              label:'ABHAs Linked'  ,        
              data: this.ABHALPValueArr,
              backgroundColor:'#9cb9db', // array should have same number of elements as number of dataset
              borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
              borderWidth: 1,
              
            }]
          },
          options: {
            plugins:{
              legend:{display: false}
              ,datalabels: {
                display: true,
                align: 'end', 
                color:'black'             
              }
            },          
            indexAxis: 'y',scales:{x:{grid:{display:false},position:'top'},y:{grid:{display:false},ticks:{font:{size:11}}}},         
            elements: {
              line: {
                borderWidth: 0,              
              }
            },
            onClick: (evt, item) => {
              this.ABHALPbars.destroy();
              this.GetABHALP('ABHAL','',"","","")      
            }
          }
        });
      }
    }


    if(rpttype=="ABHA")
    {
      var arrState=this.SortABHA;
      this.StateArray=[];
      this.HArray=[];
      this.HITSBars.destroy();
      if(type=="VA")
       {
        arrState=this.sortByValueAsc(this.SortABHA);
       }
       if(type=="VD")
       {
        arrState=this.sortByValueDesc(this.SortABHA);
       }
       if(type=="TA")
       {
        arrState.sort(this.sortByTextAsc('text'))
       }
       if(type=="TD")
       {
        arrState.sort(this.sortByTextDesc('text'))
       }
       

       for(var i in arrState) {
        this.StateArray.push(arrState[i]['text']);        
        //this.HArray.push(arrState[i]['value']);  
        this.HArray.push((Number(arrState[i]['value'])/100000.00).toFixed(1));            
    }

       this.HITSBars = new Chart(this.HealthIdtopUT.nativeElement, {
        type: 'bar',
        
        data: {
          labels: this.StateArray,
          datasets: [{  
            label:'Health ID'  ,      
            data: this.HArray,
            backgroundColor: '#9cb9db', // array should have same number of elements as number of dataset
            borderColor: '#B9E5F2',// array should have same number of elements as number of dataset
            borderWidth: 1
          }],
          
        },
        
        options: {
         plugins:{datalabels: {
          display: true,
          align: 'right', 
          color:'black',
          formatter: function(value, context) {
            return value+"L";
         }           
        },legend:{display:false}
      ,tooltip: {
        callbacks: {
            label: function(context) {
              
                let label = context.dataset.label || '';

                return label +": " + context.parsed.x+"L";
            }
        }
    }
      },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
              
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            //console.log("index : "+index);
            this.statename.state_name=this.StateArray[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 
             if(response['status']=="true")
              {
               this.HITSBars.destroy();
               this.getHealthStateWiseData(response['state_code'],"");
              }
              else
              {                
               this.HITSBars.destroy();
               this.getHealthStateWiseData(this.state,"");
              }
              //console.log(this.state_code);
            });          
  
          },scales:{x:{grid:{display:true},position:'top'},y:{grid:{display:true}}},         
        }
      });
    }
    if(rpttype=="HFTS")
    {
     
      var arrState=this.SortHFTS;
      this.FState=[];
      this.FArray=[];
      this.HFTSBars.destroy();
      if(type=="VA")
       {
        arrState=this.sortByValueAsc(this.SortHFTS);
       }
       if(type=="VD")
       {
        arrState=this.sortByValueDesc(this.SortHFTS);
       }
       if(type=="TA")
       {
        arrState.sort(this.sortByTextAsc('text'))
       }
       if(type=="TD")
       {
        arrState.sort(this.sortByTextDesc('text'))
       }

      for(var i in arrState) {
        this.FState.push(arrState[i]['text']);        
        this.FArray.push(arrState[i]['value']);   
    }

    

    
    this.HFTSBars = new Chart(this.HealthRegistrytopUT.nativeElement, {
      type: 'bar',
      
      data: {
        labels: this.FState,
        datasets: [{  
          label:'Registered- Health'  ,      
          data: this.FArray,
          backgroundColor: '#9cb9db', // array should have same number of elements as number of dataset
          borderColor: '#B9E5F2',// array should have same number of elements as number of dataset
          borderWidth: 1
        }],
        
      },
      
      options: {
        plugins:{
          legend:{display: false},datalabels: {
            display: true,
            align: 'right', 
            color:'black',
            formatter: function(nStr, context) {
              var num;
              if(nStr.length==4)
              num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
              else if(nStr.length==5)
              num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
              else if(nStr.length==6)
              num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
              else if(nStr.length==7)
              num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
              else if(nStr.length==8)
              num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
              else if(nStr.length==9)
              num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
              else if(nStr.length==10)
              num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
              else
              num=nStr
     //console.log(nStr+" : "+num);
              return num;
           }           
          }
        },
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
            
          }
        },
        onClick: (evt, item) => {
          let index = item[0]["index"];
          //console.log("index : "+index);
          this.statename.state_name=this.FState[index];   
          this.apiService.GetStateCode(this.statename).subscribe((response) => { 
           if(response['status']=="true")
            {
             this.HFTSBars.destroy();
             this.getTopStateFacility(response['state_code'],"");
            }
            else
            {                
             this.HFTSBars.destroy();
             this.getTopStateFacility(this.state,"");
            }
            //console.log(this.state_code);
          });          

        },scales:{x:{grid:{display:true},position:'top'},y:{grid:{display:true}}},         
      }
    });

   
  
    }
    if(rpttype=="HPTS")
    {
      var arrState=this.SortHPTS;
      this.PState=[];
      this.PArray=[];
      this.HPTSBars.destroy();
      if(type=="VA")
       {
        arrState=this.sortByValueAsc(this.SortHPTS);
       }
       if(type=="VD")
       {
        arrState=this.sortByValueDesc(this.SortHPTS);
       }
       if(type=="TA")
       {
        arrState.sort(this.sortByTextAsc('text'))
       }
       if(type=="TD")
       {
        arrState.sort(this.sortByTextDesc('text'))
       }

      for(var i in arrState) {
        this.PState.push(arrState[i]['text']);        
        this.PArray.push(arrState[i]['value']);   
    }

    

    
    this.HPTSBars = new Chart(this.ProfessionaltopUT.nativeElement, {
      type: 'bar',
      
      data: {
        labels: this.PState,
        datasets: [{  
          label:'Healthcare Professionals'  ,      
          data: this.PArray,
          backgroundColor: '#9cb9db', // array should have same number of elements as number of dataset
          borderColor: '#B9E5F2',// array should have same number of elements as number of dataset
          borderWidth: 1
        }],
        
      },
      
      options: {
        plugins:{
          legend:{display: false},datalabels: {
            display: true,
            align: 'right', 
            color:'black',
            formatter: function(nStr, context) {
              var num;
              if(nStr.length==4)
              num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
              else if(nStr.length==5)
              num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
              else if(nStr.length==6)
              num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
              else if(nStr.length==7)
              num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
              else if(nStr.length==8)
              num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
              else if(nStr.length==9)
              num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
              else if(nStr.length==10)
              num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
              else
              num=nStr
     //console.log(nStr+" : "+num);
              return num;
           }           
          }
        },
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
            
          }
        },
        onClick: (evt, item) => {
          let index = item[0]["index"];
          //console.log("index : "+index);
          this.statename.state_name=this.PState[index];   
          this.apiService.GetStateCode(this.statename).subscribe((response) => { 
           if(response['status']=="true")
            {
             this.HPTSBars.destroy();
             this.getTopStateProf(response['state_code'],"");
            }
            else
            {                
             this.HPTSBars.destroy();
             this.getTopStateProf(this.state,"");
            }
            //console.log(this.state_code);
          });          

        },scales:{x:{grid:{display:true},position:'top'},y:{grid:{display:true}}},         
      }
    });

    }
  }
  drawTabBar(){
    if(this.state!=""){
      this.ABHALPbars.destroy();
      this.GetABHALP('ABHAL','',this.state,"","");
      }
    }
  exportAllExcel(){
    const dataHitsWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHITS);
    const dataHftsWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHFTS);
    const dataHptsWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHPTS);
    const dataHigWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHIG);
    const dataHiaWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHIA);
    const dataHctWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHCT);
    const dataPWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataP);
    // const dataSWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataS);
    const dataFoWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataFO);
    const dataFmWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataFM);
    const dataHfrsWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHFRS);
    const dataEtWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataET);
    const dataPmWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataPM);
    const dataHprsWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHPRS);
    // const dataHprafWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHPRAF);
    // const dataHfrafWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataHFRAF);
    const dataAbhalWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataABHAL);
    const dataAbhalpWs:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataABHALP);
    const wb: XLSX.WorkBook = { 
      Sheets: { 'HICreatedTopState': dataHitsWs, 'HFacilityTopState':dataHftsWs,
                'HProfesstionalTopState':dataHptsWs,'HealthId_Gender_Wise':dataHigWs,
                'HealthId_Age_Wise':dataHiaWs,'HealthId_Partner_Wise':dataPWs,
                'ABHA_Linked_Count':dataAbhalpWs,'ABHA_Linked_Trend':dataAbhalWs,
                'ABHA_Creation_Trend':dataHctWs,'Facility_Ownership':dataFoWs,
                'system_of_medicine':dataFmWs,'Facility_Registry_State_Wise':dataHfrsWs,
                'Employment_Type':dataEtWs,'Professional_Medicine':dataPmWs,
                'Prof_Registry_State_Wise':dataHprsWs }, 
      SheetNames: ['HICreatedTopState','HFacilityTopState','HProfesstionalTopState',
      'HealthId_Gender_Wise','HealthId_Age_Wise','HealthId_Partner_Wise','ABHA_Linked_Count',
      'ABHA_Linked_Trend','ABHA_Creation_Trend','Facility_Ownership','system_of_medicine',
      'Facility_Registry_State_Wise','Employment_Type','Professional_Medicine','Prof_Registry_State_Wise'] 
    };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, "DashboardData");
  }
}
