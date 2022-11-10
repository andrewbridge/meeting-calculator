import { computed, persistRef, ref } from "../deps/vue.mjs";

export const attendees = ref([]);
persistRef(attendees, 'MEETING_CALCULATOR_ATTENDEES', true);
export const attendeeMap = computed(() => {
    const map = new Map();
    for (const attendee of attendees.value) {
        map.set(attendee.id, attendee);
    }
    return map;
});
export const attendeeHourlyCost = computed(() => {
    const map = new Map();
    for (const attendee of attendees.value) {
        const { id, salary, workDays, workHours, holidayDays } = attendee;
        const yearlyHours = ((workDays * 52) - holidayDays) * workHours;
        const hourlyRate = salary / yearlyHours;
        map.set(id, hourlyRate);
    }
    return map;
});
export const addAttendee = () => {
    const { value } = attendees;
    value.push({ id: Date.now().toString(), name: '', salary: 0, workHours: 8, workDays: 5, holidayDays: 20 });
    attendees.value = value;
};
export const removeAttendee = (id) => {
    const { value } = attendees;
    value.splice(attendees.value.findIndex(({ id: needleId }) => needleId === id), 1);
    attendees.value = value;
};
if (attendees.value.length === 0) addAttendee();

