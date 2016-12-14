/*---------static data formart-----------*/
var tatlabel = ['Total TAT','Collect - Ship','Ship - Receive','Receive - Register','Register - Report','Report - Dispatch']

var eidlegend = ['Positive', 'Indeterminate', 'Negative', 'Rejected']




$.when(avgAgePerStateP,avgAgePerTownP,avgAgePerProvinceP,avgAgePerFacilityNameP,avgAgePerFacilityTypeP,eidTestResultTotalP,eidTestResultAIDSTFacilityTypeP,eidTestResultAMIFacilityTypeP,eidTestResultDisHFacilityTypeP,eidTestResultGenHFacilityTypeP,eidTestResultMSFHFacilityTypeP,eidTestResultNHLFacilityTypeP,eidTestResultSpHFacilityTypeP,eidTestResultSRHFacilityTypeP,eidTestResultTHFacilityTypeP,avgTatTotalP,avgTatAIDSTFacilityTypeP,avgTatAMIFacilityTypeP,avgTatDisHFacilityTypeP,avgTatGenHFacilityTypeP,avgTatMSFHFacilityTypeP,avgTatNHLFacilityTypeP,avgTatSpHFacilityTypeP,avgTatSRHFacilityTypeP,avgTatTHFacilityTypeP,avgAgeNHLP,avgAgePHLP,avgAgeUNIONP,eidTestResultNHLLabP,eidTestResultPHLLabP,eidTestResultUNIONLabP,avgTatNHLLabP,avgTatPHLLabP,avgTatUNIONLabP).then(function(avgAgePerState,avgAgePerTown,avgAgePerProvince,avgAgePerFacilityName,avgAgePerFacilityType,eidTestResultTotal,eidTestResultAIDSTFacilityType,eidTestResultAMIFacilityType,eidTestResultDisHFacilityType,eidTestResultGenHFacilityType,eidTestResultMSFHFacilityType,eidTestResultNHLFacilityType,eidTestResultSpHFacilityType,eidTestResultSRHFacilityType,eidTestResultTHFacilityType,avgTatTotal,avgTatAIDSTFacilityType,avgTatAMIFacilityType,avgTatDisHFacilityType,avgTatGenHFacilityType,avgTatMSFHFacilityType,avgTatNHLFacilityType,avgTatSpHFacilityType,avgTatSRHFacilityType,avgTatTHFacilityType,avgAgeNHL,avgAgePHL,avgAgeUNION,eidTestResultNHLLab,eidTestResultPHLLab,eidTestResultUNIONLab,avgTatNHLLab,avgTatPHLLab,avgTatUNIONLab){
    var test = Object.values(avgAgePerState);

    console.log(avgAgePerState[0].result);
    console.log(eidTestResultAIDSTFacilityType[0].result)

/*----------data formatter------*/

/*---------calculate turnaround time ------*/
var parseDateDiff = function(matrix){
var date1, date2, date3, date4, date5, date6 = 0;
var entityName = ''
var value = [];



/*----test---- */



matrix.forEach(function (item) {
    value.push(item);

/*---
    var index = 0
    index += indexOf(item);
    switch (index) {
        case 0:
            date1 += item;
        case 1:
            date2 += item
        case 2:
            date3 += item;
        case 3:
            date4 += item;
        case 4:
            date5 += item;
            //    case 5:
            //    date6 += item;
        default:
            break
    }

---*/

//  array.forEach(function(item){
    
  //}); //finish loop per array
});//finish loop per matrix

//var count = matrix.count;
//var divider = count * 86400;
    //var value = [(date2-date1)/divider, (date3-date2)/divider, (date4-date3)/divider,(date5-date4)/divider,(date6-date5)/divider];
return value;
};

var labTat = []; //formatted dataset for d3 usage
var facilityTat = [];//formatted dataset for d3 usage

labTat.push(
  {'entity': 'Total',
  'value': parseDateDiff(avgTatTotal[0].result)
  },
  {'entity': 'NHL',
  'value': parseDateDiff(avgTatNHLLab[0].result)
  },
  {'entity': 'PHL',
  'value': 0//parseDateDiff(avgTatPHLLab)
  },
  {'entity': 'UNION',
  'value': 0//parseDateDiff(avgTatUNIONLab)
  }
);

facilityTat.push( //最后的结果数列得到了date diff的结果
  {'entity': 'Total',
  'value': parseDateDiff(avgTatTotal[0].result)
  },
  {'entity': 'AIDS/STD Team',
  'value': parseDateDiff(avgTatAIDSTFacilityType[0].result)
  },
  {'entity': 'AMI',
  'value': parseDateDiff(avgTatAMIFacilityType[0].result)
  },
  {'entity': 'District Hospital',
  'value': parseDateDiff(avgTatDisHFacilityType[0].result)
  },
  {'entity': 'General Hospital',
  'value': parseDateDiff(avgTatGenHFacilityType[0].result)
  },
  {'entity': 'MSF-H',
  'value': parseDateDiff(avgTatMSFHFacilityType[0].result)
  },
  {'entity': 'National Health Lab',
  'value': parseDateDiff(avgTatNHLFacilityType[0].result)
  },
  {'entity': 'Specialist Hospital',
  'value': parseDateDiff(avgTatSpHFacilityType[0].result)
  },
  {'entity': 'State/Regional Hospital',
  'value': parseDateDiff(avgTatSRHFacilityType[0].result)
  },
  {'entity': 'Township Hospital',
  'value': parseDateDiff(avgTatTHFacilityType[0].result)
  }
)


/* -----avg age for lab--------*/
var labAge = [];
function parseLabAge(matrix){
  matrix.forEach(function(array){
    labAge.push(array[0]);
  })

}

parseLabAge(avgAgeNHL);
//parseLabAge(avgAgePHL);
//parseLabAge(avgAgeUNION);


/* -------avg age for region --------- */

//data set for 
var statelable, provincelable, townlable, facilitylable = [];
var stateCount, provinceCount, townCount, facilityCount = 0;
var stateAge, provinceAge, townAge, facilityAge = [];

var lablabel = ['NHL', 'PHL', 'UNION'];





function parseStateAge(matrix) {
    var data = matrix[0];
    data.forEach(function (array) {
    var location = array[0];
    var age = array[1];
    statelable.push(location);
    stateAge.push(age);
    stateCount += 1;
  })
};

function parseTownAge(matrix){
    var data = matrix[0];
    data.forEach(function (array) {
    var location = array[0];
    var age = array[1];
    townlable.push(location);
    townAge.push(age);
    townCount += 1;
  })
};

function parseProvinceAge(matrix){
    var data = matrix[0];
    data.forEach(function (array) {
    var location = array[0];
    var age = array[1];
    provincelable.push(location);
    provinceAge.push(age);
    provinceCount += 1;

  })
}

function parseFacilityAge(matrix){
    var data = matrix[0];
    data.forEach(function (array) {
    var location = array[0];
    var age = array[1];
    facilitylable.push(location);
    facilityAge.push(age);
    facilityCount += 1;
  })
};


    //call function to get fommated avg age data set for region

    /*--

parseStateAge(avgAgePerState);
parseProvinceAge(avgAgePerProvince);
parseTownAge(avgAgePerTown);
parseFacilityAge(avgAgePerFacilityType);

--*/


/* ------ eid test result data formatter -------- */
function parseEid(matrix){
  var positive, indeterminate, negative, rejected = 0;
  matrix.forEach(function(array){
    var resultType = array[0];
    var value = array[1];
    switch(resultType){
      case 'Positive':
      positive += value ;
      case 'Indeterminate':
      indeterminate += value;
      case 'Negative':
      negative += value;
      case 'Rejected':
      negative += value;
      case 'Detected':
      positive += value;
      case 'Not Detected':
      negative += value;
      default:
      break
    }//finish loop per row to detect which type it is
  })//finish loop the matrix for per entity
  return [positive, indeterminate, negative, rejected];
}

var EIDfacility, EIDlab = [
    [//positive
        //{ x: 0, y: 5 } x for index, y for value
    ],
    //ind
    [

    ],
    //negative
    [

    ],
    [//rejected
 
    ]
];

function constructEIDfaciliy(array){//parameter is the parseEID function, which eventually is the return value of the parse function
  var positive = array[0];
  var negative = array[1];
  var indeterminate = array[2];
  var rejected = array[3];

  var xindex = EIDfacility[0].length;
  if (xindex=0){
    x = 0
  }else{
    x = xindex;
  }

  EIDfacility[0].push({'x': x, 'y':positive});
  EIDfacility[1].push({'x': x, 'y':negative});
  EIDfacility[2].push({'x': x, 'y':indeterminate});
  EIDfacility[3].push({'x': x, 'y':rejected});
}


function constructEIDlab(array){//parameter is the parseEID function, which eventually is the return value of the parse function
  var positive = array[0];
  var negative = array[1];
  var indeterminate = array[2];
  var rejected = array[3];

  var xindex = EIDlab[0].length;
  if (xindex=0){
    x = 0
  }else{
    x = xindex;
  }

  EIDlab[0].push({'x': x, 'y':positive});
  EIDlab[1].push({'x': x, 'y':negative});
  EIDlab[2].push({'x': x, 'y':indeterminate});
  EIDlab[3].push({'x': x, 'y':rejected});
}

//call construction function to get formatted data for all data points to generate d3 graph
constructEIDfaciliy(parseEid(eidTestResultTotal[0].result));
constructEIDfaciliy(parseEid(eidTestResultAIDSTFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultAMIFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultDisHFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultGenHFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultMSFHFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultNHLFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultSpHFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultSRHFacilityType[0].result));
constructEIDfaciliy(parseEid(eidTestResultTHFacilityType[0].result));

//call constructino func for lab eid results
constructEIDlab(parseEid(eidTestResultNHLLab[0].result));
constructEIDlab(parseEid(eidTestResultPHLLab[0].result));
constructEIDlab(parseEid(eidTestResultUNIONLab[0].result));


/*------end of data formatter-------*/


/*-------------set up d3 graph config---------------*/

var colors = d3.scale.category20();

//edi test result colors
var resultColors = d3.scale.ordinal()
  .domain(['negative', 'indeterminate', 'positive','rejected'])
  .range(['#ff8c8c', '#fff45e', '#98e884','#d7dae0']);


// var div = d3.select('#viz-avg-tat').append('div').attr('class', 'toolTip');

var axisMargin = 5,
    margin = 45,
    valueMargin = 5,
    width = 960,
    barHeight = 20,
    barPadding = 20,
    height = 6*(barHeight*data.length+barPadding)+margin*2, //height for tat canvas
    data, bar, tatCanvas, scale, xAxis = 0,
    labelWidth = 40;


var max = function(){ //find the max length of the rects
  var maxData = 0
  data.forEach(function(i){
    if (Math.max(...i.value) >= maxData){
      maxData = Math.max(...i.value);
    }
  });
  return maxData;
};


scale = d3.scale.linear() //axis scaling
                .domain([0, max()])
                .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 0.2*margin + axisMargin)
          .orient('bottom');




/*-------------for avg age section ---------------*/
function agerender(dataset, entityCount, labels){
  var scaleAge = d3.scale.linear() //axis scaling
                  .domain([0, Math.max(...dataset)])
                  .range([0, width - margin*2 - labelWidth]);
  var ageHeight = (barHeight+barPadding)*entityCount

  var xAxisAge = d3.svg.axis()
            .scale(scaleAge)
            .tickSize(-ageHeight + 0.2*margin + axisMargin)
            .orient('bottom');

  var ageCanvas = d3.select('#viz-avg-age')
              .append('svg')
              .attr('width', width)
              .attr('height', ageHeight);
              

  var ages = ageCanvas.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect');

  ages.attr('class', function(d,i){
      return 'age'+i;
      })
      .attr('cx',0)
      .attr('transform', function(d, i) {
        return 'translate(' + (2.5*margin + labelWidth) + ',' + (.5*margin+i*1.5*barHeight) + ')';
      })
      .attr('height', barHeight)
      .attr('width', function(d){
        return .5*scale(d);})
      .attr('fill-opacity', .85);

  ageCanvas//for each  bar group, append text of the value
      .insert('g',':first-child')
      .attr('class','agevalues')
      .selectAll('text')
      .data(labels)
      .enter()
      .append('text') //value annotation of each bar
      .attr('transform', function(d, i) {
                  return 'translate('+(1.5*margin)+',' + (.5*margin+i*1.5*barHeight)+ ')';
      })
      .attr('class', 'result')
      .attr('color','black')
      .attr('dx', valueMargin ) //margin right
      .attr('dy', '.95em') //vertical align middle
      // .attr('text-anchor', 'end')
      .style('size','20px')
      .text(function(d){
        return d;
      })
      .attr('x', function(d){
        // var width = this.getBBox().width;
        return labelWidth;
        // return Math.max(width + valueMargin, scale(d));
      });


  var ageLegend = d3.select('#legend-avg-age')
              .append('svg')
              .attr('width', width)
              .attr('height', barHeight*3);

  var ageEntityItems = ageLegend.selectAll('g')
      .data(labels)
      .enter()
      .append('g')

  ageEntityItems
      .attr('class', function(d,i){
        return 'entity'+i;
      })
      .append('text')
      .text(function(d,i){
        return d.entity;
      })
      .attr('dy','.35em')
      .attr('transform', function(d, i) {
            return 'translate(' + (2.4*margin + margin +1.1*barHeight+ i*4*labelWidth)+ ',' + 1.25*margin + ')';//grouped bards margin
          });

  ageEntityItems    
      .append('rect')
      .attr('fill',function(d,i){
        return colors(i);
      })
      .attr('class', function(d,i){
        return 'legend'+i;
      })
      .attr('height',barHeight)
      .attr('width',barHeight)
      .attr('transform', function(d, i) {
            return 'translate(' + (2.4*margin  + margin +i*4*labelWidth)+ ',' + margin + ')';//grouped bards margin
          });

  ageCanvas.insert('g',':first-child')//chart canvas
      .attr('class', 'axisHorizontal')
      .attr('transform', 'translate(' + (2.5*margin + labelWidth) + ','+ ageHeight+')')
      .call(xAxisAge);

};


/*-------------for eid test result---------------*/

function eidrender(dataset, entityCount){ //facilityCount or labcount = 3
var eidCanvas = d3.select('#viz-eid-result')
            .append('svg')
            .attr('width', width)
            .attr('height', barHeight*entityCount+4*margin);


var w = width*.9;
var h = barHeight*entityCount+3*margin;

//Set up stack method
var stack = d3.layout.stack();
//Data, stacked
stack(dataset);

//Set up scales
var yScale = d3.scale.ordinal()
    .domain(d3.range(dataset[0].length))
    .rangeRoundBands([0, h], 0.05);
var xScale = d3.scale.linear()
    .domain([0,
        d3.max(dataset, function(d) {
            return d3.max(d, function(d) {
                return d.y0 + d.y;
            });
        })
    ])
    .range([0,w]);
//Easy colors accessible via a 10-step ordinal scale

// Add a group for each row of data
var eidgroups = eidCanvas.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr('transform', function(d, i) {
          return 'translate(' + (2.5*margin + labelWidth)+ ',' + 1.5*barPadding + ')';//grouped bards margin
        })
    .style("fill", function(d, i) {
        return resultColors(i);
    });
// Add a rect for each data value
var rects = eidgroups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(d.y0);
    })
    .attr("y", function(d,i) {
        return yScale(i);
    })
    .attr("height", barHeight)
    .attr("width", function(d){
      return xScale(d.y);
    });

