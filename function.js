//时间菜单控制
function menu(){
	//全部消失
	if (!$('#non-workday').is(':checked') && !$('#workday').is(':checked')){
		$('#for_all_purpose_chart').hide();
		$('.show_checkins').hide();
		map.setLayoutProperty('taxi_destination_0', 'visibility', 'none');
		map.setLayoutProperty('taxi_destination_1', 'visibility', 'none');
		map.setLayoutProperty('checkins-heat', 'visibility', 'none');
		$('#heatmap_legend_checkins').hide();
		map.setLayoutProperty('checkins_0', 'visibility', 'none');
		map.setLayoutProperty('checkins_1', 'visibility', 'none');
		alert("Please select the day type!");
		map.setLayoutProperty('trip_purpose-heat', 'visibility', 'none');
		$('#heatmap_legend_purpose').hide();
	}else{
		map.setLayoutProperty('checkins-heat', 'visibility', 'none');
		$('#heatmap_legend_checkins').hide();
		var rtoggles = document.getElementsByName("rtoggle");
		control_trip_purpose_type_menu();	
		if (!$('#workday').is(':checked')){
			//$('.show_checkins').hide();
			map.setLayoutProperty('checkins-heat', 'visibility', 'none');
			map.setLayoutProperty('checkins_0', 'visibility', 'none');
			//map.setLayoutProperty('taxi_origin_0', 'visibility', 'none');
			map.setLayoutProperty('taxi_destination_0', 'visibility', 'none');
		}
		if (!$('#non-workday').is(':checked')){
			//$('.show_checkins').hide();
			map.setLayoutProperty('checkins-heat', 'visibility', 'none');
			map.setLayoutProperty('checkins_1', 'visibility', 'none');
			//map.setLayoutProperty('taxi_origin_1', 'visibility', 'none');
			map.setLayoutProperty('taxi_destination_1', 'visibility', 'none');
		}
		if (!$('#check-ins').is(':checked')){
			$('.show_checkins').hide();
			map.setLayoutProperty('checkins-heat', 'visibility', 'none');
			map.setLayoutProperty('checkins_0', 'visibility', 'none');
			map.setLayoutProperty('checkins_1', 'visibility', 'none');
		}
		
		if (!$('#all_purpose').is(':checked') && !$('#homing_purpose').is(':checked') && !$('#dining_purpose').is(':checked') && !$('#recreation_purpose').is(':checked') && !$('#work_purpose').is(':checked') && !$('#others_purpose').is(':checked')){
			map.setLayoutProperty('taxi_destination_0', 'visibility', 'none');
			map.setLayoutProperty('taxi_destination_1', 'visibility', 'none');
			//map.setLayoutProperty('metroLineInfo', 'visibility', 'none');
		}	
		
		for(var i = 0; i < rtoggles.length; i++) {
			if(rtoggles[i].checked) {		
				if(rtoggles[i].value == "check-ins") {
					$('.show_checkins').show();
					if ($('#workday').is(':checked')){
				
						//map.setLayoutProperty('checkins_0', 'visibility', 'none');
						if (!$('#non-workday').is(':checked')){
							checkins_num = [3988,1995,19491,5697,9732,14022,1871,8823,8403];			
							Chart_checkins.setOption(set_chart_option_checkins(checkins_num));
						}
					}
					if ($('#non-workday').is(':checked')){
						//map.setLayoutProperty('checkins_1', 'visibility', 'none');					
						if (!$('#workday').is(':checked')){
							checkins_num = [2592,249,8786,5388,3766,1332,816,3874,2642];			
							Chart_checkins.setOption(set_chart_option_checkins(checkins_num));
						}
					}
					if ($('#non-workday').is(':checked') && $('#workday').is(':checked')){
						checkins_num = [6580,2244,28277,11085,13498,15354,2687,12697,11045];			
						Chart_checkins.setOption(set_chart_option_checkins(checkins_num));
					}
				}
				else if(rtoggles[i].value == "taxi_origin") {	
					//map.setLayoutProperty('busLineInfo', 'visibility', 'visible');
				}
				else if(rtoggles[i].value == "taxi_destination") {
					//map.setLayoutProperty('metroLineInfo', 'visibility', 'visible');
				}
			}
		}
	}
}
//trip purpose 菜单控制
function control_trip_purpose_analysis_menu(){
	if ($('#evolving_patterns').is(':checked')){
		$('#individual_inference_module').hide();
		$('#evolving_patterns_module').show();
		//筛选各类purpose控制heatmap_trip purpose
		for(var i=0;i<trip_purpose_features.length;i++){
			if(trip_purpose_features[i].properties.trip_purpose==1){
				trip_purpose_dining.push(trip_purpose_features[i]);
			}else if(trip_purpose_features[i].properties.trip_purpose==2){
				trip_purpose_recreation.push(trip_purpose_features[i]);
			}else if(trip_purpose_features[i].properties.trip_purpose==3){
				trip_purpose_work.push(trip_purpose_features[i]);
			}else if(trip_purpose_features[i].properties.trip_purpose==4){
				trip_purpose_homing.push(trip_purpose_features[i]);
			}else if(trip_purpose_features[i].properties.trip_purpose==5){
				trip_purpose_others.push(trip_purpose_features[i]);
			}
		}
		//隐藏inference在地图上的标记
		marker_origin.remove();
		marker_destination.remove();		
		marker_origin = null;
		//圆形区域消失
		map.setLayoutProperty('polygon_O', 'visibility', 'none');
		map.setLayoutProperty('polygon_D', 'visibility', 'none');
		// map.setLayoutProperty('checkins-heat', 'visibility', 'none');
		// map.setLayoutProperty('checkins_0', 'visibility', 'none');
		// map.setLayoutProperty('taxi_origin_0', 'visibility', 'none');
		// map.setLayoutProperty('taxi_destination_0', 'visibility', 'none');
	}else {
		map.setLayoutProperty('trip_purpose-heat', 'visibility', 'none');
		$('#heatmap_legend_purpose').hide();
		$('#individual_inference_module').show();
		$('#evolving_patterns_module').hide();
		map.setLayoutProperty('taxi_destination_0', 'visibility', 'none');
		map.setLayoutProperty('taxi_destination_1', 'visibility', 'none');
	}
		
}
//trip purpose 菜单控制evolving
function control_trip_purpose_type_menu(){
	map.setLayoutProperty('trip_purpose-heat', 'visibility', 'none');
	$('#heatmap_legend_purpose').hide();
	if($('#homing_purpose').is(':checked') || $('#dining_purpose').is(':checked') || $('#recreation_purpose').is(':checked') || $('#work_purpose').is(':checked') || $('#others_purpose').is(':checked')){
		map.setLayoutProperty('taxi_destination_0', 'visibility', 'none');
		map.setLayoutProperty('taxi_destination_1', 'visibility', 'none');
		$('#for_single_purpose').show();
		$('#for_all_purpose_chart').hide();
	}
	if ($('#all_purpose').is(':checked')){
		$('#for_single_purpose').hide();
		$('#for_all_purpose_chart').show();
		if ($('#workday').is(':checked')){
			//map.setLayoutProperty('checkins_0', 'visibility', 'none');
			if (!$('#non-workday').is(':checked')){
				all_purpose_num = [7317,10714,12140,16607,3206];			
				Chart_all_purpose.setOption(set_chart_option_all_purpose(all_purpose_num));
			}
		}
		if ($('#non-workday').is(':checked')){
			//map.setLayoutProperty('checkins_1', 'visibility', 'none');					
			if (!$('#workday').is(':checked')){
				all_purpose_num = [7367,15980,90,13477,13072];			
				Chart_all_purpose.setOption(set_chart_option_all_purpose(all_purpose_num));
			}
		}
		if ($('#non-workday').is(':checked') && $('#workday').is(':checked')){
			all_purpose_num = [14684,26694,12229,30084,16278];			
			Chart_all_purpose.setOption(set_chart_option_all_purpose(all_purpose_num));
		}
		if (!$('#non-workday').is(':checked') && !$('#workday').is(':checked')){
			$('#for_all_purpose_chart').hide();
			alert("Please select the day type!");
		}
		// map.setLayoutProperty('checkins-heat', 'visibility', 'none');
		// map.setLayoutProperty('checkins_0', 'visibility', 'none');
		// map.setLayoutProperty('taxi_origin_0', 'visibility', 'none');
		// map.setLayoutProperty('taxi_destination_0', 'visibility', 'none');

	}else if($('#dining_purpose').is(':checked')){
		trip_purpose_data.features = trip_purpose_dining;		
	}else if($('#recreation_purpose').is(':checked')){
		trip_purpose_data.features = trip_purpose_recreation;
	}else if($('#work_purpose').is(':checked')){
		trip_purpose_data.features = trip_purpose_work;
	}else if($('#homing_purpose').is(':checked')){
		trip_purpose_data.features = trip_purpose_homing;
	}else if($('#others_purpose').is(':checked')){
		trip_purpose_data.features = trip_purpose_others;
	}		
		
}
//获取OD点的信息，调用matlab函数进行运算
function get_trip_time() {
	if($('#workday').is(':checked')) var date = '2013-01-01 ';		

	if($('#non-workday').is(':checked')) var date = '2013-01-13 ';
	var timestamp_str = date + $('#span_time_hour').text() + ":" + $('#span_time_min').text() + ":" +$('#span_time_reco').text();
	
	return timestamp_str;
}
//调用matlab函数进行运算
function get_trip_purpose(trip_start_time,trip_end_time){

	var start_index = index_computing($('#origin_latlng').val());
	var end_index = index_computing($('#destination_latlng').val());;
	
	//var trip = "{7971,'2013-01-01 15:11:48.0','2013-01-01 15:18:10.0',-73.978165,40.757977,18033,-73.989838,40.751171,17428}";
	var trip = "{1,'" + trip_start_time + "','" + trip_end_time + "'," + $('#origin_latlng').val() + "," + start_index + "," + $('#destination_latlng').val() + "," + end_index + "}";
	//alert("index:"+start_index+end_index);
	//alert(trip);

	document.location="matlab:trip2vec("+trip+");";
	setTimeout('read_temp()',5000);
}
function index_computing(lnglat_str){
	var lnglat = lnglat_str.split(",");

	var x = Math.floor(( parseFloat(lnglat[0]) * 100000 + 7405500 ) / 240) + 1 ;
	var y = Math.floor(( parseFloat(lnglat[1]) * 100000 - 4054120 ) / 180) ;
    var index = x + y * 150; 
	return index;
}
//获取temp.txt计算结果并作处理
//var trip_purpose_dis = [0.57072,0.26674,0.25106,0.61311,0.12738];
var trip_purpose_dis;
var trip_purpose;
function read_temp(){
	var trip_vec = null;
	while(trip_vec==null){
		 var trip_vec = $.ajax({url:"temp.txt",async:false});
		 if(trip_vec!=null){
			 $('.loading').fadeOut(); 
			 var str = trip_vec.responseText;
			 str = str.slice(1,str.length).slice(0,-1);	
			 var trip_purpose_list = str.split(" ");
			 trip_purpose_dis = trip_purpose_list.slice(0,-1);
			 if (trip_purpose_list[5]=='1') trip_purpose = "Dining";
			 if (trip_purpose_list[5]=='2') trip_purpose = "Recreation";
			 if (trip_purpose_list[5]=='3') trip_purpose = "Work";
			 if (trip_purpose_list[5]=='4') trip_purpose = "Homing";
			 if (trip_purpose_list[5]=='5') trip_purpose = "Other";
			 $('#trip_purpose').text(trip_purpose);
			 $('#trip_purpose_display').animate({opacity:'1',fontSize:'22px'});
			 Chart_trip_purpose_inference.setOption(set_chart_option_trip(trip_purpose_dis));
		 }
	}	
}

