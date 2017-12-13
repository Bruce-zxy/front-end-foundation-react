import echarts from 'echarts';
import geoCoordMap from '../BigData/data/geoCoordMap';

// 省内车源分布（地图）
function carsDistributionData(arg) {
    const {geoMapName, visualMin, visualMax, visualLabel, mapDataSeries} = arg;
    var series = [];
    var label;
    mapDataSeries.map((item, i) => {
        label = {
            normal: {
                label: {
                    show: true,
                    position: "top",
                    textStyle: {
                        color: '#0',
                        fontSize: 46
                    }
                }
            }
        }
        series[i] = {};
        series[i].data = [];
        item.data.map((ele) => {
            series[i].data.push(ele);
        });
        series[i].name = item.name;
        series[i].type = "map";
        series[i].zoom = 1.2;
        series[i].mapType = geoMapName;
        series[i].itemStyle = label;
    });
    const option = {
        color: ['rgb(38, 242, 233)','rgb(64, 201, 240)', 'rgb(30, 144, 255)'],
        tooltip: { trigger: 'none' },
        visualMap: {
            right: 50,
            bottom: 50,
            calculable: true,
            textStyle: { color: 'rgb(38, 242, 233)',fontSize: 56 },
            inRange: {
                color: ['#05bcfa','#0a64a9'],
            },
            itemWidth: 60,
            itemHeight: 280
        },
        series: series
    }
    option.visualMap.min = 0;
    option.visualMap.max = 800;
    return option;
}

// 省内车源分布（柱状图）
function carsDistribution2Data(arg) {
    var val = [];
    var order = [];
    var max;
    var maxs = [];
    var sum = 0;
    arg.map((item) => {
        order.push(item);
        sum+=item.value;
        return item.value;
    });
    order = order.sort((a, b) => b.value - a.value);
    max = order[0].value;
    val = order.slice(0,5).map((item, i) => {
        maxs[i] = max
        return item.value
    });
    
    const option = {
        grid: {
            top: 60,
            left: 30
        },
        xAxis: {
            type: 'value',
            position: 'top',
            max: max,
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 46,
                    color: 'rgba(31, 188, 210, .9)',
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,
            },
            data: maxs
        },
        series: [{
            type: 'bar',
            silent: true,
            barGap: '-100%',
            barWidth: 100,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 63, 126)',
                    barBorderRadius: 50,
                }
            },
            data: maxs
        }, {
            type: 'bar',
            silent: true,
            barGap: '-100%',
            barWidth: 100,
            itemStyle: {
                normal: {
                    color: 'rgba(71, 216, 253, .9)',
                    barBorderRadius: 50,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    // formatter: function(data) {
                    //     return (data.data/sum).toFixed(2) + '%'
                    // },
                    formatter: function(data) {
                        var len = val.length;
                        return order[len - data.dataIndex -1].name
                    },
                    textStyle: {
                        fontSize: 56
                    }
                }
            },
            data: val.reverse(),
        }]
    }
    return option;
}

// 全国车辆分布图
function carsDistribution3Data(arg) {
    var datas = arg.map((item) => item)
    const option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            textStyle: {
                fontSize: 64
            }
        },
        series : [
            {
                name: '全国客源车辆所属省份统计',
                type: 'pie',
                center: ['53%', '45%'],
                radius : '60%',
                label: {
                    normal: {
                        position: "outside",
                        textStyle: {
                            fontSize: 56
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: datas,
            }
        ]
    };
    return option;
}

// 车辆停留分布时间
function standingTimeData(arg) {
    var dataNames = arg.map((item) => item.name )
    var datas = arg.map((item) => item.value )
    const option = {
        tooltip: {
            trigger: 'axis',
            hideDelay: 400,
            padding: 20,
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 60,
            }
        },
        grid: {
            left: 200,
            right: 40,
        },
        legend: {
            data: ['增长趋势', '停留时长'],
            textStyle: {
                color: '#ccc',
                fontSize: 52
            }
        },
        xAxis: {
            data: dataNames,
            boundaryGap: true,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 56,
                    color: '#87baf8'
                }
            }
        },
        yAxis: {
            splitLine: {show: false},
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 56,
                    color: '#87baf8'
                }
            }
        },
        series: [{
            name: '增长趋势',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            lineStyle: {
                normal: {
                    width: 5
                }
            },
            animation: true,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 },
            data: datas
        }, {
            name: '停留时长',
            type: 'bar',
            barWidth: 30,
            animation: true,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 },
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(20,200,212, .8)'},
                            {offset: 1, color: 'rgba(67,238,198, .8)'}
                        ]
                    )
                }
            },
            data: datas
        }]
    };
    return option;
}

// 车辆进出时间分量
function IOCarsTimeData(arg) {
    var dataIn = arg.map((item) => item.In);
    var dataOut = arg.map((item) => item.Out);
    var xData = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
    var itemStyle = { normal: { label: { textStyle: { fontSize: 46 } } } };
    var markPointData = [{type : 'max', name: '最大值'},{type : 'min', name: '最小值'}];
    var markLineData = [{type : 'average', name : '平均值'}];
    var markLineStyle = { normal: { width: 4 } };
    var markArea = { normal: { fontSize: 64 } };
    const option = {
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 64
            }
        },
        grid: {
            top: 180,
            left: 0,
            right: 0
        },
        legend: {
            data:['进场数量','离场数量'],
            textStyle: { color: '#f', fontSize: 56},
            itemWidth: 60,
            itemHeight: 30,
            itemGap: 30
        },
        xAxis : [
            {
                type : 'category',
                data : xData,
                axisLabel: {
                    textStyle: {
                        fontSize: 56,
                        color: 'rgba(31, 188, 210, .9)',
                    },
                    margin: 10
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 56,
                        color: 'rgba(31, 188, 210, .9)'
                    },
                    margin: 30
                }
            }
        ],
        series : [
            {
                name:'进场数量',
                data:dataIn
            },
            {
                name:'离场数量',
                data:dataOut
            }
        ]
    };
    option.series.map((item) => {
        item.type = 'bar';
        item.markPoint = {};
        item.markLine = {};
        item.markArea = {};
        item.markPoint.data = markPointData;
        item.markLine.data = markLineData;
        item.markPoint.symbolSize = 200;
        item.markPoint.itemStyle = item.markLine.itemStyle = itemStyle;
        item.markLine.lineStyle = markLineStyle;
        item.markArea.label = markArea;
    })
    return option
}

function echartsOption(data, name) {
    switch(name) {
        case 'CarsDistribution':
            return carsDistributionData(data);
        case 'CarsDistribution2':
            return carsDistribution2Data(data);
        case 'CarsDistribution3':
            return carsDistribution3Data(data);
        case 'StandingTime':
            return standingTimeData(data);
        case 'IOCarsTime':
            return IOCarsTimeData(data);
        default :
            return;
    }
}

export default echartsOption;