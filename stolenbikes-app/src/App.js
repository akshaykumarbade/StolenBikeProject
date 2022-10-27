import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import './App.css'
import BikeList from './components/BikeList';
import Header from './components/Header';
import Pagination from './components/Pagination';
import Search from './components/Search';
//import DateRangeFilter from './components/DateRangeFilter';
//import DateRangeComponent from './components/DateRangeComponent';
//import DateComponent from './components/DateComponent';
// import dayjs from "dayjs";
// const isSameorAfter = require("dayjs/plugin/isSameOrAfter");
// dayjs.extend(isSameorAfter);
// import { DateRange } from 'react-date-range';
// import format from 'date-fns/format'
// import { addDays } from 'date-fns'

const App = () => {

  const [bikeData, setBikeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [casesPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();

  //Dates
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [range, setRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection"
  //   }
  // ]);
  // open & close date range picker
  //const [open, setOpen] = useState(false);

  //fetch the data
  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/");
        setBikeData(res.data);
        setLoading(false);
      }
      fetchData();
    } catch (error) {
      console.log(error);
      setErrorState(error);
    }


  }, []);

  //Search with partial title
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const result = bikeData.filter((bike) => {
        return bike.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
      if (result !== null) {
        setSearchResults(result);
      } else {
        <h2>No Results</h2>
      }

    } else {
      setSearchResults(bikeData);
    }

  };

  const onChangeHandler = (value) => {
    setDateStart(value[0]);
    setDateEnd(value[1]);
    dateRangeHandler(dateStart, dateEnd);
  }

  const dateRangeHandler = (dateStart, dateEnd) => {
    setDateStart(dateStart);
    setDateEnd(dateEnd)
    const filteredData = bikeData.filter((bike) => {
      if (bike.dateoftheft >= dateStart && bike.dateoftheft <= dateEnd) {
        return bike;
      } else {
        return null;
      }
    })
    setSearchResults(filteredData);
    console.log(filteredData);
  }

  //Get Current Stolen bike cases
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = bikeData.slice(indexOfFirstCase, indexOfLastCase);

  //paginate
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // const inputHandler = (event) => {
  //   setStartDate(event.target.value);
  // }

  // const inputHandler2 = (event) => {
  //   setEndDate(event.target.value);
  // }



  // const handleDateFilter = (startDate, endDate) => {
  //   const filterData = bikeData.filter(bike => {
  //     if (startDate <= bike.date && endDate >= bike.date) {
  //       return bike;
  //     } else {
  //       return <h1>No DATA Found...</h1>;
  //     }
  //   });
  //   setBikeData(filterData);
  // }


  // const handleFilterDate = (date) => {
  //   console.log("into handle filter function");
  //   const filteredData = bikeData.filter((bike) => {
  //     if (dayjs(bike.dateoftheft).isSameorAfter(dayjs(date))) {
  //       return bike;
  //     } else {
  //       return null;
  //     }
  //   });
  //   setBikeData(filteredData);
  // }

  return (
    <>
      <Header />

      <Search searchTerm={searchTerm} searchKeyword={searchHandler} dateRangeHandler={dateRangeHandler} />
      <div className='datediv'>
        <DatePicker
          id="dateStartEnd"
          selectsRange={true}
          startDate={dateStart}
          endDate={dateEnd}
          onChange={onChangeHandler}
          dateFormat="dd-MM-yyyy"
          className={'form-control form-control-sm'}
          showDisabledMonthNavigation
          placeholderText='Pick date range'
        />
      </div>

      <div className='totalCases' >
        <span className='cases'><h3>Total Cases: {bikeData.length}</h3></span>
      </div>

      <Pagination casesPerPage={casesPerPage}
        totalCases={bikeData.length}
        paginate={paginate}
      />

      <BikeList bikeData={searchTerm.length < 1 ? currentCases : searchResults}
        loading={loading} errorState={errorState}

      />

      <Pagination casesPerPage={casesPerPage}
        totalCases={bikeData.length}
        paginate={paginate}
      />
    </>
  )
}

export default App;


