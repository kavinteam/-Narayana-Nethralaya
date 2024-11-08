import React, { useEffect, useState } from "react";
import api from "../api/api";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [totalReviewInfo, setTotalReviewInfo] = useState([]);
  const [totalDoctorsInfo, setTotalDoctorsInfo] = useState([]);
  const [postedReviewsInfo, setPostedReviewsInfo] = useState([]);
  const [overallDoctorsInfo, setOverallDoctorsInfo] = useState([]);

  // Total Reviews
  const [totalReviewData, setTotalReviewData] = useState(null);

  // Posted vs. Archived Reviews
  const [postedArchivedChartData, setPostedArchivedChartData] = useState(null);

  // Average Star Rating
  const [averageStarRatingChartData, setAverageStarRatingChartData] =
    useState(null);

  // Top reviewed Doctors
  const [topReviewedDoctorsData, setTopReviewedDoctorsData] = useState(null);
  const avatarColors = ["#F6208826", "#12898326", "#0000FF40"];

  // Top-Performing Branch
  const [topPerformingBranchData, setTopPerformingBranchData] = useState(null);

  const getAdminDashboardData = async () => {
    try {
      setLoading(true);
      const requestData = {
        requesttable: {
          total_review: "",
          total_doctor: "",
          posted_review: "",
          doctor_avg_ratings: "",
          month_wise_review: "",
          archived_posted_review_month_wise: "",
          place_wise_average: "",
          docotr_star_rating_avg: "",
          top_performing_branch: "",
        },
        synceddatetime: "2023-01-24 11:57:34",
        FormCode: "202",
        ApiKey: "kavin",
        AppTypeNo: "3",
        AppVersion: "1.0.0",
        DbVersion: "10.4.1",
        DbSource: "W",
      };
      const result = await api.getDashBoardData(requestData);
      if (result.status === "1") {
        const totalReviewInfoAPI =
          result.responsemessage.total_review[0].total_review;
        setTotalReviewInfo(totalReviewInfoAPI);
        const totalDoctorsInfoAPI =
          result.responsemessage.total_doctor[0].total_doctor;
        setTotalDoctorsInfo(totalDoctorsInfoAPI);
        const postedReviewsInfoAPI =
          result.responsemessage.posted_review[0].total_posted_review;
        setPostedReviewsInfo(postedReviewsInfoAPI);
        const overallDoctorsInfoAPI =
          result.responsemessage.doctor_avg_ratings[0].average_rating?.toFixed(
            1
          );
        setOverallDoctorsInfo(overallDoctorsInfoAPI);

        // 1 Total Reviews
        const TotalReviewResponse = result.responsemessage.month_wise_review;
        setTotalReviewData(TotalReviewResponse);

        // 3 Posted vs. Archived Reviews
        const postedArchivedResponse =
          result.responsemessage.archived_posted_review_month_wise;
        const postedArchivedResponseData = postedArchivedResponse.map(
          (visit, index) => ({
            ...visit,
          })
        );
        setPostedArchivedChartData(postedArchivedResponseData);

        // 4 Average Star Rating
        const averageStarRatingResponse =
          result.responsemessage.place_wise_average;

        const averageStarRatingData = [
          {
            name: "Rajajinagar",
            value: averageStarRatingResponse[0].Rajajinagar,
          },
          {
            name: "Indiranagar",
            value: averageStarRatingResponse[0].Indiranagar,
          },
          {
            name: "Bannerghatta",
            value: averageStarRatingResponse[0].Bannerghatta,
          },
          {
            name: "Bommasandra",
            value: averageStarRatingResponse[0].Bommasandra,
          },
        ];

        setAverageStarRatingChartData(averageStarRatingData);
        // console.log("avg ratings",averageStarRatingResponse)

        // 5 Top reviewed Doctors
        const topReviewedDoctorsInfoAPI =
          result.responsemessage.docotr_star_rating_avg.map((doctor) => ({
            ...doctor,
            randomColor:
              avatarColors[Math.floor(Math.random() * avatarColors.length)], // Assign a random color
          }));
        setTopReviewedDoctorsData(topReviewedDoctorsInfoAPI);

        // 6 top Performing Branch
        const topPerformingBranchInfoAPI =
          result.responsemessage.top_performing_branch;
        setTopPerformingBranchData(topPerformingBranchInfoAPI);
      } else {
        console.error("Unexpected API response format:", result);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminDashboardData();
  }, []);

  // const COLORS = ["#129485", "#343C6A", "#FA4270", "#7D4CF9"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    value
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const fontSize = 12;
    const numericRating = value?.toFixed(1);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={fontSize}
      >
        {/* {`${(percent * 100).toFixed(0)}`} */}
        {numericRating}
      </text>
    );
  };

  return (
    <div className="container">
      <span className="heading-page mt-0">NN DDashboard</span>

      {loading && (
        <div className="backdrop">
          <ProgressSpinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}

      <div className="gridDashboard mt-3">
        <div className="col-3">
          <div className="dashboardStyle">
            <div className="grid mt-0" style={{ height: "150px" }}>
              <div className="col-4 flex justify-content-center align-items-center">
                <img
                  src="/GroupDashboard.png"
                  alt="logo"
                  className="dashboardImage"
                />
              </div>
              <div className="col-8">
                <p className="pr-4 mt-5 mb-0 dashboardText">Total Reviews</p>
                <h1 className="mb-0 mt-0">{totalReviewInfo}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="dashboardStyle">
            <div className="grid mt-0" style={{ height: "150px" }}>
              <div className="col-4 flex justify-content-center align-items-center">
                <img
                  src="/GroupDashboard2.png"
                  alt="logo"
                  className="dashboardImage"
                />
              </div>
              <div className="col-8">
                <p className="pr-4 mt-5 mb-0 dashboardText">Total Doctors</p>
                <h1 className="mb-0 mt-0">{totalDoctorsInfo}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="dashboardStyle">
            <div className="grid mt-0" style={{ height: "150px" }}>
              <div className="col-4 flex justify-content-center align-items-center">
                <img
                  src="/GroupDashboard1.png"
                  alt="logo"
                  className="dashboardImage"
                />
              </div>
              <div className="col-8">
                <p className="pr-4 mt-5 mb-0 dashboardText">Posted Reviews</p>
                <h1 className="mb-0 mt-0">{postedReviewsInfo}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="dashboardStyle">
            <div className="grid mt-0" style={{ height: "150px" }}>
              <div className="col-4 flex justify-content-center align-items-center">
                <img
                  src="/GroupDashboard3.png"
                  alt="logo"
                  className="dashboardImage"
                />
              </div>
              <div className="col-8">
                <p className="pr-4 mt-5 mb-0 dashboardText">
                  Overall Doctor Ratings
                </p>
                <h1 className="mb-0 mt-0">{overallDoctorsInfo}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid m-0">
        <div className="col-8">
          <div className="TabDashboard">
            <h4 className="m-0 pb-5">
            Total Reviews
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={totalReviewData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month_year" style={{ fontSize: "12px" }} />
                <YAxis style={{ fontSize: "12px" }} />
                <Tooltip />
                <Legend style={{ color: "#808080" }} />
                <Line
                  type="linear"
                  dataKey="month_wise_review"
                  stroke="#129485"
                  activeDot={{ r: 8 }}
                  name="Timeline"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-4">
          <div className=" TabDashboard  p-3 pr-0" style={{ height: "550px" }}>
            <h4 className="m-0">Top reviewed Doctors </h4>

            <div
              className="mt-4"
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {topReviewedDoctorsData && topReviewedDoctorsData.length > 0 ? (
                topReviewedDoctorsData.map((doctor, index) => (
                  <div key={index} className="grid align-items-center mt-1">
                    <div className="col-2">
                      <Avatar
                        label={
                          doctor.fld_doc_name
                            ? doctor.fld_doc_name.charAt(0).toUpperCase()
                            : "?"
                        }
                        className="p-mr-2"
                        size="large"
                        shape="circle"
                        style={{
                          backgroundColor: doctor.randomColor,
                          color: "#3e3e3e",
                        }}
                      />
                    </div>

                    <div className="col" style={{ fontSize: "18px" }}>
                      {doctor.fld_doc_name
                        ? doctor.fld_doc_name
                        : "Unknown Doctor"}
                    </div>

                    <div className="col-2 p-0">
                      <Tag
                        icon="pi pi-star-fill"
                        value={doctor.average_rating?.toFixed(1)}
                        style={{
                          backgroundColor: doctor.randomColor,
                          color: "#3e3e3e",
                        }} // Same color as Avatar
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No doctors available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid m-0">
        <div className="col-5 dashboardMargin">
          <div className="TabDashboard">
            <h4 className="m-0 pb-5">Posted vs. Archived Reviews</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={postedArchivedChartData} barSize={15}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  tickLine={true}
                  tick={{ fontSize: 12, marginBottom: 10 }}
                  dataKey="month_year"
                />
                <YAxis tick={{ fontSize: 12, marginLeft: 10 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total_posted"
                  fill="#129485"
                  name="Posted"
                  style={{ marginTop: "10px" }}
                  label={{ position: "top" }}
                />
                <Bar
                  dataKey="total_archived"
                  fill="#E70000"
                  name="Archived"
                  label={{ position: "top" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-3 dashboardMargin">
          <div className="TabDashboard">
            <h4 className="m-0 pb-5">Average Star Rating</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={averageStarRatingChartData}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  dataKey="value"
                >
                  {averageStarRatingChartData &&
                    averageStarRatingChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-4 p-3">
          <div className="TabDashboard p-0 grid" style={{ height: "200px" }}>
            <div className="col-8 p-4">
              <h4 className="m-0">Top-Performing Branch </h4>

              <div className="mt-4">
                {topPerformingBranchData?.map((doctor, index) => (
                  <div key={index} className="mt-5">
                    {doctor.fld_place_name}
                    <h1 className="mt-0" style={{ fontSize: "42px" }}>
                      {doctor.average_rating?.toFixed(1)}
                      <img src="/star.png" alt="logo" width="40px" />
                    </h1>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="col-4 flex justify-content-center align-items-center"
              style={{
                background: "#C3E1E0",
                borderRadius: "15px",
                height: "200px",
              }}
            >
              <img src="/Group1000002906.png" alt="logo" width="75px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
