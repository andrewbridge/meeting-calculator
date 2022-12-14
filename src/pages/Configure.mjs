import {css} from "../deps/goober.mjs";
import { mapRefs } from "../deps/vue.mjs";
import { addAttendee, attendees, removeAttendee } from "../services/data.mjs";

const styles = css``;

export default {
    template: `<div class="page-header">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        Configure attendees
                    </h2>
                </div>
            </div>
        </div>
    </div>
    <!-- Page body -->
    <div class="page-body ${styles}">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label class="form-label required">Attendees</label>
                                        <div class="row g-2 mb-3" v-for="attendee in attendees" :key="attendee.id">
                                            <div class="col-2">
                                                <input type="text" class="form-control" :class="{ 'is-invalid': attendee.name === '' }" placeholder="Name" v-model="attendee.name" />
                                            </div>
                                            <div class="col-3">
                                                <div class="input-group">
                                                    <span class="input-group-text">£</span>
                                                    <input type="number" class="form-control" :class="{ 'is-invalid': attendee.salary === '' }" placeholder="Salary" v-model="attendee.salary" />
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <input type="number" class="form-control" :class="{ 'is-invalid': attendee.workHours === '' }" placeholder="Work hours" v-model="attendee.workHours" />
                                                    <span class="input-group-text">hours</span>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <input type="number" class="form-control" :class="{ 'is-invalid': attendee.workDays === '' }" placeholder="Work week" v-model="attendee.workDays" />
                                                    <span class="input-group-text">days</span>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <input type="number" class="form-control" :class="{ 'is-invalid': attendee.holidayDays === '' }" placeholder="Holiday" v-model="attendee.holidayDays" />
                                                    <span class="input-group-text">days</span>
                                                </div>
                                            </div>
                                            <div class="col-1">
                                                <button class="btn btn-icon" aria-label="Remove row" @click="removeAttendee(attendee.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <button class="btn btn-icon" @click="addAttendee">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        computed: mapRefs({ attendees }),
        methods: {
            addAttendee,
            removeAttendee
        }
}
