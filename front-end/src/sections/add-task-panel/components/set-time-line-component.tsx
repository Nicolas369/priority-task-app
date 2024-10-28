import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { styled, useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Box, Button, Typography } from "@mui/material";
import { appBorder, displayCenter, shadow } from "../../../theme/style";
import { SetTimeLineInterface } from "../../../definitions/sections-definitions";

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
    today,
  }) => ({
    color: "#ffffff",
    transition: "0.1s",

    ...(isTimeLine && {
      backgroundColor: responsibilityColor.main,
      "&:hover, &:focus": {
        backgroundColor: responsibilityColor.main,
      },
    }),

    ...(isHovered && {
      backgroundColor: responsibilityColor.main,
      "&:hover, &:focus": {
        backgroundColor: responsibilityColor.main,
      },
    }),

    borderRadius: 0,
    ...(today && { borderRadius: "50%" }),

    ...(startDay &&
      dayHover &&
      !finishDay &&
      day.get("date") === startDay?.get("date") && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    }),

    ...(startDay &&
      dayHover &&
      !finishDay &&
      day.get("date") === dayHover?.get("date") && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),

    ...(startDay &&
      finishDay &&
      day.get("date") === startDay?.get("date") && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    }),

    ...(startDay &&
      finishDay &&
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
    (
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
  );
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
    (
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
    )
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
};

const makeStyles = (responsibilityColor: any) => ({
  timeLinePickerContainer: {
    width: "100%",
    margin: "5px 0px",
    ...displayCenter,
    flexDirection: "column",
  },
  displayDateContainer: {
    width: "100%",
    ...displayCenter,
    flexDirection: "column",
    alignItems: "end",
  },
  displayDatesChosen: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    ...appBorder(responsibilityColor),
    ...displayCenter,
    flexDirection: "column",
  },
  dayChosen: {
    width: "100%",
    margin: "10px",
    ...displayCenter,
    justifyContent: "space-around",
  },
  duration: { fontWeight: 700, color: responsibilityColor.border },
  btnClear: {
    margin: "0px",
    fontSize: ".75rem",
    color: responsibilityColor.border,
  },
  btnClearContainer: {
    width: "100%",
    height: "30px",
    ...displayCenter,
    justifyContent: "end",
  },
  datePickerContainer: {
    width: "fit-content",
    ...displayCenter,
    flexDirection: "column",
  },
  datePicker: {
    backgroundColor: responsibilityColor.background,
    ...appBorder(responsibilityColor),
    ...shadow,
    color: "#ffffff",
    margin: "0px 0px 10px 0px",
  },
  btnSelectionContainer: {
    width: "100%",
    margin: "0px 0px 0px 0px",
    ...displayCenter,
    justifyContent: "space-between",
  },
});

const SetTimeLineComponent = (props: SetTimeLineInterface) => {
  const { colorResponsibility, emitTimeLine, clearInputObservable } = props;
  
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
  const [startDay, setStartDay] = useState<Dayjs | null>(null);
  const [finishDay, setFinishDay] = useState<Dayjs | null>(null);
  
  const theme = useTheme();
  const responsibilityColor = (theme.palette as any)[
    colorResponsibility.main.split(".")[0]
  ];

  const styles = makeStyles(responsibilityColor);

  const clearTimeLine = () => {
    setFinishDay(null);
    setStartDay(null);
  };

  clearInputObservable?.subscribe(clearTimeLine);

  const handleChange = (newValue: Dayjs) => {
    const isContinues =
      (
        newValue.get("date") >= dayjs().get("date")! &&
        newValue.get("month") === dayjs().get("month")!
      ) || (
        newValue.get("date") >= startDay?.get("date")! &&
        newValue.get("month") === startDay?.get("month")!
      ) || (
        newValue.get("date") <= startDay?.get("date")! &&
        newValue.get("month") > startDay?.get("month")!
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

  const getTimeLineDuration = () => {
    if (finishDay?.isSame(dayjs(), "date")) return 0;
    if (finishDay) return finishDay?.diff(startDay, "days", true) + 1;
  };

  const setActionTimeline = (days: number) => {
    let startDate = dayjs();
    let finishDate = dayjs();

    if (days > 0) {
      startDate = startDate.add(1, "day");
      finishDate = finishDate.add(days, "day");
    }

    setStartDay(startDate);
    setFinishDay(finishDate);
    emitTimeLine({ startDay: startDate, finishDay: finishDate });
  };

  const displayCorrectColorForTimeSelection = (selection: number) => {
    if (!startDay) return responsibilityColor.main;
    if (getTimeLineDuration() === selection) return responsibilityColor.border;
    if (getTimeLineDuration() !== selection) return responsibilityColor.dark;
  };

  const timeLineAction = (selection: number) => ({
    padding: "3px 15px",
    fontSize: ".75rem",
    color: displayCorrectColorForTimeSelection(selection),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box sx={styles.timeLinePickerContainer}>
        <Box sx={styles.displayDateContainer}>
          <Box sx={styles.displayDatesChosen}>
            <Box sx={styles.dayChosen}>
              <Typography>
                Start:
                {startDay &&
                  startDay?.get("month") + 1 + "/" + startDay?.get("date")}
              </Typography>
              <Typography>
                End:
                {finishDay &&
                  finishDay?.get("month") + 1 + "/" + finishDay?.get("date")}
              </Typography>
            </Box>
            <Typography sx={styles.duration}>
              {/* Task Duration:{" "} */}
              {finishDay &&
                startDay &&
                (getTimeLineDuration()
                  ? getTimeLineDuration() + " Days Task"
                  : "Today Task")}
            </Typography>
          </Box>

          <Box sx={styles.btnClearContainer}>
            {Boolean(startDay) && (
              <Button
                onClick={clearTimeLine}
                size="small"
                variant="text"
                sx={styles.btnClear}
              >
                clear time line
              </Button>
            )}
          </Box>
        </Box>

        <Box sx={styles.datePickerContainer}>
          <DateCalendar
            value={startDay}
            onChange={handleChange}
            showDaysOutsideCurrentMonth
            slots={{ day: Day }}
            sx={styles.datePicker}
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

          <Box sx={styles.btnSelectionContainer}>
            <Button
              onClick={() => setActionTimeline(0)}
              variant="text"
              sx={{ ...timeLineAction(0) }}
            >

              Today
            </Button>
            <Button
              onClick={() => setActionTimeline(1)}
              variant="text"
              sx={{ ...timeLineAction(1) }}
            >
              1 Day
            </Button>
            <Button
              onClick={() => setActionTimeline(3)}
              variant="text"
              sx={{ ...timeLineAction(3) }}
            >
              3 Days
            </Button>
            <Button
              onClick={() => setActionTimeline(5)}
              variant="text"
              sx={{ ...timeLineAction(5) }}
            >
              5 Days
            </Button>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export { SetTimeLineComponent };
