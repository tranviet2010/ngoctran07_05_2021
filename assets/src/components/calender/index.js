import React, { Component } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { COLOR } from "../../utils/color/colors";
import moment from "moment";
import { Dialog, Portal } from "react-native-paper";
import { sizeHeight } from "../../utils/helper/size.helper";
export default class CalendarComponent extends Component {
  render() {
    const { showCalendar, type, onClose, date, handleDate } = this.props;
    return (
      <View>
        <Portal>
          <Dialog
            visible={showCalendar}
            dismissable={false}
            onDismiss={() => {
              onClose();
            }}
          >
            <Dialog.Content>
              <Calendar
                maxDate={new Date(moment().add(0, "day"))}
                onDayPress={(day) => {
                  handleDate(day, 1);
                  onClose();
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {

                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={"MMMM yyyy"}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {

                }}
                theme={{
                  textSectionTitleColor: "#000",
                  dayTextColor: "red",
                  todayTextColor: "white",
                  selectedDayTextColor: "white",
                  monthTextColor: "#000",
                  indicatorColor: "white",
                }}
                markingType="multi-dot"
                markedDates={{
                  [date]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: "green",
                  },
                }}
              />
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
