/*
 * Created Date: 23-10-2022, 11:42:04 am
 * Author: TheAnh58
 * Email: you@you.you
 * -----
 * Last Modified: Sun Oct 23 2022
 * Modified By: use
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  import { Bar} from "react-chartjs-2";
  import { Box } from "@mui/material";
  // import PropTypes from 'prop-types'
  
  ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
// import PropTypes from 'prop-types'

const ChartOverview = (props) => {
  
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 25,
              borderRadius: 12
            },
          },
          
          title: {
            display: false,
            text: 'Chart.js Bar Chart - Stacked'
          }
        },
        scales: {
          x: {
              grid: {
                display: false
              },
              stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            min: 0,
            max: 400,
            ticks: {
                stepSize: 100
            }
          }
      }
      };
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Shose',
          data: [30, 30, 60, 120, 70, 70],
          backgroundColor: "rgb(254,185,105)",
          borderWidth: 1,
          barThickness: 40,
          borderRadius: 10
        },
        {
          label: 'Suits',
          data: [90, 180, 50, 70, 70, 30],
          backgroundColor: "rgb(251,99,64)",
          borderWidth: 1,
          barThickness: 40,
          borderRadius: 10
        },
       
        {
          label: 'Jeans',
          data: [60, 190, 80, 170, 70, 80],
          backgroundColor: "rgb(119,100,228)",
          borderWidth: 1,
          barThickness: 40,
          borderRadius: 10
        },
      ]
    };

 return <Bar options={options} data={data} />
}

// ChartOverview.defaultProps = {}

// ChartOverview.propTypes = {}

export default React.memo(ChartOverview)