var eidValue = eidgroups.selectAll('text')
    .data(function(d) { return d; })
    .enter()
    .append('text')
    .attr('class','result')
    .text(function(d) { return d.y; })
    .attr('x', function(d, i) {
        return xScale(d.y0)+3;
    })
    .attr('y', function(d,i) {
        return yScale(i)+.8*barHeight;
    });

eidCanvas.insert('g',':first-child')
    .attr('class','eidlabels')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('size', 15)
    .attr('transform', function(d, i) {
                return 'translate(' + (margin) + ',' + (1.5*barPadding+yScale(i)) + ')';
    })
    .attr('y', barHeight/2)
    .attr('dy', '.35em')
    .text(function(d){
      return d.entity;
    })
    .attr('labelWidth', labelWidth);

var eidLegend = d3.select('#legend-eid-result')
            .append('svg')
            .attr('width', width)
            .attr('height', h/3);

var eidResultItems = eidLegend.selectAll('g')
    .data(eidlegend)
    .enter()
    .append('g')

eidResultItems
    .attr('class', function(d,i){
      return 'result'+i;
    })
    .append('text')
    .attr('class','eidlegend')
    .text(function(d,i){
      return d;
    })
    .attr('dy','.35em')
    .attr('transform', function(d, i) {
          return 'translate(' + (2.4*margin + margin +1.1*barHeight+ i*4*labelWidth)+ ',' + 1.25*margin + ')';//grouped bards margin
        });

