import dayjs, { Dayjs } from "dayjs";
import { styled, useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { appBorder, displayCenter, shadow } from "../../../theme/style";

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isTimeLine: boolean;
  isHovered: boolean;
  today: boolean;
  dayHover: Dayjs | null | undefined;
  startDay?: Dayjs | null | undefined;
  finishDay?: Dayjs | null | undefined;
  responsibilityColor: any;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})<CustomPickerDayProps>(
  ({
    isHovered,
    isTimeLine,
    day,
    dayHover,
    startDay,
    finishDay,
    responsibilityColor,
    today
  }) => ({

    color: "#ffffff",
    transition:"0.1s",


    ...(isTimeLine && {
      backgroundColor:  responsibilityColor.main,
      "&:hover, &:focus": {
        backgroundColor:  responsibilityColor.main,
      },
    }),

    ...(isHovered && {
      backgroundColor:  responsibilityColor.main,
      "&:hover, &:focus": {
        backgroundColor: responsibilityColor.main,
      },
    }),

    borderRadius: 0,
    ...(today && { borderRadius: "50%" }),

    ...(startDay && dayHover && !finishDay &&
      day.get("date") === startDay?.get("date") && {
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    }),

    ...(startDay &&  dayHover && !finishDay &&
        day.get("date") === dayHover?.get("date") && {
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    }),

    ...(startDay && finishDay &&
      day.get("date") === startDay?.get("date") && {
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    }),

    ...(startDay &&  finishDay &&
        day.get("date") === finishDay.get("date") && {
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    }),
  })
) as React.ComponentType<CustomPickerDayProps>;

const isTimeLineSelection = (
  dayA: Dayjs,
  startDay: Dayjs | null | undefined,
  finishDay: Dayjs | null | undefined
) => {
  if (!startDay || !finishDay) {
    return false;
  }

  const startDayNumber = startDay.get("date");
  const startMonthNumber = startDay.get("month");

  const finishDayNumber = finishDay.get("date");
  const finishMonthNumber = finishDay.get("month");

  const currentDayNumber = dayA.get("date");
  const currentMonthNumber = dayA.get("month");

    return (
        startMonthNumber === finishMonthNumber && 
        currentMonthNumber === startMonthNumber &&
        currentDayNumber >= startDayNumber &&
        currentDayNumber <= finishDayNumber
    ) || (
        startMonthNumber !== finishMonthNumber && 
        currentMonthNumber === startMonthNumber &&
        currentDayNumber >= startDayNumber
    ) || (
        startMonthNumber !== finishMonthNumber &&
        currentMonthNumber === finishMonthNumber &&
        currentDayNumber <= finishDayNumber
    )
};

const isHover = (
  dayA: Dayjs,
  dayB: Dayjs | null | undefined,
  startDay: Dayjs | null | undefined,
  finishDay: Dayjs | null | undefined
) => {
  if (!Boolean(startDay) || !Boolean(dayB) || Boolean(finishDay)) {
    return false;
  }

  const startDayNumber = startDay!.get("date");
  const hoverDayNumber = dayB!.get("date");
  const currentDayNumber = dayA.get("date");

  const startMonthNumber = startDay!.get("month");
  const hoverMonthNumber = dayB!.get("month");
  const currentMonthNumber = dayA.get("month");


  return (
    startMonthNumber === hoverMonthNumber && 
    currentMonthNumber === startMonthNumber &&
    currentDayNumber >= startDayNumber &&
    currentDayNumber <= hoverDayNumber
  ) || (
    startMonthNumber < hoverMonthNumber && 
    currentMonthNumber === startMonthNumber &&
    currentDayNumber >= startDayNumber
  ) || (
    startMonthNumber < hoverMonthNumber &&
    currentMonthNumber === hoverMonthNumber &&
    currentDayNumber <= hoverDayNumber
  );
};

const Day = (
  props: PickersDayProps<Dayjs> & {
    startDay?: Dayjs | null;
    finishDay?: Dayjs | null;
    hoveredDay?: Dayjs | null;
    responsibilityColor?: any;
  }
) => {
    const { 
        responsibilityColor,
        day,
        hoveredDay,
        today,
        startDay,
        finishDay,
        ...other
    } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      responsibilityColor={responsibilityColor}
      isTimeLine={isTimeLineSelection(day, startDay, finishDay)}
      isHovered={isHover(day, hoveredDay, startDay, finishDay)}
      dayHover={hoveredDay}
      finishDay={finishDay}
      startDay={startDay}
      today={today!}
    />
  );
}

