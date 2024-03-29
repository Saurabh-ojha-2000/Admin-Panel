import axios from 'axios';
import { data } from 'jquery';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

// Colors and theme
const colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340",
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent",
};

function LineChart() {

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/order-chart');
                const labels = result.data.map(item => {
                    const monthIndex = parseInt(item.month) - 1; // Month index starts from 0
                    return new Date(2024, monthIndex).toLocaleString('default', { month: 'long' });
                });

                const data = result.data.map(item => item.order_count);
                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Orders',
                        backgroundColor: colors.theme.success, // Using theme's primary color
                        borderColor: colors.theme.primary,
                        borderWidth: 2,
                        hoverBackgroundColor: colors.theme.primary,
                        hoverBorderColor: colors.theme.primary,
                        data: data
                    }]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '410px' }}>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 10 // Set the distance between ticks to 10
                            },
                            gridLines: {
                                color: colors.gray[300] // Using gray color 300 for grid lines
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false // Hide x-axis grid lines
                            }
                        }]
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            fontColor: colors.gray[700], // Using gray color 700 for legend label color
                            fontSize: 14
                        }
                    },
                }}
            />
        </div>
    );
}

export default LineChart;