eidResultItems    
    .append('rect')
    .attr('fill',function(d,i){
      return resultColors(i);
    })
    .attr('height',barHeight)
    .attr('width',barHeight)
    .attr('transform', function(d, i) {
          return 'translate(' + (2.4*margin  + margin +i*4*labelWidth)+ ',' + margin + ')';//grouped bards margin
        });
};

/*-----------turnaround time--------*/
function renderbar(data){
  var index = 0;
  while (index < data.length){


    bars //each bar group, append bars
    .selectAll('rect')
    .data(function(d){return d.value;})
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('transform', function(d, i) {
                return 'translate(' + (1.5*margin + labelWidth) + ',' + (i * (barHeight*data.length + barPadding)+margin*1.2) + ')';
    })
    .attr('height', barHeight)
    .attr('width', function(d){
      return scale(d);})//对于data.value来说的d，每个元素就是int
    .attr('fill-opacity', .85);

    bars//for each  bar group, append text of the value
    .selectAll('text')
    .data(function(d){return d.value;})
    .enter()
    .append('text') //value annotation of each bar
    .attr('class', 'value')
    .attr('transform', function(d, i) {
                return 'translate(' + (1.5*margin + labelWidth) + ',' + (0.5*barPadding+i * (barHeight*data.length + barPadding)+margin*1.2)+ ')';
    })
    .attr('dx', -valueMargin ) //margin right
    .attr('dy', '.35em') //vertical align middle
    .attr('text-anchor', 'end')
    .style('size','20px')
    .text(function(d){
      return d;
    })
    .attr('x', function(d){
      // var width = this.getBBox().width;
      return scale(d);
      // return Math.max(width + valueMargin, scale(d));
    });

    index += 1; //画下一组entity
  };
};

