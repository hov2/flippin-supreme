google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Sold Prices');

  data.addRows([
    [new Date(2019, 1, 15), 40], [new Date(2019, 2, 15), 45], [new Date(2019, 3, 15), 60], [new Date(2019, 4, 15), 55], [new Date(2019, 5, 15), 50], [new Date(2019, 6, 15), 40],
    [new Date(2019, 7, 15), 55], [new Date(2019, 8, 15), 50], [new Date(2019, 9, 15), 65]
  ]);

  var formatter = new google.visualization.DateFormat({ formatType: 'short' });

  formatter.format(data, 0);

  var options = {
    series: {
      0: { color: '#FF0000' }
    },
    hAxis: {
      title: 'Date',
      format: 'MMM yyyy'
    },
    vAxis: {
      title: 'Range of Prices'
    },
    backgroundColor: '#fff5f5'
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}