//画图表checkins chart
function set_chart_option_checkins(checkins_num){
	var option_checkins = {
		title : {
			text: 'Number of 9 Categories of Human Activities',       
			x:'center',
			textStyle:{
				color:'#9C9C9C',
		　　　　fontSize:16
			}
		},
		tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
		
		series : [
			{
				name: 'checkins',
				type: 'pie',
				stillShowZeroSum: false,
				radius : '50%',
				center: ['50%', '55%'],
				//只传入不为0的type
				data:[
					{value:checkins_num[0], name:'Entertainment', itemStyle:{color:'#2CCAC8'}},
					{value:checkins_num[1], name:'College',itemStyle:{color:'#B0A0DF'}},
					{value:checkins_num[2], name:'Food',itemStyle:{color:'#60B7F7'}},
					{value:checkins_num[3], name:'Nightlife',itemStyle:{color:'#FEBB85'}},
					{value:checkins_num[4], name:'Recreation',itemStyle:{color:'#D58289'}},
					{value:checkins_num[5], name:'Professional',itemStyle:{color:'#8B97AF'}},
					{value:checkins_num[6], name:'Residence',itemStyle:{color:'#E4D900'}},
					{value:checkins_num[7], name:'Shop',itemStyle:{color:'#96B742'}},
					{value:checkins_num[8], name:'Transport',itemStyle:{color:'#906C6A'}}
				],
				itemStyle: {
					 normal: {
                   label: {
                      textStyle: {
                         // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                         fontSize: 14
                      }
                   }
                },
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	return option_checkins;
}

//画图表all purpose chart
function set_chart_option_all_purpose(all_purpose_num){
	var option_all_purpose = {
		title : {
			text: 'Number of Trip Purposes',       
			x:'center',
			textStyle:{
			color:'#9C9C9C',
	　　　　fontSize:16
			}
		},
		tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
		series : [
			{
				name: 'all_purpose',
				type: 'pie',
				stillShowZeroSum: false,
				radius : '50%',
				center: ['50%', '50%'],
				//只传入不为0的type
				data:[
					{value:all_purpose_num[0], name:'Dining', itemStyle:{color:'#1C86EE'}},
					{value:all_purpose_num[1], name:'Recreation',itemStyle:{color:'#2E8B57'}},
					{value:all_purpose_num[2], name:'Work',itemStyle:{color:'#828282'}},
					{value:all_purpose_num[3], name:'Homing',itemStyle:{color:'#EEB422'}},
					{value:all_purpose_num[4], name:'Others',itemStyle:{color:'#EE3B3B'}}				
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	return option_all_purpose;
}
//画图表 trip purpose chart
function set_chart_option_trip(trip_purpose_dis){
	var option_trip_purpose = {
		title : {
			text: 'Distance to Five Trip Purposes Clusters',       
			x:'center',
			textStyle:{
			color:'#9C9C9C',
	　　　　fontSize:15
			}
		},
		tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
		toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            saveAsImage: {show: true}
			}
		},
		calculable: true,
		grid: {
			borderWidth: 0,
			y: 50,
			y2: 40
		},
		xAxis: [
			{
				type: 'category',
				show: true,
			    data:[{value: 'Dining',textStyle: { color: '#1C86EE',fontStyle:'italic',fontWeight:'bold'}},
					   {value: 'Recreation',textStyle: { color: '#2E8B57',fontStyle:'italic',fontWeight:'bold'}},
					   {value: 'Work',textStyle: { color: '#828282',fontStyle:'italic',fontWeight:'bold'}},
					   {value: 'Homing',textStyle: { color: '#EEB422',fontStyle:'italic',fontWeight:'bold'}},
					   {value: 'Others',textStyle: { color: '#EE3B3B',fontStyle:'italic',fontWeight:'bold'}}], 
				"axisLabel":{
					show: false,
					interval: 0
				},
				axisLine:{
                    lineStyle:{ 
						color:'#9C9C9C'
					}
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				show: true,
				splitLine:{
			　　　　show:false
			　　},
				axisLine:{
                    lineStyle:{ 
						color:'#9C9C9C'
					}
					
				}
			}
		],
		series: [
			{
				name: 'trip_purpose_dis',
				type: 'bar',
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					},
					normal: {
						color: function(params) {
							// build a color map as your need.
							var colorList = ['#1C86EE','#2E8B57','#828282','#EEB422','#EE3B3B'];
							return colorList[params.dataIndex]
						},
						label: {
							show: true,
							position: 'top',
							formatter: '{b}\n{c}'
						}
					}
				},
				data: [parseFloat(trip_purpose_dis[0]),parseFloat(trip_purpose_dis[1]),parseFloat(trip_purpose_dis[2]),parseFloat(trip_purpose_dis[3]),parseFloat(trip_purpose_dis[4])],
				//data: [0.15099,0.34376,0.55946,1.17461,0.68007],
				markPoint: {
					tooltip: {
						trigger: 'item',
						backgroundColor: 'rgba(0,0,0,0)',
						formatter: function(params){
							return '<img src="' 
									+ params.data.symbol.replace('image://', '')
									+ '"/>';
						}
					},
					data: [
						{xAxis:0, y: 228, name:'Dining', symbolSize:18, symbol: 'image://https://liaochengwu.github.io/test/images/icons/arrow.png'},
						{xAxis:1, y: 228, name:'Recreation', symbolSize:16, symbol: 'image://https://liaochengwu.github.io/test/images/icons/square.png'},
						{xAxis:2, y: 228, name:'Work', symbolSize:18, symbol: 'image://https://liaochengwu.github.io/test/images/icons/star.png'},
						{xAxis:3, y: 228, name:'Homing', symbolSize:18, symbol: 'image://https://liaochengwu.github.io/test/images/icons/diamond.png'},
						{xAxis:4, y: 228, name:'Others', symbolSize:16, symbol: 'image://https://liaochengwu.github.io/test/images/icons/circle.png'},
					]
				}
			}
		]
	};
	return option_trip_purpose;
}