function rendertat(data){

  tatCanvas = d3.select('#viz-avg-tat')
              .append('svg')
              .attr('width', width)
              .attr('height', height);

  var tatLegend = d3.select('#legend-avg-tat')
              .append('svg')
              .attr('width', width)
              .attr('height', barHeight*3);

  var tatEntityItems = tatLegend.selectAll('g')
      .data(data)
      .enter()
      .append('g')

  tatEntityItems
      .attr('class', function(d,i){
        return 'entity'+i;
      })
      .append('text')
      .text(function(d,i){
        return d.entity;
      })
      .attr('dy','.35em')
      .attr('transform', function(d, i) {
            return 'translate(' + (2.4*margin + margin +1.1*barHeight+ i*4*labelWidth)+ ',' + 1.25*margin + ')';//grouped bards margin
          });

  tatEntityItems    
      .append('rect')
      .attr('fill',function(d,i){
        return colors(i);
      })
      .attr('class', function(d,i){
        return 'legend'+i;
      })
      .attr('height',barHeight)
      .attr('width',barHeight)
      .attr('transform', function(d, i) {
            return 'translate(' + (3.4*margin +i*4*labelWidth)+ ',' + margin + ')';//grouped bards margin
          });

  bars = tatCanvas.selectAll('g') //一共3组图，entity有过少就有多少组图，每一组图的margin是往下推一个bar height，每个bar之间的margin是barheight和barmargin各种加起来
                .data(data)
                .enter()
                .append('g');

  bars.attr('class', function(d,i){
      return 'bargroup'+i;
      })//bar = group of (label + rect + tooltip) for a specifc phase
      .attr('cx',0)
      .attr('transform', function(d, i) {
        return 'translate(' + margin + ',' + i*barHeight + ')';//grouped bards margin
      });

  tatCanvas.insert('g',':first-child')//chart canvas
      .attr('class', 'axisHorizontal')
      .attr('transform', 'translate(' + (2.5*margin + labelWidth) + ','+ (height+margin)+')')
      .call(xAxis);

  //turnaround time vertical labels
  tatCanvas.insert('g',':first-child')
      .attr('class','tatlabels')
      .selectAll('text')
      .data(tatlabel)
      .enter()
      .append('text')
      .attr('size', 15)
      .attr('transform', function(d, i) {
                  return 'translate(' + 0.4*labelWidth + ',' + (i * (barHeight*data.length + barPadding)+margin*1.2) + ')';
      })
      .attr('y', barHeight/2)
      .attr('dy', '.35em')
      .text(function(d){
        return d;
      })
      .attr('labelWidth', labelWidth);

  renderbar();
  };
/*-----end of tat--------*/


  function fillColor(data){
    var countGroup=data.length;
    var barGroupIndex = 0;
    
    while (barGroupIndex < countGroup){
      var barGroupClassName = ('.bargroup'+barGroupIndex);
      var ageClassName = ('.age'+barGroupIndex);
      d3.select(barGroupClassName)
        .selectAll('rect')
        .attr('fill',colors(barGroupIndex));

      d3.select(ageClassName)
        .attr('fill',colors(barGroupIndex));


      barGroupIndex += 1;

    }
  };

  rendertat(labTat)
  agerender(labAge, 3, lablabel);
  eidrender(EIDlab, 3);
  fillColor(labTat);

});



