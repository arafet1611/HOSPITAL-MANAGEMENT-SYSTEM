import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Slider from "react-slick";
function SampleNextArrow(props) {
  const { onClick } = props;
  return <div className="slick-arrow slick-next" onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return <div className="slick-arrow slick-prev" onClick={onClick} />;
}

const VacationCalendar = ({ vacations }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet size
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Mobile size
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const generateCalendars = () => {
    const calendars = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month);
      const monthName = date.toLocaleString("default", { month: "long" });

      calendars.push(
        <div className=" mx-2" key={month}>
          <div
            className="calendar-month p-2"
            style={{
              border: "2px solid rgb(0, 86, 179)",
              backgroundColor: "rgb(0, 86, 179)",
              color: "white",
            }}
          >
            {monthName}
          </div>
          <Calendar
            value={date}
            showNavigation={false}
            className="custom-calendar"
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const year = date.getFullYear();
                const vacationsInMonth = vacations[`${monthName} ${year}`];
                if (date.getMonth() === month) {
                  if (
                    vacationsInMonth &&
                    vacationsInMonth.includes(date.getDate())
                  ) {
                    return "vacation-day";
                  }
                }
              }
              return null;
            }}
          />
        </div>
      );
    }
    return calendars;
  };

  return (
    <div className="calendar-container">
      <div className="year-changer">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setCurrentYear(currentYear - 1)}
        >
          <strong>Previous Year</strong>
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setCurrentYear(currentYear + 1)}
        >
          <strong>Next Year</strong>
        </button>
        <div className=" d-flex justify-content-center text-primary ">
          <h2>
            <strong>{currentYear}</strong>
          </h2>
        </div>{" "}
      </div>

      <Slider {...settings}>{generateCalendars()}</Slider>
    </div>
  );
};

export default VacationCalendar;
