import React, { Component } from "react";
import './BigData/css/bigdata.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './BigData/mui/CardProvider';
// import SalesVolume from './BigData/SalesVolume';
// import AirportCoordComponent from './BigData/AirportCoord';
import LineAndHistogram from './BigData/LineAndHistogram';
// import DynamicChartComponent from './BigData/DynamicChartComponent';
import RadarChart from './BigData/RadarChart';
import WeiboData from './BigData/WeiboData';
import ParkingLotComponent from './BigData/ParkingLot';
import WeatherForeComponent from './BigData/WeatherFore';
import NumOfPassComponent from './BigData/NumOfPass';
import AirQualityComponent from './BigData/AirQuality';
import ResUtilizationComponent from './BigData/ResUtilization';
import TransportationComponent from './BigData/Transportation';
import SankeyComponent from './BigData/Sankey';
// import ErrorsComponent from './BigData/Errors';
import WeatherComponent from './BigData/Weather';
import TicketBusinessComponent from './BigData/TicketBusiness';


// import { BlockAreaDataArray } from './BigData/data/MapExampleBlockArea';
// import { FromToLinesDataArray } from /BigData/data/MapExampleFromToLines';
import BarLinesDataArray from './BigData/data/ChartExampleBarLines';
import radarDataArray from './BigData/data/RadarChartData';
// import dynamicChart from './BigData/data/dynamicChart';
import weiboData from './BigData/data/weibo.json';

class BigData extends Component {
    render() {
       		return (
        			<MuiThemeProvider>
          				<div className="large-screen">
                      <div className="bigdata_title">
                          <span className="bigdata_l"></span>
                          <span className="bigdata_c">仙女湖景区智慧旅游大数据</span>
                          <span className="bigdata_r"></span>
                      </div>
                      <div className="bigdata_content">
                          <div className="c_content c_1">
                              <CardProvider className="cards" title="停车场使用量" color="light-green">
                                  <div className="tickets_num">
                                      <p><span>线上售票：</span><span><b>800</b>张</span></p>
                                      <p><span>线下售票：</span><span><b>400</b>张</span></p>
                                      <p><span>今日检票：</span><span><b>1050</b>张</span></p>
                                  </div>
                                  <TicketBusinessComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="出入游客数量" color="light-green">
                              </CardProvider>
                              <CardProvider className="cards" title="游客消费总量" color="light-green">
                              </CardProvider>
                          </div>
                          <div className="c_content c_2">
                              <WeiboData weiboData={weiboData} />
                              <CardProvider className="cards" title="热力图待定" color="light-green">
                              </CardProvider>
                          </div>
                          <div className="c_content c_3">
                              <ResUtilizationComponent />
                              <CardProvider className="cards" title="消费分析" color="light-green">
                              </CardProvider>
                          </div>
                          <div className="c_content c_4">
                              <CardProvider className="cards" title="气温预报" color="light-green">
                                  <WeatherComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="空气质量指数" color="light-green">
                                  <AirQualityComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="交通工具统计" color="light-green">
                              </CardProvider>
                          </div>
                      </div>
          			  </div>
        			</MuiThemeProvider>
      		)
    	}
}

export default BigData;