'use client'
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { TextField } from '@mui/material';
import { Typography, Box, Paper, useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { PickersDay } from '@mui/x-date-pickers';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import jwt from 'jsonwebtoken'
import { BorderColor } from '@mui/icons-material';

function BlockedDatesCalendar() {
  const [blockedDates, setBlockedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [freelancerId, setFreelancerId] = useState(null);
  const [alreadyBlockedDates, setAlreadyBlockedDates] = useState([]);
  const [allEvents, setAllEvents] = useState([])
  const [initialEvents, setInitialEvents] = useState([])
  const [events, setEvents] = useState(null);
  const [input, setInput] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwt.decode(token);
      setFreelancerId(decodedUser.userid);
      getEvents(decodedUser.userid)
      getBlockedDates(decodedUser.userid)
    }
  }, [])
  const getEvents = async (id) => {
    try {
      // console.log("abc", id)
      const response = await fetch('/api/dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      });

      const data = await response.json();
      // // console.log("Events data:", data);
      setEvents(data.reverse());
      setLoading(false)
    } catch (error) {
      // console.error("Error fetching events:", error);
      setLoading(false)
    }
  };
  const getBlockedDates = async (Id) => {
    const data = await fetch(`/api/dates/${Id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const blockedDates2 = await data.json();
    // console.log("bd2", blockedDates2)
    setAllEvents(blockedDates2)
    setInitialEvents(blockedDates2)
    const blockedDates = []
    blockedDates2.map((ele) => blockedDates.push(ele?.date || ""))
    // console.log("bd", blockedDates)

    const formattedDates = blockedDates.map(date => {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Get only 'yyyy-mm-dd' part
    });
    setAlreadyBlockedDates(formattedDates);
  }
  // Function to check if a date should be disabled
  const shouldDisableDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return alreadyBlockedDates.includes(formattedDate);
  };

  const handleInputChange = (date) => {

    const formattedValue = format(new Date(date), 'yyyy-MM-dd');

    if (alreadyBlockedDates.includes(formattedValue)) {
      // console.log("Unblocking date:", formattedValue);

      setAlreadyBlockedDates((prev) => prev.filter(date => date !== formattedValue));

      setAllEvents((prev) => prev.filter(obj => {
        const eventDate = new Date(obj.date).toISOString().split('T')[0];
        return eventDate !== formattedValue;
      }));

      // console.log("Updated allEvents:", allEvents);
    } else {
      // Add the date to blockedDates
      if (blockedDates.includes(formattedValue)) {
        setBlockedDates((prev) => prev.filter(obj => obj !== formattedValue))
      } else {
        setBlockedDates([...blockedDates, formattedValue]);
        setAlreadyBlockedDates([...alreadyBlockedDates, formattedValue])
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(blockedDates)
    // console.log(blockedDates.length)
    if (blockedDates.length == 1) {
      // console.log("hello")
      setBlockedDates([])
    }
    // console.log(blockedDates.length)
    // console.log(initialEvents, allEvents)
    if (blockedDates.length == 0 && initialEvents === allEvents) {
      alert("Please select at least one date");
    } else if (blockedDates.length == 0 && initialEvents !== allEvents) {
      const data = await fetch(`/api/dates/${freelancerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ allEvents })
      })
      setBlockedDates([])
      setSelectedDate(null);
      // console.log("data", data)
      if (data?.ok)
        alert("unblocked successfully");
    }
    else {
      try {

        // console.log("f", freelancerId)
        // console.log("blockedDates", blockedDates)
        if (input === null || input === ' ') {
          alert("Please enter a valid reason")
        } else {
          if (blockedDates.length == 1) {
            const obj = {
              date: blockedDates[0],
              event: input
            }
            allEvents.push(obj)
          } else {
            blockedDates.map((date) => {
              const obj = {
                date: date,
                event: input
              }
              allEvents.push(obj)
            })
          }
          // console.log("events", allEvents)
          const data = await fetch(`/api/dates/${freelancerId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ allEvents })
          })
          setBlockedDates([])
          setSelectedDate(null);
          // console.log("data", data)
          if (data?.ok)
            alert("Blocked dates saved successfully");
        }
      } catch (error) {
        alert("Failed to block dates")

      }
    }

  }

  const isSmallScreen = useMediaQuery('(max-width:600px)');


  if (loading) {
    return (<div className='min-h-[80vh] w-[100vw]'>
        <Box sx={{ display: 'flex' }}>
            <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
        <CircularProgress color="inherit" size="8rem" />
        </div>
      </Box>
    </div>);
  }

  return (
    <div className=' pt-20'>
      {/* <div className='w-full text-center  text-xl font-bold mb-5'>
        Mange Your Calender Here
      </div> */}
      <div className='flex md:flex-row flex-col'>
        <div className='md:w-[35vw] h-[90vh] md:h-[100vh]  '>
          <div className='md:w-[32vw] h-[90vh] md:h-[100vh] md:fixed md:bg-blue-200'>
            <div className='flex flex-col  md:w-[30vw] md:absolute  '>
              <h1 className='text-3xl font-semibold text-center mt-10'>Your calender</h1>

              <div className="flex justify-center items-center my-auto p-6">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Paper
                    elevation={4}
                    sx={{
                      width: isSmallScreen ? '90vw' : '70vw', // Adjust width for small screens
                      padding: '10px',
                      height: isSmallScreen ? '80vh' : '70vh', // Adjust height for small screens
                      borderRadius: '12px',
                      // backgroundColor: '#f5f7fa',
                      backgroundColor: '#f5f7fa',
                      overflow: 'hidden', // Prevents internal scrolling
                    }}
                  >
                    <StaticDatePicker
                      displayStaticWrapperAs="desktop"
                      openTo="day"
                      value={selectedDate}
                      onChange={(newDate) => setSelectedDate(newDate)}
                      shouldDisableDate={shouldDisableDate}
                      
                      renderDay={(day, selectedDates, pickersDayProps) => {
                        const isDisabled = shouldDisableDate(day);
                        return (
                          <PickersDay
                              {...pickersDayProps}
                              sx={{
                                  ...(pickersDayProps.disabled && {
                                      color: 'red !important',
                                      border: '1px solid red',
                                      borderRadius:"3px"
                                  })
                              }}
                          />
                      );
                      }}
                    />
                    <div>
                      <div className='w-full flex items-center justify-center flex-col py-4 px-3 md:px-10 md:py-4'>

                        <label className='text-center text-lg md:text-xl pb-2'>Select Available/Unavailable Dates.</label>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Select a date"
                            name="eventDate"
                            value={selectedDate}
                            minDate={new Date()}
                            onChange={(date) => handleInputChange(date)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{
                                  width: '100%',
                                  '& .MuiInputBase-root': {
                                    // Default height for medium and larger devices
                                    height: '56px',
                                    '@media (max-width:600px)': {
                                      // Reduced height for small devices
                                      height: '56px',
                                    },
                                  },
                                }}
                              />
                            )}
                          />
                        </LocalizationProvider>


                      </div>
                    </div>

                    <div className='w-full flex items-center justify-center'>

                      <div className=' flex-col justify-center '>
                        <div className=''>
                          <label className='text-center'>Reason for Unavailablelity</label>
                          <input
                            type="text"
                            className="block md:w-[22rem] w-[80vw] h-16 p-2 mb-4 text-xl text-gray-700 bg-white rounded-lg"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                        </div>
                        <div className='w-full flex items-center justify-center'>

                          <button className='bg-blue-400 rounded-3xl p-4 text-white' onClick={handleSubmit}>
                            Update Calender
                          </button>
                        </div>
                      </div>
                    </div>
                  </Paper>
                </LocalizationProvider>
              </div>

            </div>
          </div>
        </div>



        <div className='h-full my-10 md:my-0 md:w-[60vw]'>
          <div className='  md:mt-16'>
            <h1 className='text-3xl font-semibold text-center md:mb-10'>Your Events</h1>
            <div className=' flex flex-wrap gap-x-10 gap-y-5  items-center justify-center'>
              {
                allEvents?.map((item, index) => (
                  item && typeof item === 'object' ? ( // Check if item is an object
                    <div key={index} className='p-5 md:w-[25vw] w-[90vw] border-2 bg-blue-200 rounded-xl'>
                      <p>Date - {item.date ? new Date(item.date).toISOString().split('T')[0] : "N/A"}</p>
                      <p>Event - {item.event || "No event information available"}</p>
                    </div>
                  ) : null // Skip if item is not an object
                ))
              }
            </div>
          </div>

          {/* <div className='h-full mt-24'>
            <div className='text-2xl font-bold text-center mb-5'>
              My Events
            </div>
            <div className='w-full h-[100vh] flex items-start justify-center'>
              <div className='w-[80%] grid grid-cols-3 gap-2'>
                {
                  events?.map((event) => (
                    <div key={events.id} className='bg-gray-300 p-4 rounded-lg shadow-md flex items-center flex-col'>
                      <div className='text-lg font-bold'>{event?.event || ""}</div>
                      <div className='text-lg font-bold'>{event?.service || ""}</div>
                      <div className='text-lg font-bold'>
                        {event.date ? event.date.split('T')[0] : ""}
                      </div>
                      <div className='text-lg font-bold'>
                        <div>Location:</div>
                        <div>city:{event?.city || ""}</div>
                        <div>pincode:{event?.pinCode || ""}</div>
                        <div>address:{event?.address || ""}</div>
                      </div>
                      <div>
                        total amount:{event?.totalAmount || ""}
                      </div>
                      <div>
                        paid amount:{event?.paidAmount || ""}
                      </div>
                      <div>
                        time:{event?.time || ""}
                      </div>
                      <div>
                        customer:{event?.customerName || ""}
                      </div>


                    </div>
                  ))
                }
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BlockedDatesCalendar;