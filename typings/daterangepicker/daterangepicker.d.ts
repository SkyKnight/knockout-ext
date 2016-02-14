/// <reference path="../jquery/jquery.d.ts"/>

interface DaterangepickerOptions {
    startDate?: any;
    endDate?: any;
    minDate?: any;//(Date object, moment object or string) The earliest date a user may select
    maxDate?: any;// (Date object, moment object or string) The latest date a user may select
    dateLimit?: any;// (object) The maximum span between the selected start and end dates. Can have any property you can add to a moment object (i.e. days, months)
    showDropdowns?: boolean;// Show year and month select boxes above calendars to jump to a specific month and year
    showWeekNumbers?:boolean; //Show week numbers at the start of each week on the calendars
    timePicker?: boolean;//) Allow selection of dates with times, not just dates
    timePickerIncrement?: number;//) Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30)
    timePicker24Hour?: boolean;//) Use 24-hour instead of 12-hour times, removing the AM/PM selection
    timePickerSeconds?: boolean;//) Show seconds in the timePicker
    ranges?: any;// (object) Set predefined date ranges the user can select from. Each key is the label for the range, and its value an array with two dates representing the bounds of the range
    opens?: string;// 'left'/'right'/'center') Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to
    drops?: string;// 'down' or 'up') Whether the picker appears below (default) or above the HTML element it's attached to
    buttonClasses?: string[];// CSS class names that will be added to all buttons in the picker
    applyClass?: string;// CSS class string that will be added to the apply button
    cancelClass?: string;// CSS class string that will be added to the cancel button
    locale?: any;// Allows you to provide localized strings for buttons and labels, customize the date display format, and change the first day of week for the calendars
    singleDatePicker?: boolean;// Show only a single calendar to choose one date, instead of a range picker with two calendars; the start and end dates provided to your callback will be the same single date chosen
    autoApply?: boolean;// Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates or a predefined range is selected
    linkedCalendars?: boolean;// When enabled, the two calendars displayed will always be for two sequential months (i.e. January and February), and both will be advanced when clicking the left or right arrows above the calendars. When disabled, the two calendars can be individually advanced and display any month/year.
    parentEl?: string;// jQuery selector of the parent element that the date range picker will be added to, if not provided this will be 'body'
    isInvalidDate?: (any) => boolean;// A function that is passed each date in the two calendars before they are displayed, and may return true or false to indicate whether that date should be available for selection or not.
    autoUpdateInput?: boolean;// Indicates whether the date range picker should automatically update the value of an <input> element it's attached to at initialization and when the selected dates change.

}

interface JQuery {
    daterangepicker(): JQuery;
    daterangepicker(options: DaterangepickerOptions): JQuery;
    daterangepicker(options: DaterangepickerOptions, onChangeDate:(start, end, label) => void): JQuery;
}