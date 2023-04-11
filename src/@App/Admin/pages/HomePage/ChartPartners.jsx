/*
 * Created Date: 23-10-2022, 4:07:39 pm
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

const ChartPartners = (props) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 15
                }
            },
            title: {
                display: false,
                text: "Chart.js Bar Chart"
            }
        },
        categoryPercentage: 0.4,
        barPercentage: 0.8,
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 60,
                ticks: {
                    stepSize: 10,
                    callback: (value) => {
                        return `$${value}K`
                    },
                    padding: 12,
                color: 'rgb(180,190,202)',

                },
                grid: {
                    drawBorder: false,
                    color: 'rgb(184,194,204)',
                    borderDash: [5]
                },

            }
      }
      };
    const labels = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
    const data = {
        labels,
        datasets: [
          {
            label: "Germany",
            data: [20, 28, 17, 21, 11, 18],
            backgroundColor: "rgb(17,205,239)",
            borderRadius: 8
          },
          {
            label: "France",
            data: [34, 21, 10, 12, 23, 33],
            backgroundColor: "rgb(119,100,228)",
            borderRadius: 8
          },
          {
            label: "Russia",
            data: [11, 39, 13, 6, 45, 31],
            backgroundColor: "rgb(45,206,152)",
            borderRadius: 8
          }
        ]
      };
 return (
    <Bar options={options} data={data} />
 )
}

// ChartPartners.defaultProps = {}

// ChartPartners.propTypes = {}

export default React.memo(ChartPartners)