const SetTimeLineComponent = ({colorResponsibility, emitTimeLine}: any) =>  {
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
  const [startDay, setStartDay] = useState<Dayjs | null>(null);
  const [finishDay, setFinishDay] = useState<Dayjs | null>(null);
  const theme = useTheme();
  const responsibilityColor = (theme.palette as any )[colorResponsibility.main.split(".")[0]];

  // [ ] add buttons for 1 day 3 days 1 week
  // [ ] move style to a separate object
  // [ ] fix time flow in component
  // [ ] review and clean component

  const handleChange = (newValue: Dayjs) => {
    const isContinues = (
      (
        newValue.get("date") >= dayjs().get("date")! &&
        newValue.get("month") === dayjs().get("month")!
      ) || (
        newValue.get("date") >= startDay?.get("date")! &&
        newValue.get("month") === startDay?.get("month")!
      ) || (
        newValue.get("date") <= startDay?.get("date")! &&
        newValue.get("month") > startDay?.get("month")!
      )
    );

    if (!startDay && isContinues) {
      setStartDay(newValue);
      emitTimeLine({ startDay: newValue, finishDay });
    
    } else {
    
      if (!finishDay && isContinues) {
        setFinishDay(newValue);
        emitTimeLine({ startDay, finishDay: newValue });
      }
  
      if (finishDay || !isContinues) {
        setFinishDay(null);
        setStartDay(null);
      }
    }
  };
  
  const getTimeLine = () => {
    return finishDay!.diff(startDay, "days", true) + 1;
  }

  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <Box sx={{width: "100%",...displayCenter, flexDirection: "column"}}>

        <Box sx={{width: "100%", margin: "25px 0px 0px 0px", ...displayCenter, flexDirection:"column", alignItems: "end"}}>
          <Box sx={{width: "100%", padding: "10px", boxSizing:"border-box",...appBorder(responsibilityColor), ...displayCenter, flexDirection:"column"}}>
            <Box sx={{width:"100%", margin: "10px",...displayCenter, justifyContent: "space-around"}}>
              <Typography>
                Start Date: { startDay && (startDay?.get("month") + "/" + startDay?.get("date")) }
              </Typography>
              
              <Typography>
                End Date:   { finishDay && (finishDay?.get("month") + "/" + finishDay?.get("date")) }
              </Typography>
            </Box>
              
            <Typography  sx={{ fontWeight: 700, color: responsibilityColor.border }}>
              Task Duration{ finishDay && startDay && `: ${getTimeLine()} Days`}  
            </Typography>
          </Box>
          <Box sx={{width:"100%", height:"30px",  ...displayCenter, justifyContent: "end"}}>
           {true && <Button size="small" variant="text" sx={{margin:"0px", fontSize: ".75rem", color: responsibilityColor.border,}}> clear time line </Button>}
          </Box>
        </Box>

        <Box sx={{width: "fit-content", ...displayCenter, flexDirection: "column"}} >
          

          <DateCalendar
            value={startDay}
            onChange={handleChange}
            showDaysOutsideCurrentMonth
            slots={{ day: Day }}
            sx={{
              backgroundColor: responsibilityColor.background,
              ...appBorder(responsibilityColor),
              ...shadow,
              color: "#ffffff",
              margin: "10px 0px 10px 0px"
            }}
            slotProps={{
              
              day: (ownerState) =>
                ({
                  startDay: startDay,
                  finishDay: finishDay,
                  hoveredDay,
                  responsibilityColor,
                  onPointerEnter: () => setHoveredDay(ownerState.day),
                  onPointerLeave: () => setHoveredDay(null),
                } as any),
            }}
          />
          <Box sx={{width: "100%", margin: "0px 0px 0px 0px", ...displayCenter, justifyContent: "space-between"}}>
            <Button variant="text" sx={{padding: "3px 15px", fontSize: ".75rem", color: responsibilityColor.border,}}> Today </Button>
            <Button variant="text" sx={{padding: "3px 15px", fontSize: ".75rem", color: responsibilityColor.dark,}}> 1 Day </Button>
            <Button variant="text" sx={{padding: "3px 15px", fontSize: ".75rem", color: responsibilityColor.main,}}> 3 Days </Button>
            <Button variant="text" sx={{padding: "3px 15px", fontSize: ".75rem", color: responsibilityColor.main,}}> 5 Days </Button>          
          </Box>
        </Box>

      </Box>
    </LocalizationProvider>
  );
}

export { SetTimeLineComponent };