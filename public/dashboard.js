fetch("https://api.covid19api.com/summary")
  .then((res) => res.json())
  .then((res) => {
    getResponse(res);
  })
  .catch((err) => {
    console.error(err);
  });

function getResponse(res) {
  drawCanvas(res.Global);
}

function drawCanvas(globals) {
  console.log(globals);
  const ctx = document.getElementById("myChart").getContext("2d");
  
  console.log(globals.NewDeaths);
  const barChartData = {
    labels: ["New Confirmed", "New Recovered", "New Deaths"],
    datasets: [
      {
        label: "New Recovered",
        backgroundColor: "rgb(255, 9, 132)",
        borderColor: "rgb(255, 9, 132)",
        data: [globals.NewConfirmed, globals.New],
      },
    ],
  };

  const myChart = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    },
  });
}
