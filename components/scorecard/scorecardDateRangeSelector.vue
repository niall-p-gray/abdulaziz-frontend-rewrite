<template>
    <div class="max-w-2xl mx-auto">

        <table class="date-choice-table w-full">

            <tr class="date-choice-table-row" v-for="(dateRangeInputGroup, index) in dateRangeInputs" :key="index">

                <td class="date-choice-table-col-1">{{ dateRangeInputGroup.title }}</td>
                <td class="date-choice-table-col-2">

                    <fieldset class="mb-5" @change="chooseDateRange">

                        <div class="radio-item" v-for="(dateRangeInput, index2) in dateRangeInputGroup.inputs"
                            :key="index2">
                            <input :id="dateRangeInput.id" type="radio" name="dateChoice" :value="dateRangeInput.title"
                                class="radio-item-icon" :aria-labelledby="dateRangeInput.id"
                                :aria-describedby="dateRangeInput.id" @change="selectedDateRange = $event.target.value">
                            <label :for="dateRangeInput.id" class="text-sm font-medium text-gray-900 ml-2 block mb-0">
                                {{ dateRangeInput.title }} Days
                            </label>
                        </div>

                    </fieldset>

                </td>

            </tr>

            <tr class="date-choice-table-row">
                <td class="date-choice-table-col-1">
                    <div class="radio-item">
                        <input id="custom" type="radio" name="dateChoice" value="Custom" class="radio-item-icon"
                            aria-labelledby="custom" aria-describedby="custom" @change="chooseDateRange">
                        <label for="custom" class="text-sm font-medium text-gray-900 ml-2 block">
                            Custom Range
                        </label>
                    </div>
                </td>
                <td class="date-choice-table-col-2 flex flex-row">

                    <div class="date-picker-wrapper inline-block mr-2">
                        <datePicker class="inline-block" ref="datepicker1" :value="selectedDate" :calendar-button="true"
                            format="MM/dd/yyyy" :typeable="true" :show-calendar-on-button-click="true"
                            :disabled="disableCustomInputs" @selected="changeTheStartDate">
                            <template #calendarBtn>
                                <button class="inline-block">
                                    <img class="w-4 h-4" src="~/assets/icons/calendar.svg">
                                </button>
                            </template>
                        </datePicker>
                    </div>
                    <span class="dash"> - </span>
                    <div class="date-picker-wrapper inline-block ml-2">
                        <datePicker class="inline-block" ref="datepicker2" :value="selectedDate" :calendar-button="true"
                            format="MM/dd/yyyy" :typeable="true" :show-calendar-on-button-click="true"
                            @selected="changeTheEndDate" :disabled="disableCustomInputs">
                            <template #calendarBtn>
                                <button class="inline-block">
                                    <img class="w-4 h-4" src="~/assets/icons/calendar.svg">
                                </button>
                            </template>
                        </datePicker>
                    </div>

                </td>
            </tr>

        </table>

    </div>
</template>

<script>
import DatePicker from '@sum.cumo/vue-datepicker'
import '@sum.cumo/vue-datepicker/dist/Datepicker.css'

export default {
    components: {
        DatePicker
    },
    props: {
        dateRangeInputs: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            openDatePicker: false,
            selectedDate: this.$moment().format('YYYY/MM/DD'),
            selectedDateRange: null
        }
    },
    computed: {
        date1Display() {
            return this.$moment(this.selectedDate).format('M/D/YYYY')
        },
        disableCustomInputs() {
            return (this.selectedDateRange !== 'custom')
        }
    },
    methods: {
        toggle() {
            if (this.openDatePicker) {
                this.$refs.datepicker.close()
            } else {
                this.$refs.datepicker.showCalendar()
            }

            this.openDatePicker = !this.openDatePicker
        },
        chooseDateRange(inputEl) {
            this.selectedDateRange = inputEl.target.attributes.id.value;
            console.log(this.selectedDateRange);
            this.$emit('dateRange', this.selectedDateRange)
        },
        setDate(date) {

            console.log(';;;')
            console.log(date);

            // Had to do it this way, because for some reason date returned from the date picker was off by 1 day
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
            const mom = this.$moment.utc(d)
            this.selectedDate = mom.format('YYYY/MM/DD')

        },
        changeTheStartDate(date) {

            console.log(';;;')
            console.log(date);

            // Had to do it this way, because for some reason date returned from the date picker was off by 1 day
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
            const mom = this.$moment.utc(d)
            this.selectedDate = mom.format('YYYY/MM/DD')

            this.$emit("changestartdate", mom.format('YYYY-MM-DD'));

        },
        changeTheEndDate(date) {

            console.log(':::')
            console.log(date);

            // Had to do it this way, because for some reason date returned from the date picker was off by 1 day
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
            const mom = this.$moment.utc(d)
            this.selectedDate = mom.format('YYYY/MM/DD')

            this.$emit("changeenddate", mom.format('YYYY-MM-DD'));

        },
        passDateToParent(dateEl) {

            var dateElId = dateEl.target.attributes.id.value;
            console.log(dateElId);

        }
    }
}
</script>

<style scoped>
.date-choice-table {
    @apply table m-auto mt-10;
}

.date-choice-table-row {
    @apply table-row;
}

.date-choice-table-col-1 {
    @apply table-cell px-12 text-left;
}

.date-choice-table-col-2 {
    @apply table-cell px-12 text-left;
}

.radio-item {
    @apply flex items-center mb-2;
}

.date-picker-wrapper {
    @apply inline-block;
}

.calendar {
    @apply flex inline text-lg;
}

button {
    @apply flex items-center font-medium;
}

button span {
    @apply ml-2 self-center;
}

.date-picker-wrapper>>>input {
    @apply py-1 px-1 bg-slate-100 align-middle text-center inline text-sm w-24 mb-2;
}

.date-picker-wrapper>>>.cell.selected {
    @apply !bg-yellow;
}

.date-picker-wrapper>>>.cell:not(.blank):not(.disabled):hover {
    @apply !border-yellow;
}
</style>