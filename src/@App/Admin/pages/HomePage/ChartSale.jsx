/*
 * Created Date: 23-10-2022, 11:40:14 am
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

const ChartSale = (props) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "top",
            labels: {
                boxWidth: 25
            }
          },
          title: {
            display: false,
            text: "Chart.js Bar Chart"
          }
        },
        scales: {
          x: {
              grid: {
                display: false
              }
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 120000,
            ticks: {
                stepSize: 10000
            }
          }
      }
      };
    const labels = ["1", "2", "3", "4", "5", "6", "7"];
    const data = {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: [50000, 30000,50000,65000,100000,60000,115000],
            backgroundColor: "rgb(119,100,228)",
            borderWidth: 1,
            barThickness: 24,
            borderRadius: 6
          }
        ]
      };
 return (
    <Bar options={options} data={data} />
 )
}

// ChartSale.defaultProps = {}

// ChartSale.propTypes = {}

export default React.memo(ChartSale)